/**
 * VirtualizedList - Virtual Scrolling Component
 * Best practice for rendering large lists efficiently
 * 
 * Features:
 * - Only renders visible items
 * - Smooth scrolling
 * - Performance optimized
 * - Accessibility support
 */

import React, { useState, useRef, useMemo, memo, useCallback } from 'react';

export interface IVirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
  className?: string;
  'aria-label'?: string;
  onScroll?: (scrollTop: number) => void;
}

/**
 * VirtualizedList Component
 * Efficiently renders large lists by only rendering visible items
 */
function VirtualizedListComponent<T>({
  items,
  renderItem,
  itemHeight,
  containerHeight,
  overscan = 3,
  className = '',
  'aria-label': ariaLabel,
  onScroll,
}: IVirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate visible range
  const { startIndex, endIndex, totalHeight, offsetY } = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const endIndex = Math.min(
      items.length - 1,
      startIndex + visibleCount + overscan * 2
    );
    const totalHeight = items.length * itemHeight;
    const offsetY = startIndex * itemHeight;

    return { startIndex, endIndex, totalHeight, offsetY };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  // Visible items
  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex + 1);
  }, [items, startIndex, endIndex]);

  // Handle scroll with throttling
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const newScrollTop = e.currentTarget.scrollTop;
    setScrollTop(newScrollTop);
    if (onScroll) {
      onScroll(newScrollTop);
    }
  }, [onScroll]);

  return (
    <div
      ref={containerRef}
      className={`virtualized-list ${className}`}
      style={{
        height: containerHeight,
        overflow: 'auto',
      }}
      onScroll={handleScroll}
      role="list"
      aria-label={ariaLabel}
    >
      <div
        style={{
          height: totalHeight,
          position: 'relative',
        }}
      >
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, index) => {
            const actualIndex = startIndex + index;
            return (
              <div
                key={actualIndex}
                role="listitem"
                aria-setsize={items.length}
                aria-posinset={actualIndex + 1}
                style={{
                  height: itemHeight,
                }}
              >
                {renderItem(item, actualIndex)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Memoize with generic type support
export const VirtualizedList = memo(VirtualizedListComponent) as typeof VirtualizedListComponent;