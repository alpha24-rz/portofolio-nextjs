import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useDebounce } from "use-debounce";

// Types
interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
  title?: string;
  description?: string;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  onImageClick?: (item: Item) => void;
  maxColumns?: number;
  lazyLoad?: boolean;
}

// Custom Hook untuk Media Query
const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const [value, setValue] = useState<number>(() => {
    if (typeof window === "undefined") return defaultValue;
    return values[queries.findIndex(q => window.matchMedia(q).matches)] ?? defaultValue;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = () => setValue(
      values[queries.findIndex(q => window.matchMedia(q).matches)] ?? defaultValue
    );

    queries.forEach(q => window.matchMedia(q).addEventListener("change", handler));
    return () => queries.forEach(q => 
      window.matchMedia(q).removeEventListener("change", handler)
    );
  }, [queries, values, defaultValue]);

  return value;
};

// Custom Hook untuk Ukuran Container
const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    let animationFrameId: number;
    const ro = new ResizeObserver((entries) => {
      animationFrameId = window.requestAnimationFrame(() => {
        if (!Array.isArray(entries)) return;
        const { width, height } = entries[0].contentRect;
        setSize({ width, height });
      });
    });

    ro.observe(ref.current);
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      ro.disconnect();
    };
  }, []);

  return [ref, size] as const;
};

// Komponen MasonryTile Terpisah
const MasonryTile = React.memo(({
  item,
  onClick,
  animationProps,
  position
}: {
  item: Item;
  onClick?: (item: Item) => void;
  animationProps: {
    scaleOnHover: boolean;
    hoverScale: number;
    colorShiftOnHover: boolean;
    blurToFocus: boolean;
  };
  position: { x: number; y: number; w: number; h: number };
}) => {
  const tileRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Handle hover effects
  const handleMouseEnter = () => {
    if (!tileRef.current) return;
    if (animationProps.scaleOnHover) {
      gsap.to(tileRef.current, {
        scale: animationProps.hoverScale,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    if (!tileRef.current) return;
    if (animationProps.scaleOnHover) {
      gsap.to(tileRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  // Load gambar
  useEffect(() => {
    const img = new Image();
    img.src = item.img;
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
  }, [item.img]);

  return (
    <div
      ref={tileRef}
      data-key={item.id}
      className="absolute box-content cursor-pointer transition-transform duration-300"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        width: position.w,
        height: position.h,
        willChange: loaded ? 'transform' : undefined
      }}
      onClick={() => onClick?.(item)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.title || 'image'}`}
    >
      <div className="relative w-full h-full overflow-hidden rounded-[10px] shadow-lg">
        {error ? (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Gambar tidak tersedia</span>
          </div>
        ) : (
          <>
            <img
              src={item.img}
              alt={item.title || ''}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
            {!loaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            {animationProps.colorShiftOnHover && (
              <div className="color-overlay absolute inset-0 bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
            )}
            {item.title && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-medium">{item.title}</h3>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
});

// Komponen Utama Masonry
const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  onImageClick,
  maxColumns = 5,
  lazyLoad = true
}) => {
  const columns = useMedia(
    [
      "(min-width: 1500px)",
      "(min-width: 1000px)",
      "(min-width: 600px)",
      "(min-width: 400px)"
    ],
    [Math.min(5, maxColumns), Math.min(4, maxColumns), Math.min(3, maxColumns), Math.min(2, maxColumns)],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [debouncedWidth] = useDebounce(width, 100);
  const [visibleItems, setVisibleItems] = useState(items.slice(0, columns * 3));
  const hasMounted = useRef(false);

  // Hitung grid layout
  const grid = useMemo(() => {
    if (!debouncedWidth) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (debouncedWidth - totalGaps) / columns;

    return visibleItems.map((item) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = (item.height / 500) * columnWidth; // Sesuaikan aspect ratio
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...item, x, y, w: columnWidth, h: height };
    });
  }, [columns, visibleItems, debouncedWidth]);

  // Animasi masuk
  useLayoutEffect(() => {
    if (grid.length === 0) return;

    const animations: gsap.core.Tween[] = [];
    const container = containerRef.current;
    if (!container) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      
      if (!hasMounted.current) {
        let startX = item.x;
        let startY = item.y;
        
        switch (animateFrom) {
          case "top":
            startY = -item.h;
            break;
          case "bottom":
            startY = container.clientHeight + item.h;
            break;
          case "left":
            startX = -item.w;
            break;
          case "right":
            startX = container.clientWidth + item.w;
            break;
          case "center":
            startX = container.clientWidth / 2 - item.w / 2;
            startY = container.clientHeight / 2 - item.h / 2;
            break;
          case "random":
            startX = Math.random() > 0.5 
              ? -item.w 
              : container.clientWidth + item.w;
            startY = Math.random() > 0.5 
              ? -item.h 
              : container.clientHeight + item.h;
            break;
        }

        animations.push(
          gsap.fromTo(selector, 
            {
              x: startX,
              y: startY,
              opacity: 0,
              ...(blurToFocus && { filter: "blur(10px)" })
            },
            {
              x: item.x,
              y: item.y,
              opacity: 1,
              ...(blurToFocus && { filter: "blur(0px)" }),
              duration: duration,
              ease: ease,
              delay: index * stagger
            }
          )
        );
      } else {
        animations.push(
          gsap.to(selector, {
            x: item.x,
            y: item.y,
            width: item.w,
            height: item.h,
            duration: duration,
            ease: ease,
            overwrite: true
          })
        );
      }
    });

    hasMounted.current = true;
    return () => animations.forEach(anim => anim.kill());
  }, [grid, animateFrom, blurToFocus, duration, ease, stagger]);

  // Lazy load lebih banyak item saat scroll
  useEffect(() => {
    if (!lazyLoad || visibleItems.length >= items.length) return;

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setVisibleItems(prev => items.slice(0, prev.length + columns * 2));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleItems, items, columns, lazyLoad]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      style={{ height: grid.reduce((max, item) => Math.max(max, item.y + item.h), 0) }}
    >
      {grid.map((item) => (
        <MasonryTile
          key={item.id}
          item={item}
          onClick={onImageClick}
          animationProps={{
            scaleOnHover,
            hoverScale,
            colorShiftOnHover,
            blurToFocus
          }}
          position={{ x: item.x, y: item.y, w: item.w, h: item.h }}
        />
      ))}
    </div>
  );
};

export default Masonry;