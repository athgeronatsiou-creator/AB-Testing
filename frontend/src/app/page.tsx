"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { getSocketUrl } from "@/lib/config";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { io, Socket } from "socket.io-client";
import { Navigation } from "@/components/Navigation";

type Test = {
  id: string;
  title: string;
  descA?: string | null;
  descB?: string | null;
  imageAUrl: string;
  imageBUrl: string;
  userId: string;
  publishedAt: string | null;
  _count: { votes: number };
  userVote: "A" | "B" | null;
};

export default function TestsPage() {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);
  const [initialTestIds, setInitialTestIds] = useState<Set<string>>(new Set());
  const [newTestIds, setNewTestIds] = useState<Set<string>>(new Set());
  const [votingTestId, setVotingTestId] = useState<string | null>(null);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(false);

  // Add timeout for session loading
  useEffect(() => {
    if (status === "loading") {
      const timer = setTimeout(() => {
        setSessionTimeout(true);
      }, 3000); // 3 second timeout
      return () => clearTimeout(timer);
    } else {
      setSessionTimeout(false);
    }
  }, [status]);

  const testsQuery = useQuery({
    queryKey: ["tests", session?.backendToken],
    queryFn: () => apiFetch<Test[]>("/tests", {}, session?.backendToken),
    enabled: status !== "loading", // Wait for session to load before fetching
    refetchOnWindowFocus: true, // Refetch when window regains focus (e.g., after refresh)
  });

  // Track initial test IDs on first load - these won't show "New" tag
  useEffect(() => {
    if (testsQuery.data) {
      if (initialTestIds.size === 0) {
        // First load - set initial IDs
        const ids = new Set(testsQuery.data.map(t => t.id));
        setInitialTestIds(ids);
      } else {
        // Subsequent loads - find new tests
        const currentIds = new Set(testsQuery.data.map(t => t.id));
        const newIds = new Set<string>();
        currentIds.forEach((id) => {
          if (!initialTestIds.has(id)) {
            newIds.add(id);
          }
        });
        if (newIds.size > 0) {
          setNewTestIds((prev) => {
            const combined = new Set([...prev, ...newIds]);
            return combined;
          });
          // Update initialTestIds to include the new ones so they don't show as "New" forever
          setInitialTestIds((prev) => {
            const updated = new Set([...prev, ...newIds]);
            return updated;
          });
          // Remove "New" tag after 10 seconds
          setTimeout(() => {
            setNewTestIds((prev) => {
              const updated = new Set(prev);
              newIds.forEach((id) => updated.delete(id));
              return updated;
            });
          }, 10000);
        }
      }
    }
  }, [testsQuery.data, initialTestIds]);

  // Track if we've loaded data at least once to prevent re-animation
  useEffect(() => {
    if (testsQuery.data && !hasLoadedOnce) {
      setHasLoadedOnce(true);
    }
  }, [testsQuery.data, hasLoadedOnce]);

  const voteMutation = useMutation({
    mutationFn: async (params: { testId: string; choice: "A" | "B" }) => {
      setVotingTestId(params.testId);
      await apiFetch(
        `/tests/${params.testId}/vote`,
        {
          method: "POST",
          body: JSON.stringify({ choice: params.choice }),
        },
        session?.backendToken
      );
      return { testId: params.testId, choice: params.choice };
    },
    onMutate: async ({ testId, choice }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["tests", session?.backendToken] });

      // Snapshot the previous value
      const previousTests = queryClient.getQueryData<Test[]>(["tests", session?.backendToken]);

      // Optimistically update the vote count
      if (previousTests) {
        queryClient.setQueryData<Test[]>(["tests"], (old) => {
          if (!old) return old;
          return old.map((test) => {
            if (test.id === testId) {
              // If user hasn't voted yet, increment the count
              // If user already voted (changing vote or same vote), count stays the same
              const wasAlreadyVoted = test.userVote != null;
              return {
                ...test,
                userVote: choice,
                _count: {
                  votes: wasAlreadyVoted ? test._count.votes : test._count.votes + 1,
                },
              };
            }
            return test;
          });
        });
      }

      return { previousTests };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousTests) {
        queryClient.setQueryData(["tests", session?.backendToken], context.previousTests);
      }
      setVotingTestId(null);
    },
    onSuccess: async () => {
      // Immediately refetch to get accurate data from server including userVote
      // This ensures the vote is persisted and userVote is set correctly
      await queryClient.refetchQueries({ queryKey: ["tests", session?.backendToken], exact: true });
      setVotingTestId(null);
    },
  });

  useEffect(() => {
    if (!testsQuery.data) return;
    const socketUrl = getSocketUrl();
    const socket: Socket = io(socketUrl, { transports: ["websocket"] });
    testsQuery.data.forEach((t) => socket.emit("join-test", t.id));
    socket.on("vote", () => {
      queryClient.invalidateQueries({ queryKey: ["tests"] });
    });
    return () => {
      socket.disconnect();
    };
  }, [testsQuery.data, queryClient]);

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

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <Navigation />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        {status === "loading" && !sessionTimeout ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-4 border-[#FF6B6B] border-t-transparent rounded-full animate-spin mb-4" aria-hidden="true"></div>
              <p className="text-[#b3b3b3] animate-pulse">Loading...</p>
            </div>
          </div>
        ) : status !== "authenticated" ? (
          <div className="mb-8 sm:mb-10 md:mb-12 rounded-2xl border border-[#333333] bg-gradient-to-br from-[#181818] to-[#1a1a1a] p-6 sm:p-8 md:p-10 text-center transition-all duration-300 ease-out overflow-hidden animate-fade-in-up">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 text-white tracking-tight">
                Welcome to A/B Testing!
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-[#b3b3b3] mb-4 sm:mb-6 leading-relaxed">
                Discover which designs, layouts, and concepts resonate most with your audience. Browse existing tests or create your own to gather real-time feedback.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="flex items-center gap-2 text-sm sm:text-base text-[#b3b3b3]">
                  <svg className="w-5 h-5 text-[#FF6B6B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Vote on tests</span>
                </div>
                <div className="flex items-center gap-2 text-sm sm:text-base text-[#b3b3b3]">
                  <svg className="w-5 h-5 text-[#FF6B6B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Create your own tests</span>
                </div>
                <div className="flex items-center gap-2 text-sm sm:text-base text-[#b3b3b3]">
                  <svg className="w-5 h-5 text-[#FF6B6B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>See real-time results</span>
                </div>
              </div>
              <button
                onClick={() => {
                  signIn("google", { callbackUrl: "/" }).catch((err) => {
                    console.error("Sign in error:", err);
                    alert("Sign in failed. Please check that Google OAuth credentials are configured in .env.local");
                  });
                }}
                className="inline-flex items-center gap-2 sm:gap-3 rounded-full bg-[#FF6B6B] px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-sm sm:text-base font-bold text-[#1a1a1a] hover:bg-[#FF8C8C] hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#FF6B6B]/50 transition-all duration-200 ease-out active:scale-95"
                aria-label="Sign in with Google to start testing and voting"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Sign in with Google to start</span>
              </button>
              <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-[#6b6b6b]">
                Sign in to vote on tests and create your own A/B tests
              </p>
            </div>
          </div>
        ) : (
          <div className="transition-all duration-300 ease-out overflow-hidden animate-fade-in-up">
            <div className="mb-8 sm:mb-10 md:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-3 tracking-tight text-white">Browse Tests</h1>
              <p className="text-sm sm:text-base md:text-lg text-[#b3b3b3]">Vote on published tests and see results update in real-time.</p>
            </div>

            {testsQuery.isLoading && (
              <div className="text-center py-20 animate-fade-in" role="status" aria-live="polite">
                <div className="inline-block w-8 h-8 border-4 border-[#FF6B6B] border-t-transparent rounded-full animate-spin mb-4" aria-hidden="true"></div>
                <p className="text-[#b3b3b3] animate-pulse">Loading tests…</p>
              </div>
            )}
            {testsQuery.isError && (
              <div className="text-center py-20 animate-fade-in-scale animate-bounce-in" role="alert">
                <p className="text-red-400 font-medium">Failed to load tests</p>
              </div>
            )}

            {testsQuery.data && testsQuery.data.length === 0 && (
              <div className="text-center py-12 sm:py-16 md:py-20 rounded-2xl border border-[#333333] bg-[#181818] px-4 transition-all duration-300 ease-out overflow-hidden animate-fade-in-up">
                <p className="text-lg sm:text-xl text-[#b3b3b3] mb-4 sm:mb-6 font-medium">No published tests yet.</p>
                <Link 
                  href="/create" 
                  className="inline-block rounded-full bg-[#FF6B6B] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#1a1a1a] hover:bg-[#FF8C8C] hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#FF6B6B]/50 transition-all duration-300 ease-out"
                  aria-label="Create the first test"
                >
                  Create the first test →
                </Link>
              </div>
            )}

            {testsQuery.data && testsQuery.data.length > 0 && (
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-300 ease-out overflow-hidden" role="list" aria-label="A/B tests">
                {testsQuery.data.map((test) => (
            <article 
              key={test.id} 
              className="group rounded-xl sm:rounded-2xl border border-[#333333] bg-[#181818] transition-all duration-300 ease-out overflow-hidden"
              role="listitem"
            >
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[#333333] bg-[#282828]">
                <div className="flex items-start gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-white line-clamp-2 flex-1">{test.title}</h2>
                  {newTestIds.has(test.id) && (
                    <span className="rounded-full bg-[#FF6B6B] px-2.5 py-0.5 text-xs font-bold text-[#1a1a1a] flex-shrink-0 animate-fade-in-scale">
                      New
                    </span>
                  )}
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
                  <button
                    onClick={() => {
                      if (status !== "authenticated") {
                        signIn("google", { callbackUrl: "/" });
                        return;
                      }
                      voteMutation.mutate({ testId: test.id, choice: "A" });
                    }}
                    className="rounded-full bg-[#FF6B6B] px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-[#1a1a1a] hover:bg-[#FF8C8C] hover:scale-105 disabled:bg-[#404040] disabled:text-[#b3b3b3] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#404040] disabled:hover:scale-100 disabled:shadow-none focus:outline-none focus:ring-4 focus:ring-[#FF6B6B]/50 transition-all duration-200 ease-out"
                    disabled={(status === "authenticated" && session?.user?.id === test.userId) || (status === "authenticated" && test.userVote != null) || votingTestId === test.id}
                    aria-label={status === "authenticated" && session?.user?.id === test.userId ? "You cannot vote on your own test" : test.userVote === "A" ? "You voted for option A" : `Vote for option A in ${test.title}`}
                  >
                    {status === "authenticated" && session?.user?.id === test.userId ? "Your test" : votingTestId === test.id ? "Voting..." : test.userVote === "A" ? "Voted ✓" : "Vote A"}
                  </button>
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
                  <button
                    onClick={() => {
                      if (status !== "authenticated") {
                        signIn("google", { callbackUrl: "/" });
                        return;
                      }
                      voteMutation.mutate({ testId: test.id, choice: "B" });
                    }}
                    className="rounded-full bg-[#FF6B6B] px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-[#1a1a1a] hover:bg-[#FF8C8C] hover:scale-105 disabled:bg-[#404040] disabled:text-[#b3b3b3] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#404040] disabled:hover:scale-100 disabled:shadow-none focus:outline-none focus:ring-4 focus:ring-[#FF6B6B]/50 transition-all duration-200 ease-out"
                    disabled={(status === "authenticated" && session?.user?.id === test.userId) || (status === "authenticated" && test.userVote != null) || votingTestId === test.id}
                    aria-label={status === "authenticated" && session?.user?.id === test.userId ? "You cannot vote on your own test" : test.userVote === "B" ? "You voted for option B" : `Vote for option B in ${test.title}`}
                  >
                    {status === "authenticated" && session?.user?.id === test.userId ? "Your test" : votingTestId === test.id ? "Voting..." : test.userVote === "B" ? "Voted ✓" : "Vote B"}
                  </button>
                </div>
              </div>
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-[#333333] bg-[#282828]">
                <p className="text-xs sm:text-sm font-semibold text-[#b3b3b3]">
                  <span className="text-[#FF6B6B] font-bold" aria-label={`${test._count.votes} total votes`}>{test._count.votes}</span> votes
                </p>
              </div>
            </article>
            ))}
          </div>
        )}
          </div>
        )}
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
