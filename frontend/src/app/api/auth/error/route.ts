import { NextResponse } from "next/server";
import { getBaseUrl } from "@/lib/config";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const error = searchParams.get("error");
  
  // Log the error for debugging
  if (error) {
    console.error("[NextAuth Error]", error);
  }
  
  // Use getBaseUrl for proper URL construction
  const baseUrl = getBaseUrl();
  
  // Redirect to home page
  return NextResponse.redirect(`${baseUrl}/`);
}

