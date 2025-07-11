import { generateRSSFeed } from "@/lib/rss"

export const dynamic = "force-static"

export async function GET() {
  const rss = await generateRSSFeed()

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  })
}
