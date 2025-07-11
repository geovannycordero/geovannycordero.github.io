"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Linkedin } from "lucide-react"
import Link from "next/link"

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "geovanny@pm.me",
      href: "mailto:geovanny@pm.me",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San José, Costa Rica",
      href: null,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/geovannycordero",
      href: "https://linkedin.com/in/geovannycordero",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-sage-900">Get In Touch</h2>
          <p className="text-lg text-sage-700 max-w-2xl mx-auto">
            Ready to collaborate on your next project? Let's discuss how we can work together to bring your ideas to
            life.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contactInfo.map((item, index) => (
              <Card key={index} className="text-center p-6 card-elegant hover-lift">
                <CardContent className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-sage-900">{item.label}</h3>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-sage-700 hover:text-emerald-600 transition-colors text-sm"
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                      >
                        {item.value}
                      </Link>
                    ) : (
                      <p className="text-sage-700 text-sm">{item.value}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sage-700">
              Ready to collaborate on your next project? Feel free to reach out via email or connect with me on
              LinkedIn.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
