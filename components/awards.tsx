import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Star } from "lucide-react"

export default function Awards() {
  return (
    <section className="py-20 bg-emerald-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-sage-900">Awards & Recognition</h2>
          <p className="text-lg text-sage-700 max-w-2xl mx-auto">
            Recognition for excellence in software development and programming competitions.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="relative overflow-hidden card-elegant hover-lift">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/40 to-emerald-300/40 rounded-full -translate-y-16 translate-x-16"></div>
            <CardHeader className="relative">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-sage-900">2020 Programathon Competition Winner</CardTitle>
                  <p className="text-sage-700">Costa Rica's Most Prestigious Programming Competition</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sage-700">
                Winner of the 2020 Programathon Competition, the most prestigious programming competition in Costa Rica,
                sponsored by Fiserv. This achievement demonstrates exceptional problem-solving skills and technical
                expertise in competitive programming.
              </p>

              <div className="flex items-center gap-2 pt-4">
                <Star className="h-4 w-4 text-emerald-500 fill-current" />
                <span className="text-sm font-medium text-emerald-700">Sponsored by Fiserv</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
