import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwtLib from "jsonwebtoken";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const providers = [];
if (googleClientId && googleClientSecret && googleClientId !== "" && googleClientSecret !== "") {
  providers.push(
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  );
}

const handler = NextAuth({
  providers,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      const secret = process.env.NEXTAUTH_SECRET;
      
      // On initial sign-in, create backendToken
      if (account && profile) {
        token.email = profile.email;
        token.name = profile.name;
        token.sub = profile.sub;
        token.backendToken = jwtLib.sign(
          { sub: profile.sub, email: profile.email, name: profile.name },
          secret ?? "dev-secret"
        );
        console.log("[NextAuth JWT] Created backendToken on sign-in");
      }
      // Always ensure backendToken exists if we have user info
      if (!token.backendToken && token.sub && token.email) {
        token.backendToken = jwtLib.sign(
          { 
            sub: token.sub, 
            email: token.email as string, 
            name: (token.name as string) || ""
          },
          secret ?? "dev-secret"
        );
        console.log("[NextAuth JWT] Created missing backendToken");
        console.log("[NextAuth JWT] Secret used (length):", secret?.length || 0);
      }
      
      // Log secret info for debugging
      if (token.backendToken && !secret) {
        console.error("[NextAuth JWT] ERROR: NEXTAUTH_SECRET is undefined!");
      }
      
      if (!token.backendToken) {
        console.error("[NextAuth JWT] WARNING: No backendToken created!", {
          hasSub: !!token.sub,
          hasEmail: !!token.email,
          hasAccount: !!account,
          hasProfile: !!profile
        });
      }
      
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.sub ?? "",
      };
      // Ensure backendToken is always passed to session
      (session as any).backendToken = (token as any).backendToken;
      
      if (!(session as any).backendToken) {
        console.error("[NextAuth Session] WARNING: No backendToken in session!", {
          hasToken: !!token.backendToken,
          userId: token.sub
        });
      }
      
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to Browse Tests (root) after sign-in
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/`;
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
});

export { handler as GET, handler as POST };


