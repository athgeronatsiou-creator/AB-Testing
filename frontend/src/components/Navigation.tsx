"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export function Navigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    if (path === "/create") {
      return pathname === "/create";
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#121212]/80 backdrop-blur-xl border-b border-[#333333] px-4 sm:px-6 md:px-8 py-3 md:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            A/B Testing
          </h1>
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            <Link 
              className={`text-sm font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 focus:ring-offset-[#121212] rounded px-2 py-1 relative ${
                isActive("/") 
                  ? "text-white font-bold" 
                  : "text-[#b3b3b3] hover:text-white"
              }`}
              href="/"
              aria-current={isActive("/") ? "page" : undefined}
            >
              <span className="relative z-10">Browse Tests</span>
              {isActive("/") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B6B] animate-fade-in-scale" />
              )}
            </Link>
            <Link 
              className={`text-sm font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 focus:ring-offset-[#121212] rounded px-2 py-1 relative ${
                isActive("/create") 
                  ? "text-white font-bold" 
                  : "text-[#b3b3b3] hover:text-white"
              }`}
              href="/create"
              aria-current={isActive("/create") ? "page" : undefined}
            >
              <span className="relative z-10">Create</span>
              {isActive("/create") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B6B] animate-fade-in-scale" />
              )}
            </Link>
            <Link 
              className={`text-sm font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 focus:ring-offset-[#121212] rounded px-2 py-1 relative ${
                isActive("/dashboard") 
                  ? "text-white font-bold" 
                  : "text-[#b3b3b3] hover:text-white"
              }`}
              href="/dashboard"
              aria-current={isActive("/dashboard") ? "page" : undefined}
            >
              <span className="relative z-10">My Tests</span>
              {isActive("/dashboard") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B6B] animate-fade-in-scale" />
              )}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {status === "authenticated" ? (
            <>
              <span className="text-xs sm:text-sm text-[#b3b3b3] hidden lg:inline truncate max-w-[120px] sm:max-w-none" aria-label={`Signed in as ${session.user?.name || session.user?.email}`}>
                {session.user?.name || session.user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="rounded-full bg-[#282828] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#404040] focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 focus:ring-offset-[#121212] transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                aria-label="Sign out"
              >
                <span className="hidden sm:inline">Sign out</span>
                <span className="sm:hidden">Out</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                signIn("google", { callbackUrl: "/" }).catch((err) => {
                  console.error("Sign in error:", err);
                  alert("Sign in failed. Please check that Google OAuth credentials are configured in .env.local");
                });
              }}
              className="rounded-full bg-[#FF6B6B] px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-[#1a1a1a] hover:bg-[#FF8C8C] hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#FF6B6B]/50 transition-all duration-300 ease-out active:scale-95"
              aria-label="Sign in with Google"
            >
              <span className="hidden sm:inline">Sign in</span>
              <span className="sm:hidden">Sign in</span>
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg bg-[#282828] p-2 text-white hover:bg-[#404040] focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 focus:ring-offset-[#121212] transition-all duration-300 ease-out hover:scale-110 active:scale-95"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6 transition-transform duration-300 ease-out" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" className="animate-fade-in-scale" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-[#333333] bg-[#181818] px-4 py-4 animate-slide-down" aria-label="Mobile navigation">
          <div className="flex flex-col gap-3">
            <Link 
              className={`text-base font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 focus:ring-offset-[#181818] rounded-lg px-4 py-3 animate-fade-in-up animate-delay-100 ${
                isActive("/") 
                  ? "text-white font-bold bg-[#282828] border-l-4 border-[#FF6B6B]" 
                  : "text-[#b3b3b3] hover:text-white hover:bg-[#282828]"
              }`}
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isActive("/") ? "page" : undefined}
            >
              Browse Tests
            </Link>
            <Link 
              className={`text-base font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 focus:ring-offset-[#181818] rounded-lg px-4 py-3 animate-fade-in-up animate-delay-200 ${
                isActive("/create") 
                  ? "text-white font-bold bg-[#282828] border-l-4 border-[#FF6B6B]" 
                  : "text-[#b3b3b3] hover:text-white hover:bg-[#282828]"
              }`}
              href="/create"
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isActive("/create") ? "page" : undefined}
            >
              Create
            </Link>
            <Link 
              className={`text-base font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 focus:ring-offset-[#181818] rounded-lg px-4 py-3 animate-fade-in-up animate-delay-300 ${
                isActive("/dashboard") 
                  ? "text-white font-bold bg-[#282828] border-l-4 border-[#FF6B6B]" 
                  : "text-[#b3b3b3] hover:text-white hover:bg-[#282828]"
              }`}
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isActive("/dashboard") ? "page" : undefined}
            >
              My Tests
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}


