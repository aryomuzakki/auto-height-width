import * as React from "react"

type UseContentSizeVarsOptions = {
  widthVar?: string
  heightVar?: string
  axis?: "both" | "width" | "height"
  disabled?: boolean
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect

export function useContentSizeVars<
  TWrapper extends HTMLElement = HTMLDivElement,
  TContent extends HTMLElement = HTMLDivElement
>(options: UseContentSizeVarsOptions = {}) {
  const {
    widthVar = "--content-width",
    heightVar = "--content-height",
    axis = "both",
    disabled = false,
  } = options

  const wrapperRef = React.useRef<TWrapper | null>(null)
  const contentRef = React.useRef<TContent | null>(null)
  const frameRef = React.useRef<number | null>(null)

  const measure = React.useCallback(() => {
    const wrapper = wrapperRef.current
    const content = contentRef.current

    if (!wrapper || !content) return

    const rect = content.getBoundingClientRect()

    if (axis === "both" || axis === "width") {
      wrapper.style.setProperty(widthVar, `${Math.ceil(rect.width)}px`)
    }

    if (axis === "both" || axis === "height") {
      wrapper.style.setProperty(heightVar, `${Math.ceil(rect.height)}px`)
    }
  }, [axis, widthVar, heightVar])

  useIsomorphicLayoutEffect(() => {
    if (disabled) return

    const content = contentRef.current
    if (!content) return

    const scheduleMeasure = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }

      frameRef.current = requestAnimationFrame(measure)
    }

    measure()

    const resizeObserver = new ResizeObserver(scheduleMeasure)
    resizeObserver.observe(content)

    window.addEventListener("resize", scheduleMeasure)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", scheduleMeasure)

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [disabled, measure])

  return {
    wrapperRef,
    contentRef,
    measure,
  }
}