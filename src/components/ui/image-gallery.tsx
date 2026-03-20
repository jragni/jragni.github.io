import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

interface GalleryImage {
  src: string
  alt: string
  customStyle?: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  className?: string
}

export function ImageGallery({ images, className = '' }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const active = images[activeIndex]

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-sm border border-primary/30 bg-card/50">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={active.src}
            alt={active.alt}
            className={`w-full h-full object-cover ${active.customStyle ?? ''}`}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </AnimatePresence>

        {/* HUD overlay corners */}
        <div className="absolute top-0 left-0 w-5 h-5 border-l border-t border-primary/50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-5 h-5 border-r border-t border-primary/50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-l border-b border-primary/50 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-r border-b border-primary/50 pointer-events-none" />

        {/* Image counter */}
        <div className="absolute bottom-2 right-2 font-mono text-[10px] text-primary/70 bg-background/70 px-1.5 py-0.5">
          {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </div>
      </div>

      {/* Thumbnail row */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {images.map((img, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative flex-shrink-0 w-14 h-14 overflow-hidden rounded-sm border transition-colors ${
              i === activeIndex
                ? 'border-primary'
                : 'border-primary/20 hover:border-primary/50'
            }`}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            aria-label={`View image: ${img.alt}`}
            aria-pressed={i === activeIndex}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            {i === activeIndex && (
              <motion.div
                layoutId="thumb-active"
                className="absolute inset-0 border-2 border-primary"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
