import { NextResponse } from "next/server";
import { generateRssXml } from "@/lib/rss";

export async function GET() {
  const xml = generateRssXml();
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=UTF-8",
      "Cache-Control": "s-maxage=300, stale-while-revalidate"
    }
  });
}
