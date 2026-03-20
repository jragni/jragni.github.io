import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { carouselImages } from './constants'

interface StatItem {
  value: number
  suffix: string
  label: string
}

const stats: StatItem[] = [
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 10, suffix: '+', label: 'Projects Built' },
  { value: 3, suffix: '', label: 'Engineering Domains' },
]

function AnimatedStat({ value, suffix, label }: StatItem) {
  const [displayed, setDisplayed] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let start = 0
          const duration = 1200
          const step = Math.ceil(value / (duration / 16))
          const timer = setInterval(() => {
            start += step
            if (start >= value) {
              setDisplayed(value)
              clearInterval(timer)
            } else {
              setDisplayed(start)
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-center">
      <div className="font-mono text-3xl sm:text-4xl font-bold text-primary tactical-glow">
        {displayed}{suffix}
      </div>
      <div className="hud-label mt-1">{label}</div>
    </div>
  )
}

export function AboutSection() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!carouselApi) return
    const onSelect = () => setCurrentSlide(carouselApi.selectedScrollSnap())
    carouselApi.on('select', onSelect)
    return () => { carouselApi.off('select', onSelect) }
  }, [carouselApi])

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="container max-w-5xl">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="hud-label mb-2">// DOSSIER //</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary font-mono">[01]</span> ABOUT ME
          </h2>
          <div className="h-px bg-gradient-to-r from-primary via-primary/50 to-transparent max-w-md" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Left Column - Bio */}
          <div className="space-y-6">
            <div className="space-y-4">
              {/* First paragraph - larger/prominent */}
              <p className="text-lg sm:text-xl text-foreground leading-relaxed font-medium">
                I'm a <span className="text-primary font-semibold">full-stack software engineer</span> with
                a unique background spanning software development, robotics, and systems engineering. My journey
                from mechanical engineering to software development has given me a distinctive perspective on
                problem-solving and system design. <em className="text-primary font-semibold not-italic">One mind, any framework</em>.
              </p>

              {/* Second paragraph - slightly muted */}
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                Currently, I work at <span className="text-primary">Dovenmuehle Mortgage</span>, where I develop
                and maintain web and mobile applications that serve thousands of mortgage customers. I specialize
                in architecting full-stack solutions with{' '}
                <span className="text-foreground font-semibold">TypeScript</span>,{' '}
                <span className="text-foreground font-semibold">React</span>, and{' '}
                <span className="text-foreground font-semibold">Node.js</span>, focusing on scalability, performance optimization, and intuitive user experiences.
              </p>

              {/* Third paragraph - more muted */}
              <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
                Beyond web development, I'm passionate about <span className="text-primary">robotics and AI</span>.
                I've built autonomous robots using ROS2, developed computer vision systems with YOLO, and created
                real-time telemetry dashboards. I love working at the intersection of software and hardware,
                where code meets the physical world.
              </p>

              {/* Fourth paragraph - most muted */}
              <p className="text-sm sm:text-base text-foreground/55 leading-relaxed">
                When I'm not coding, you'll find me powerlifting at the gym, training in BJJ, or volunteering for beach cleanups.
                I also enjoy tinkering with robotics projects and contributing to open-source. I believe in continuous learning—whether
                it's mastering a new framework, perfecting a lift, or learning a new technique on the mat.
              </p>
            </div>

            {/* Animated Stats */}
            <div className="mt-8">
              <div className="border border-primary/20 bg-card/30 backdrop-blur-sm rounded-sm p-6">
                <div className="hud-label mb-4">// METRICS</div>
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat, i) => (
                    <AnimatedStat key={i} {...stat} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Carousel + Quick Facts */}
          <div className="flex flex-col space-y-6 sm:space-y-8">
            {/* Image Carousel */}
            <div>
              <Carousel setApi={setCarouselApi}>
                <CarouselContent>
                  {carouselImages.map(({ src, alt, customStyle }, index) => (
                    <CarouselItem key={index}>
                      <Card className="bg-card/50 backdrop-blur-sm border-primary/30 overflow-hidden">
                        <div className="relative bg-secondary/30 flex items-center justify-center">
                          <ImageWithSkeleton
                            src={src}
                            alt={alt}
                            customStyle={customStyle}
                          />
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hud-focus" />
                <CarouselNext className="hud-focus" />
              </Carousel>

              {/* Thumbnail strip */}
              <div className="flex gap-2 mt-3 justify-center flex-wrap">
                {carouselImages.map(({ alt }, index) => (
                  <button
                    key={index}
                    onClick={() => carouselApi?.scrollTo(index)}
                    className={`
                      w-8 h-8 rounded-sm overflow-hidden border transition-all duration-200 hud-focus focus-visible:outline-none
                      ${currentSlide === index
                        ? 'border-primary scale-110 shadow shadow-primary/30'
                        : 'border-primary/20 hover:border-primary/50 opacity-60 hover:opacity-100'
                      }
                    `}
                    aria-label={`Go to image ${index + 1}: ${alt}`}
                  >
                    <div className="w-full h-full bg-secondary/60 flex items-center justify-center">
                      <span className="font-mono text-[8px] text-primary/60">{index + 1}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Facts HUD Panel */}
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
              <CardContent className="p-5 sm:p-6">
                <div className="hud-label mb-4">// QUICK FACTS</div>

                <div className="space-y-4">
                  <HUDFactRow label="LOCATION" value="Los Angeles, CA" />
                  <div className="h-px bg-primary/10" />
                  <HUDFactRow label="EXPERIENCE" value="5+ Years" />
                  <div className="h-px bg-primary/10" />
                  <div>
                    <div className="font-mono text-[10px] text-muted-foreground mb-2 tracking-wider">FOCUS AREAS</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border border-primary/20">Web Dev</Badge>
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border border-primary/20">Robotics</Badge>
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border border-primary/20">AI/ML</Badge>
                    </div>
                  </div>
                  <div className="h-px bg-primary/10" />
                  <div>
                    <div className="font-mono text-[10px] text-muted-foreground mb-2 tracking-wider">EDUCATION</div>
                    <div className="space-y-2">
                      <div>
                        <div className="text-xs sm:text-sm text-foreground">B.S. Mechanical Engineering</div>
                        <div className="text-[10px] text-muted-foreground">Manufacturing &amp; Design</div>
                        <div className="text-[10px] text-muted-foreground">UC Riverside</div>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm text-foreground">Software Engineering</div>
                        <div className="text-[10px] text-muted-foreground">Rithm School</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

function HUDFactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="font-mono text-[10px] text-muted-foreground tracking-wider">{label}</div>
      <div className="text-xs sm:text-sm text-foreground font-medium">{value}</div>
    </div>
  )
}

function ImageWithSkeleton({ src, alt, customStyle }: { src: string; alt: string; customStyle: string }) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div className="aspect-square w-full flex items-center justify-center bg-secondary/30">
        <div className="font-mono text-primary text-sm text-center">
          <div className="text-2xl mb-2">[ ]</div>
          <div className="text-xs text-muted-foreground">[IMAGE UNAVAILABLE]</div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-square">
      {!loaded && (
        <div className="absolute inset-0 img-skeleton" />
      )}
      <img
        src={src}
        alt={alt}
        className={`aspect-square object-cover w-full transition-opacity duration-300 ${customStyle} ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
      />
    </div>
  )
}
