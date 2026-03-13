import { useState, useEffect, useCallback } from 'react'
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

interface SlideProps {
  src: string
  alt: string
  caption: string
  objectPosition?: string
}

function CarouselSlide({ src, alt, caption, objectPosition }: SlideProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="relative h-64 sm:h-80">
      {imgError ? (
        <div className="flex items-center justify-center h-full font-mono text-primary text-sm">
          [IMAGE]
        </div>
      ) : (
        <>
          <img
            src={src}
            alt={alt}
            className="object-cover w-full h-full"
            style={objectPosition ? { objectPosition } : undefined}
            loading="lazy"
            onError={() => setImgError(true)}
          />
          {/* Caption scrim */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          <p className="absolute bottom-2 left-3 right-3 font-mono text-xs text-white/90 pointer-events-none truncate">
            {caption}
          </p>
        </>
      )}
    </div>
  )
}

export function AboutSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [snapCount, setSnapCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setSnapCount(api.scrollSnapList().length)
    setActiveIndex(api.selectedScrollSnap())

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap())
    }

    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  const scrollToSnap = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="container max-w-5xl">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary font-mono">[01]</span> ABOUT ME
          </h2>
          <div className="h-px bg-gradient-to-r from-primary via-primary/50 to-transparent max-w-md" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Bio */}
          <div>
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30 hud-card-hover rounded-sm">
              <CardContent className="p-6 sm:p-8 space-y-4">
                <div className="font-mono text-primary text-xs mb-4">&gt; PROFILE</div>

                <p className="text-lg text-foreground/90 leading-relaxed">
                  I'm a <span className="text-primary font-semibold">full-stack engineer</span> with a background
                  in mechanical engineering, defense, and aerospace. I didn't take the traditional CS path into
                  software, but that's what makes how I think about problems a little different.{' '}
                  <i className="text-primary font-semibold">One mind, any framework</i>.
                </p>

                <p className="text-base text-foreground/75 leading-relaxed">
                  Right now I work at <span className="text-primary">Dovenmuehle Mortgage</span> where
                  I own the full-stack development of YourMortgageOnline across web, mobile-web, and native.
                  I've shipped the private-label migration for{' '}
                  <span className="text-foreground font-semibold">72+ credit unions and banks</span> and helped push the
                  mobile app to a <span className="text-foreground font-semibold">4.9-star rating</span> on the App Store.
                </p>

                <p className="text-base text-foreground/65 leading-relaxed">
                  Outside of work I build <span className="text-primary">robots</span>. Lately I've been working on
                  an autonomous search-and-rescue system using ROS2, SLAM, and YOLOv11 for real-time human detection.
                  I also built a telemetry dashboard that streams live sensor data from ROS2 robots over WebSockets.
                </p>

                <p className="text-sm text-foreground/55 leading-relaxed">
                  When I'm not coding or building robots, you'll find me training BJJ, powerlifting, running marathons, or volunteering
                  with PrincessProgramSTEM, AI LA, and local beach cleanups. I believe in continuous learning, whether
                  it's mastering a new framework, perfecting a lift, or learning a new technique on the mat.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Carousel and Quick Facts */}
          <div className="flex flex-col space-y-6 sm:space-y-8">
            {/* Carousel container */}
            <div className="overflow-hidden rounded-sm border border-primary/30 hud-card-hover">
              <Carousel setApi={setApi}>
                <CarouselContent>
                  {carouselImages.map(({ src, alt, caption, objectPosition }, index) => (
                    <CarouselItem key={index}>
                      <CarouselSlide src={src} alt={alt} caption={caption} objectPosition={objectPosition} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="border-primary/30 text-primary hover:bg-primary/10" />
                <CarouselNext className="border-primary/30 text-primary hover:bg-primary/10" />
              </Carousel>

              {/* Dot indicators */}
              {snapCount > 0 && (
                <div className="flex items-center justify-center gap-2 py-3 bg-card/50">
                  {Array.from({ length: snapCount }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToSnap(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={[
                        'min-w-[44px] min-h-[44px] flex items-center justify-center group',
                      ].join(' ')}
                    >
                      <span className={[
                        'block h-2 w-2 rounded-full transition-colors duration-200',
                        i === activeIndex ? 'bg-primary' : 'bg-primary/30',
                      ].join(' ')} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Facts */}
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30 hud-card-hover rounded-sm">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-mono text-primary text-xs sm:text-sm mb-4">&gt; QUICK FACTS</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground mb-1">LOCATION</div>
                    <div className="text-xs sm:text-sm text-foreground">Los Angeles, CA</div>
                  </div>

                  <div>
                    <div className="font-mono text-xs text-muted-foreground mb-1">EXPERIENCE</div>
                    <div className="text-xs sm:text-sm text-foreground">5+ Years</div>
                  </div>

                  <div className="col-span-2">
                    <div className="font-mono text-xs text-muted-foreground mb-1">FOCUS AREAS</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">Web Dev</Badge>
                      <Badge variant="secondary" className="text-xs">Robotics</Badge>
                      <Badge variant="secondary" className="text-xs">AI/ML</Badge>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="font-mono text-xs text-muted-foreground mb-1">EDUCATION</div>
                    <div className="text-xs sm:text-sm text-foreground">B.S. Mechanical Engineering</div>
                    <div className="text-xs text-muted-foreground">Manufacturing & Design</div>
                    <div className="text-xs text-muted-foreground">UC Riverside</div>
                    <div className="text-xs sm:text-sm text-foreground mt-2">Software Engineering</div>
                    <div className="text-xs text-muted-foreground">Rithm School</div>
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
