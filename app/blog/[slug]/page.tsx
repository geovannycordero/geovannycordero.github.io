import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowLeft, Clock, User } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { notFound } from "next/navigation"
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog"
import BackToTopButton from "./BackToTopButton"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found - Geovanny Cordero Valverde",
    }
  }

  return {
    title: `${post.title} - Geovanny Cordero Valverde`,
    description: post.excerpt,
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sage-600 hover:text-emerald-600 transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <article>
              <header className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

                <div className="flex flex-wrap items-center gap-6 text-sm text-sage-600 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <p className="text-lg text-sage-700">{post.excerpt}</p>
              </header>

              <Card>
                <CardContent className="prose prose-lg max-w-none p-8">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </CardContent>
              </Card>
            </article>

            <div className="mt-12 text-center">
              <p className="text-sage-700 mb-4">
                Enjoyed this article? Connect with me on social media for more insights.
              </p>
              <Link
                href="https://linkedin.com/in/geovannycordero"
                target="_blank"
                className="text-emerald-600 hover:underline font-medium"
              >
                Follow me on LinkedIn →
              </Link>
            </div>

            <div className="mt-8 text-center">
              <BackToTopButton />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}
