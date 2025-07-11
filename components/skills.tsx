import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Golang", "Ruby on Rails", "JavaScript", "TypeScript"],
    },
    {
      title: "Frontend Technologies",
      skills: ["Vue.js", "React Native", "TailwindCSS", "Vuetify"],
    },
    {
      title: "Backend Technologies",
      skills: ["Node.js", "Golang", "Ruby on Rails", "GraphQL"],
    },
    {
      title: "Databases",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "CouchDB"],
    },
    {
      title: "Cloud & DevOps",
      skills: ["AWS (EC2, ECS, ECR, RDS, Lambda)", "Docker", "CI/CD", "GitHub Actions", "CircleCI"],
    },
    {
      title: "Version Control",
      skills: ["Git", "GitHub", "GitLab"],
    },
    {
      title: "Soft Skills",
      skills: ["Leadership", "Communication", "Problem Solving", "Team Management", "Mentoring", "Project Management"],
    },
    {
      title: "Languages",
      skills: ["Spanish (Native)", "English (Fluent)"],
    },
  ]

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-sage-900">Skills & Expertise</h2>
          <p className="text-lg text-sage-700 max-w-2xl mx-auto">
            A comprehensive toolkit of technologies and skills developed through years of hands-on experience and
            continuous learning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className="h-full card-elegant hover-lift">
              <CardHeader>
                <CardTitle className="text-lg text-emerald-800">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="text-xs bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
