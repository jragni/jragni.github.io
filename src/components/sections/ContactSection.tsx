import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react'

export function ContactSection() {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      href: 'https://github.com/jragni',
      description: 'View my code and open-source contributions',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      href: 'https://www.linkedin.com/in/jhensenagni',
      description: 'Connect with me professionally',
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      href: 'mailto:jhensenrayagni@gmail.com',
      description: 'Send me a message',
    },
  ]

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container max-w-4xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary font-mono">[05]</span> GET IN TOUCH
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-md mx-auto" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always open to new opportunities, collaborations, and interesting conversations.
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
        </div>

        {/* Main Contact Card */}
        <Card className="bg-card/50 backdrop-blur-sm border-primary/30 mb-8">
          <CardContent className="p-8 md:p-12 text-center space-y-8">
            <div className="space-y-4">
              <div className="font-mono text-primary text-sm">&gt; READY TO CONNECT?</div>
              <p className="text-xl text-foreground/90">
                Let's build something amazing together
              </p>
            </div>

            <Button
              size="lg"
              className="font-mono bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
              asChild
            >
              <a href="mailto:jhensenrayagni@gmail.com">
                <Mail className="w-5 h-5 mr-2" />
                Send Me an Email
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Social Links Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {socialLinks.map((link, index) => (
            <Card
              key={index}
              className="bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-primary group-hover:scale-110 transition-transform">
                      {link.icon}
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {link.name}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {link.description}
                    </div>
                  </div>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <Card className="bg-card/30 backdrop-blur-sm border-primary/20">
            <CardContent className="p-6">
              <p className="text-foreground/60 text-sm font-mono">
                &gt; Built with React, TypeScript, Vite, and shadcn/ui
                <br />
                <span className="text-primary">© 2025 Jhensen Ray Agni</span> — Designed &amp; Developed with ❤️
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
