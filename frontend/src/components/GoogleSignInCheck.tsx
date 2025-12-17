"use client";

import { useEffect, useState } from "react";

export function GoogleSignInCheck() {
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if Google OAuth is configured by trying to access the auth endpoint
    fetch("/api/auth/providers")
      .then((res) => res.json())
      .then((data) => {
        setIsConfigured(data.google !== undefined);
      })
      .catch(() => setIsConfigured(false));
  }, []);

  if (isConfigured === false) {
    return (
      <div className="mb-4 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-800">
        <p className="font-semibold">⚠️ Google OAuth Not Configured</p>
        <p className="mt-1">
          Please add your Google OAuth credentials to <code className="rounded bg-yellow-100 px-1">frontend/.env.local</code>
        </p>
        <p className="mt-2">
          See <code className="rounded bg-yellow-100 px-1">GOOGLE_OAUTH_SETUP.md</code> for instructions.
        </p>
      </div>
    );
  }

  return null;
}


