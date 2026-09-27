'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type DeferredRenderProps = {
  children: ReactNode
  /**
   * Additional margin around the viewport for the intersection observer.
   * Defaults to '200px' to begin rendering slightly before the section scrolls into view.
   */
  rootMargin?: string
  /**
   * Optional fallback content while the section has not intersected the viewport.
   */
  fallback?: ReactNode
}

export function DeferredRender({
  children,
  rootMargin = '200px',
  fallback = null,
}: DeferredRenderProps) {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isVisible) {
      return
    }

    const element = containerRef.current

    if (!element || typeof IntersectionObserver === 'undefined') {
      queueMicrotask(() => setIsVisible(true))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [isVisible, rootMargin])

  return <div ref={containerRef}>{isVisible ? children : fallback}</div>
}

