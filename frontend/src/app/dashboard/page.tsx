"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

type MyTest = {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  descA?: string | null;
  descB?: string | null;
  imageAUrl: string;
  imageBUrl: string;
  votesA: number;
  votesB: number;
  total: number;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);

  const publishMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiFetch(`/tests/${id}/publish`, { method: "PATCH" }, session?.backendToken);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["my-tests"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiFetch(`/tests/${id}`, { method: "DELETE" }, session?.backendToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-tests"] });
      setDeleteConfirmId(null);
    },
  });

  const testsQuery = useQuery({
    queryKey: ["my-tests"],
    enabled: status === "authenticated",
    queryFn: () => apiFetch<MyTest[]>("/tests/mine", {}, session?.backendToken),
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    if (selectedImage) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  if (status !== "authenticated") {
    return (
      <main className="min-h-screen bg-[#121212] text-white flex items-center justify-center px-4">
        <div className="rounded-2xl border border-[#333333] bg-gradient-to-br from-[#181818] to-[#1a1a1a] p-6 sm:p-10 md:p-12 text-center max-w-md w-full transition-all duration-300 ease-out overflow-hidden animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4 text-white tracking-tight">
            Welcome to A/B Testing
          </h2>
          <p className="text-base sm:text-lg text-[#b3b3b3] mb-6 sm:mb-8 leading-relaxed">
            Sign in to view and manage all your A/B tests. Track results, see real-time statistics, and create new tests to gather valuable feedback from your audience.
          </p>
          <button
            onClick={() => {
              signIn("google", { callbackUrl: "/dashboard" }).catch((err) => {
                console.error("Sign in error:", err);
                alert("Sign in failed. Please check that Google OAuth credentials are configured in .env.local.local");
              });
            }}
            className="inline-flex items-center gap-2 sm:gap-3 rounded-full bg-[#FF6B6B] px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-[#1a1a1a] hover:bg-[#FF8C8C] hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#FF6B6B]/50 transition-all duration-200 ease-out active:scale-95"
            aria-label="Sign in with Google to view dashboard"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <Navigation />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-3 tracking-tight text-white">My Tests</h1>
          <p className="text-sm sm:text-base md:text-lg text-[#b3b3b3]">Live totals and splits updated on refresh.</p>
        </div>

        {testsQuery.isLoading && (
          <div className="text-center py-20 animate-fade-in" role="status" aria-live="polite">
            <div className="inline-block w-8 h-8 border-4 border-[#FF6B6B] border-t-transparent rounded-full animate-spin mb-4" aria-hidden="true"></div>
            <p className="text-[#b3b3b3] animate-pulse">Loading…</p>
          </div>
        )}
        {testsQuery.isError && (
          <div className="text-center py-20 animate-fade-in-scale animate-bounce-in" role="alert">
            <p className="text-red-400 font-medium">Failed to load tests</p>
          </div>
        )}

        {testsQuery.data && testsQuery.data.length === 0 && (
          <div className="text-center py-12 sm:py-16 md:py-20 rounded-2xl border border-[#333333] bg-[#181818] px-4 transition-all duration-300 ease-out overflow-hidden animate-fade-in-up">
            <p className="text-lg sm:text-xl text-[#b3b3b3] mb-4 sm:mb-6 font-medium">You haven't created any tests yet.</p>
            <Link 
              href="/create" 
              className="inline-block rounded-full bg-[#FF6B6B] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#1a1a1a] hover:bg-[#FF8C8C] hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#FF6B6B]/50 transition-all duration-300 ease-out"
              aria-label="Create your first A/B test"
            >
              Create your first test →
            </Link>
          </div>
        )}

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-300 ease-out overflow-hidden animate-fade-in-up" role="list" aria-label="Your A/B tests">
          {testsQuery.data?.map((test) => {
            return (
              <article 
                key={test.id} 
                className="group relative rounded-xl sm:rounded-2xl border border-[#333333] bg-[#181818] transition-all duration-300 ease-out overflow-hidden"
                role="listitem"
              >
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[#333333] bg-[#282828]">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="text-base sm:text-lg font-bold text-white line-clamp-2 flex-1">{test.title}</h2>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {test.status !== "PUBLISHED" && (
                        <button
                          onClick={() => publishMutation.mutate(test.id)}
                          className="rounded-full bg-[#FF6B6B] px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-bold text-[#1a1a1a] hover:bg-[#FF8C8C] hover:scale-105 disabled:bg-[#404040] disabled:text-[#b3b3b3] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#404040] disabled:hover:scale-100 disabled:shadow-none focus:outline-none focus:ring-4 focus:ring-[#FF6B6B]/50 transition-all duration-300 ease-out active:scale-95 flex-shrink-0"
                          disabled={publishMutation.isPending}
                          aria-label={`Publish test: ${test.title}`}
                        >
                          {publishMutation.isPending ? "..." : "Publish"}
                        </button>
                      )}
                      <button
                        onClick={() => setDeleteConfirmId(test.id)}
                        className="rounded-full bg-[#404040] hover:bg-[#555555] px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-white hover:scale-105 disabled:bg-[#2a2a2a] disabled:text-[#6b6b6b] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#2a2a2a] disabled:hover:scale-100 disabled:shadow-none focus:outline-none focus:ring-4 focus:ring-red-500/50 transition-all duration-300 ease-out active:scale-95"
                        aria-label={`Delete test: ${test.title}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#b3b3b3] font-medium">
                    <span className="inline-flex items-center gap-1.5" aria-label={`Status: ${test.status}`}>
                      {test.status === "PUBLISHED" ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-[#FF6B6B] flex-shrink-0" aria-hidden="true"></span>
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <span className="w-2 h-2 rounded-full bg-[#b3b3b3] flex-shrink-0" aria-hidden="true"></span>
                          <span>Draft</span>
                        </>
                      )}
                    </span>
                    <span>•</span>
                    <span aria-label={`${test.total} total votes`}>{test.total} votes</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-0" role="group" aria-label={`Voting options for ${test.title}`}>
                  <div className="p-3 sm:p-4 md:p-5 flex flex-col gap-2 sm:gap-3 md:gap-4 bg-[#1a1a1a]">
                    <div className="relative overflow-hidden rounded-lg cursor-pointer" onClick={() => setSelectedImage({ url: test.imageAUrl, alt: `Option A for ${test.title}` })}>
                      <img
                        src={test.imageAUrl}
                        alt={`Option A for ${test.title}`}
                        className="w-full h-32 sm:h-40 md:h-48 object-cover"
                      />
                    </div>
                    {test.descA && (
                      <p className="text-xs text-[#b3b3b3] line-clamp-2 leading-relaxed">{test.descA}</p>
                    )}
                    <div className="rounded-lg bg-[#282828] px-3 py-2 border border-[#333333]">
                      <p className="text-xs text-[#b3b3b3] font-medium mb-1">
                        <span className="text-[#FF6B6B] font-bold">{test.votesA}</span> votes
                      </p>
                      <div className="h-1.5 rounded-full bg-[#181818] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#FF6B6B] transition-all duration-700 ease-out"
                          style={{ width: `${test.total ? Math.round((test.votesA / test.total) * 100) : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 flex flex-col gap-2 sm:gap-3 md:gap-4 bg-[#1a1a1a] border-l border-[#333333]">
                    <div className="relative overflow-hidden rounded-lg cursor-pointer" onClick={() => setSelectedImage({ url: test.imageBUrl, alt: `Option B for ${test.title}` })}>
                      <img
                        src={test.imageBUrl}
                        alt={`Option B for ${test.title}`}
                        className="w-full h-32 sm:h-40 md:h-48 object-cover"
                      />
                    </div>
                    {test.descB && (
                      <p className="text-xs text-[#b3b3b3] line-clamp-2 leading-relaxed">{test.descB}</p>
                    )}
                    <div className="rounded-lg bg-[#282828] px-3 py-2 border border-[#333333]">
                      <p className="text-xs text-[#b3b3b3] font-medium mb-1">
                        <span className="text-[#FF6B6B] font-bold">{test.votesB}</span> votes
                      </p>
                      <div className="h-1.5 rounded-full bg-[#181818] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#FF6B6B] transition-all duration-700 ease-out"
                          style={{ width: `${test.total ? Math.round((test.votesB / test.total) * 100) : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Delete confirmation dialog */}
                {deleteConfirmId === test.id && (
                  <div className="absolute inset-0 bg-[#121212]/95 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl sm:rounded-2xl animate-fade-in-scale">
                    <div className="bg-[#181818] border border-[#333333] rounded-xl p-6 mx-4 max-w-sm w-full animate-bounce-in">
                      <h3 className="text-lg font-bold text-white mb-2">Delete test?</h3>
                      <p className="text-sm text-[#b3b3b3] mb-6">
                        This action cannot be undone. All votes and data for this test will be permanently deleted.
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="flex-1 rounded-full bg-[#282828] px-4 py-2 text-sm font-medium text-white hover:bg-[#404040] focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 focus:ring-offset-[#181818] transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => deleteMutation.mutate(test.id)}
                          disabled={deleteMutation.isPending}
                          className="flex-1 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 disabled:bg-[#404040] disabled:text-[#b3b3b3] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#404040] disabled:hover:scale-100 disabled:shadow-none focus:outline-none focus:ring-4 focus:ring-red-500/50 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                        >
                          {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-[#121212]/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-scale"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 rounded-full bg-[#282828] hover:bg-[#404040] p-3 text-white transition-all duration-300 ease-out hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#FF6B6B]/50"
              aria-label="Close image viewer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
