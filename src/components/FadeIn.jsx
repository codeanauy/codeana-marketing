import { useEffect, useRef, useState } from 'react'

export default function FadeIn({ children, className = '', delay = 0 }) {
  const noAnimation = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [visible, setVisible] = useState(noAnimation)
  const ref = useRef(null)

  useEffect(() => {
    if (noAnimation) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [noAnimation])

  return (
    <div
      ref={ref}
      className={className}
      style={
        noAnimation
          ? undefined
          : {
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.42s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.42s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
            }
      }
    >
      {children}
    </div>
  )
}
