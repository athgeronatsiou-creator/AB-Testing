"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/Navigation";

type Uploaded = { url: string; publicId: string };

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [imageA, setImageA] = useState<Uploaded | null>(null);
  const [imageB, setImageB] = useState<Uploaded | null>(null);
  const [error, setError] = useState("");

  // Debug: Log session info in development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[Session Debug]", {
        hasSession: !!session,
        sessionStatus: status,
        hasBackendToken: !!session?.backendToken,
        backendTokenLength: session?.backendToken?.length || 0,
        userId: session?.user?.id,
        userEmail: session?.user?.email,
        userName: session?.user?.name,
        tokenPreview: session?.backendToken ? session.backendToken.substring(0, 30) + "..." : "❌ MISSING TOKEN"
      });
      
      if (session && !session.backendToken) {
        console.error("[Session Debug] ⚠️ WARNING: No backendToken found in session!");
        console.error("[Session Debug] Full session object:", JSON.stringify(session, null, 2));
      }
    }
  }, [session, status]);

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!session?.backendToken) throw new Error("Not authenticated");
      return apiFetch(
        "/tests",
        {
          method: "POST",
          body: JSON.stringify({
            title,
            imageAUrl: imageA?.url,
            imageBUrl: imageB?.url,
            status: "PUBLISHED",
          }),
        },
        session.backendToken
      );
    },
    onSuccess: async () => {
      // Ensure the Dashboard list refetches immediately after creation,
      // regardless of React Query staleTime defaults.
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["my-tests"] }),
        queryClient.invalidateQueries({ queryKey: ["tests"] }),
      ]);
      router.push("/dashboard");
    },
    onError: (err: any) => setError(err?.message ?? "Failed to create test"),
  });

  const handleUpload = async (file: File, setImage: (u: Uploaded) => void) => {
    setError("");
    if (!session?.backendToken) {
      console.error("[Upload] No backendToken in session:", { 
        hasSession: !!session, 
        hasBackendToken: !!session?.backendToken,
        user: session?.user 
      });
      const errorMsg = "Authentication token missing. Please sign out and sign back in to refresh your session.";
      setError(errorMsg);
      throw new Error(errorMsg);
    }
    try {
      console.log("[Upload] Sending request with token:", {
        tokenLength: session.backendToken.length,
        tokenPreview: session.backendToken.substring(0, 50) + "...",
        endpoint: "/uploads/sign",
        tokenParts: session.backendToken.split('.').length + " parts (should be 3)"
      });
      
      // Add timeout to prevent hanging requests
      const signPromise = apiFetch<{
        timestamp: number;
        folder: string;
        signature: string;
        cloudName: string;
        apiKey: string;
      }>("/uploads/sign", { method: "POST" }, session.backendToken);
      
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Upload request timed out. Please try again.")), 30000);
      });
      
      const sign = await Promise.race([signPromise, timeoutPromise]);

      const form = new FormData();
      form.append("file", file);
      form.append("api_key", sign.apiKey);
      form.append("timestamp", String(sign.timestamp));
      form.append("signature", sign.signature);
      form.append("folder", sign.folder);

      // Add timeout for Cloudinary upload as well
      const uploadController = new AbortController();
      const uploadTimeout = setTimeout(() => uploadController.abort(), 60000); // 60 second timeout
      
      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`, {
          method: "POST",
          body: form,
          signal: uploadController.signal,
        });
        clearTimeout(uploadTimeout);
        
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          const errorMsg = body.error?.message ?? `Upload failed with status ${res.status}`;
          setError(errorMsg);
          throw new Error(errorMsg);
        }
        
        const body = await res.json();
        setImage({ url: body.secure_url, publicId: body.public_id });
      } catch (fetchErr: any) {
        clearTimeout(uploadTimeout);
        if (fetchErr.name === 'AbortError') {
          const errorMsg = "Upload timed out. Please try again with a smaller image.";
          setError(errorMsg);
          throw new Error(errorMsg);
        }
        throw fetchErr;
      }
    } catch (err: any) {
      const errorMsg = err?.message ?? "Failed to upload image. Please try again.";
      setError(errorMsg);
      throw err; // Re-throw to ensure the calling function knows it failed
    }
  };

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <Navigation />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-3 tracking-tight text-white">Create</h1>
          <p className="text-sm sm:text-base md:text-lg text-[#b3b3b3]">Upload two image variants and publish to start collecting votes from your audience.</p>
        </div>

        {status !== "authenticated" ? (
          <div className="rounded-2xl border border-[#333333] bg-[#181818] p-6 sm:p-10 md:p-16 text-center transition-all duration-300 ease-out overflow-hidden animate-fade-in-up">
            <p className="text-lg sm:text-xl text-white mb-6 sm:mb-8 font-medium">Sign in to create an A/B test</p>
            <button
              onClick={() => {
                signIn("google", { callbackUrl: "/create" }).catch((err) => {
                  console.error("Sign in error:", err);
                  alert("Sign in failed. Please check that Google OAuth credentials are configured in .env.local.local");
                });
              }}
              className="rounded-full bg-[#FF6B6B] px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-[#1a1a1a] hover:bg-[#FF8C8C] hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#FF6B6B]/50 transition-all duration-300 ease-out active:scale-95 disabled:shadow-none"
              aria-label="Sign in with Google to create A/B test"
            >
              Sign in with Google
            </button>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8 rounded-2xl border border-[#333333] bg-[#181818] p-4 sm:p-6 md:p-10 transition-all duration-300 ease-out overflow-hidden animate-fade-in-up">
            <div>
              <label htmlFor="test-title" className="block mb-3">
                <span className="text-sm font-bold text-white uppercase tracking-wider">Test Title</span>
                <span className="text-[#FF6B6B] ml-1" aria-label="required">*</span>
              </label>
              <input
                id="test-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg bg-[#282828] border border-[#404040] px-4 sm:px-5 py-3 sm:py-4 text-base sm:text-lg text-white placeholder:text-[#6b6b6b] focus:border-[#FF6B6B] focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/30 transition-all duration-300 ease-out focus:scale-[1.01]"
                placeholder="Which landing page design converts better?"
                aria-required="true"
                aria-describedby="title-help"
              />
              <p id="title-help" className="sr-only">Enter a descriptive title for your A/B test</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2" role="group" aria-label="Test variants">
              <UploadCard
                label="Variant A"
                onFile={(file) => handleUpload(file, (u) => setImageA(u))}
                preview={imageA?.url}
                variant="A"
              />
              <UploadCard
                label="Variant B"
                onFile={(file) => handleUpload(file, (u) => setImageB(u))}
                preview={imageB?.url}
                variant="B"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-4 animate-fade-in-scale animate-bounce-in" role="alert" aria-live="polite">
                <p className="text-sm text-red-400 font-medium mb-2">{error}</p>
                {error.includes("Authentication token missing") && (
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/create" });
                    }}
                    className="text-sm text-red-400 underline hover:text-red-300 transition-colors duration-300 ease-out"
                  >
                    Sign out and sign back in
                  </button>
                )}
              </div>
            )}

            <button
              onClick={() => {
                if (!title.trim()) {
                  setError("Please enter a title");
                  return;
                }
                if (!imageA || !imageB) {
                  setError("Please upload both images");
                  return;
                }
                createMutation.mutate();
              }}
              disabled={createMutation.isPending || !title.trim() || !imageA || !imageB}
              className="w-full rounded-full bg-[#FF6B6B] px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base font-bold text-[#1a1a1a] hover:bg-[#FF8C8C] hover:scale-[1.02] disabled:bg-[#404040] disabled:text-[#b3b3b3] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#404040] disabled:hover:scale-100 disabled:shadow-none focus:outline-none focus:ring-4 focus:ring-[#FF6B6B]/50 transition-all duration-300 ease-out active:scale-95"
              aria-label={createMutation.isPending ? "Creating test" : "Publish test"}
            >
              {createMutation.isPending ? "Creating..." : "Publish Test"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

function UploadCard({
  label,
  onFile,
  preview,
  variant,
}: {
  label: string;
  onFile: (f: File) => void;
  preview?: string;
  variant: "A" | "B";
}) {
  const [uploading, setUploading] = useState(false);
  const fileInputId = `file-input-${variant.toLowerCase()}`;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Reset file input to allow re-uploading the same file
    e.target.value = '';
    
    setUploading(true);
    try {
      await onFile(file);
    } catch (err) {
      // Error is already handled in handleUpload, just ensure state resets
      console.error("[Upload] Upload failed:", err);
    } finally {
      // Always reset uploading state, even if there's an error or timeout
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5 rounded-xl border border-[#333333] bg-[#282828] p-4 sm:p-6 transition-all duration-300 ease-out overflow-hidden">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm sm:text-base font-bold text-white uppercase tracking-wider" aria-label={`${label} variant`}>
          {label}
        </span>
        <label htmlFor={fileInputId} className={`flex-shrink-0 ${uploading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          <span className={`rounded-full bg-[#FF6B6B] px-3 sm:px-5 py-1.5 sm:py-2.5 text-xs sm:text-sm font-bold text-[#1a1a1a] hover:bg-[#FF8C8C] hover:scale-105 focus-within:outline-none focus-within:ring-4 focus-within:ring-[#FF6B6B]/50 transition-all duration-200 ease-out inline-block ${uploading ? 'bg-[#404040] text-[#b3b3b3] opacity-60 cursor-not-allowed hover:bg-[#404040] hover:scale-100' : ''}`}>
            {uploading ? "Uploading..." : preview ? "Change" : "Upload"}
          </span>
          <input
            id={fileInputId}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
            disabled={uploading}
            aria-label={`Upload image for ${label}`}
          />
        </label>
      </div>
      {preview ? (
        <div className="relative group">
          <img 
            src={preview} 
            alt={`Preview of ${label} variant`} 
            className="w-full h-48 sm:h-56 md:h-72 rounded-lg object-cover border border-[#404040] animate-fade-in-scale" 
          />
        </div>
      ) : (
        <div className="w-full h-48 sm:h-56 md:h-72 rounded-lg border-2 border-dashed border-[#404040] flex items-center justify-center bg-[#181818]" aria-label={`No image uploaded for ${label}`}>
          <div className="text-center text-[#6b6b6b]">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs sm:text-sm font-medium">No image selected</p>
          </div>
        </div>
      )}
    </div>
  );
}
