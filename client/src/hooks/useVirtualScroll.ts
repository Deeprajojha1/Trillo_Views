// Virtual list windowing helper.
import { useMemo } from 'react'

export function useVirtualScroll<T>(
  items: T[],
  scrollTop: number,
  viewportHeight: number,
  rowHeight: number,
  buffer = 5,
) {
  const totalHeight = items.length * rowHeight

  const { startIndex, endIndex } = useMemo(() => {
    const start = Math.max(Math.floor(scrollTop / rowHeight) - buffer, 0)
    const visible = Math.ceil(viewportHeight / rowHeight) + buffer * 2
    return {
      startIndex: start,
      endIndex: Math.min(start + visible, items.length),
    }
  }, [scrollTop, viewportHeight, rowHeight, buffer, items.length])

  const sliced = items.slice(startIndex, endIndex)
  const topSpacer = startIndex * rowHeight
  const bottomSpacer = totalHeight - topSpacer - sliced.length * rowHeight

  return { sliced, topSpacer, bottomSpacer, totalHeight, startIndex }
}
