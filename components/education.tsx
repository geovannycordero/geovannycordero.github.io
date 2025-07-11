import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, GraduationCap, Award } from "lucide-react"

export default function Education() {
  const education = [
    {
      degree: "MBA in Project Management",
      institution: "Universidad Estatal a Distancia (UNED)",
      period: "In Progress",
      status: "current",
    },
    {
      degree: "Bachelor in Computer Science",
      institution: "Universidad de Costa Rica (UCR)",
      period: "2019",
      status: "completed",
    },
  ]

  const certifications = [
    {
      title: "Gerencia con Liderazgo",
      institution: "INCAE Business School",
      year: "2020",
    },
    {
      title: "Introduction to Data Analytics for Business",
      institution: "University of Colorado Boulder, Coursera",
      year: "2020",
    },
    {
      title: "Crisis Management",
      institution: "INCAE Business School",
      year: "2022",
    },
    {
      title: "Introduction to Big Data",
      institution: "University of California San Diego, Coursera",
      year: "2021",
    },
    {
      title: "Desarrollo de Habilidades Blandas",
      institution: "UNED",
      year: "2023",
    },
  ]

  return (
    <section id="education" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-sage-900">Education & Certifications</h2>
          <p className="text-lg text-sage-700 max-w-2xl mx-auto">
            Continuous learning and professional development through formal education and specialized certifications.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-emerald-800">
              <GraduationCap className="h-6 w-6 text-emerald-600" />
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <Card key={index} className="card-elegant hover-lift">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <CardTitle className="text-lg text-sage-900">{edu.degree}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={edu.status === "current" ? "default" : "secondary"}
                          className={
                            edu.status === "current" ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-700"
                          }
                        >
                          {edu.status === "current" ? "In Progress" : "Completed"}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-sage-600">
                          <Calendar className="h-4 w-4" />
                          <span>{edu.period}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sage-700">{edu.institution}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-emerald-800">
              <Award className="h-6 w-6 text-emerald-600" />
              Certifications
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <Card key={index} className="card-elegant hover-lift">
                  <CardHeader>
                    <CardTitle className="text-base text-sage-900">{cert.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-sage-700 mb-2">{cert.institution}</p>
                    <Badge variant="outline" className="text-xs border-emerald-300 text-emerald-700">
                      {cert.year}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
