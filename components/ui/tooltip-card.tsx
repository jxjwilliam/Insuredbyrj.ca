"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const Tooltip = ({
  content,
  children,
  containerClassName,
}: {
  content: string | React.ReactNode;
  children: React.ReactNode;
  containerClassName?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [height, setHeight] = useState(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isOverTooltipRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculatePosition = useCallback((mouseX: number, mouseY: number) => {
    if (!containerRef.current)
      return { x: 0, y: 0 };

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get actual tooltip dimensions if available, otherwise use estimates
    // Use parent element if contentRef not ready
    const tooltipElement = tooltipRef.current?.querySelector('[class*="rounded-lg"]') as HTMLElement;
    const tooltipWidth = tooltipElement?.offsetWidth || contentRef.current?.offsetWidth || 280;
    const tooltipHeight = height || contentRef.current?.scrollHeight || 100;

    // Calculate mouse position in viewport coordinates
    const mouseViewportX = containerRect.left + mouseX;
    const mouseViewportY = containerRect.top + mouseY;

    // Preferred position: above the mouse cursor with a gap
    const gap = 12;
    let finalX = mouseViewportX + gap;
    let finalY = mouseViewportY - tooltipHeight - gap;

    // If tooltip would go above viewport, position below mouse instead
    if (finalY < 20) {
      finalY = mouseViewportY + gap + 20; // Add extra space for cursor
    }

    // If tooltip would go below viewport, try to position above
    if (finalY + tooltipHeight > viewportHeight - 20) {
      finalY = Math.max(20, mouseViewportY - tooltipHeight - gap);
    }

    // Adjust horizontal position to stay within viewport
    if (finalX + tooltipWidth > viewportWidth - 20) {
      // Position to the left of mouse
      finalX = mouseViewportX - tooltipWidth - gap;
    }

    // Ensure tooltip doesn't go off left edge
    if (finalX < 20) {
      finalX = 20;
    }

    // Ensure tooltip doesn't go off right edge
    if (finalX + tooltipWidth > viewportWidth - 20) {
      finalX = viewportWidth - tooltipWidth - 20;
    }

    return { x: finalX, y: finalY };
  }, [height]);

  useEffect(() => {
    if (isVisible && contentRef.current) {
      // Measure tooltip dimensions
      const measureTooltip = () => {
        if (contentRef.current) {
          const height = contentRef.current.scrollHeight;
          setHeight(height);
          // Update position after measuring
          if (containerRef.current) {
            requestAnimationFrame(() => {
              const newPosition = calculatePosition(mouse.x, mouse.y);
              setPosition(newPosition);
            });
          }
        }
      };
      
      // Measure immediately and after a short delay to ensure DOM is ready
      measureTooltip();
      const timeout = setTimeout(measureTooltip, 10);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, content, mouse.x, mouse.y, calculatePosition]);

  const updateMousePosition = (mouseX: number, mouseY: number) => {
    setMouse({ x: mouseX, y: mouseY });
    // Use requestAnimationFrame to ensure smooth updates
    requestAnimationFrame(() => {
      const newPosition = calculatePosition(mouseX, mouseY);
      setPosition(newPosition);
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsVisible(true);
    isOverTooltipRef.current = false;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    updateMousePosition(mouseX, mouseY);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if mouse is moving to tooltip
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (tooltipRef.current && tooltipRef.current.contains(relatedTarget)) {
      return; // Mouse is moving to tooltip, don't hide
    }
    
    // Delay hiding to allow mouse to move to tooltip
    hideTimeoutRef.current = setTimeout(() => {
      if (!isOverTooltipRef.current) {
        setMouse({ x: 0, y: 0 });
        setPosition({ x: 0, y: 0 });
        setIsVisible(false);
      }
    }, 150); // Increased delay to allow mouse movement to tooltip
  };

  const handleTooltipMouseEnter = () => {
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    isOverTooltipRef.current = true;
  };

  const handleTooltipMouseLeave = () => {
    isOverTooltipRef.current = false;
    setMouse({ x: 0, y: 0 });
    setPosition({ x: 0, y: 0 });
    setIsVisible(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isVisible) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    updateMousePosition(mouseX, mouseY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;
    updateMousePosition(mouseX, mouseY);
    setIsVisible(true);
  };

  const handleTouchEnd = () => {
    // Delay hiding to allow for tap interaction
    setTimeout(() => {
      setIsVisible(false);
      setMouse({ x: 0, y: 0 });
      setPosition({ x: 0, y: 0 });
    }, 2000);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Toggle visibility on click for mobile devices
    if (window.matchMedia("(hover: none)").matches) {
      e.preventDefault();
      if (isVisible) {
        setIsVisible(false);
        setMouse({ x: 0, y: 0 });
        setPosition({ x: 0, y: 0 });
      } else {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        updateMousePosition(mouseX, mouseY);
        setIsVisible(true);
      }
    }
  };

  // Update position when tooltip becomes visible or content changes
  useEffect(() => {
    if (isVisible && containerRef.current) {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        const newPosition = calculatePosition(mouse.x, mouse.y);
        setPosition(newPosition);
      });
    }
  }, [isVisible, height, mouse.x, mouse.y, calculatePosition]);

  // Update position on scroll/resize
  useEffect(() => {
    if (!isVisible) return;

    const updatePosition = () => {
      if (containerRef.current) {
        const newPosition = calculatePosition(mouse.x, mouse.y);
        setPosition(newPosition);
      }
    };

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isVisible, mouse.x, mouse.y, calculatePosition]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const tooltipContent = (
    <AnimatePresence>
      {isVisible && mounted && position.x > 0 && position.y > 0 && (
        <motion.div
          ref={tooltipRef}
          key={String(isVisible)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          className="fixed z-[99999] min-w-[15rem] max-w-[20rem] overflow-visible"
          style={{
            top: `${position.y}px`,
            left: `${position.x}px`,
            pointerEvents: 'auto',
            isolation: 'isolate',
          }}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        >
          {/* Bridge element to help mouse movement */}
          <div
            className="absolute -top-2 -left-2 -right-2 -bottom-2 pointer-events-auto"
            style={{ zIndex: -1 }}
            onMouseEnter={handleTooltipMouseEnter}
          />
          <div
            ref={contentRef}
            className="relative rounded-lg border border-gray-200 bg-white shadow-2xl ring-1 ring-black/10 dark:bg-neutral-900 dark:ring-white/10 p-3 text-sm text-neutral-600 dark:text-neutral-400"
          >
            {content}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div
        ref={containerRef}
        className={cn("relative inline-block", containerClassName)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        {children}
      </div>
      {mounted && createPortal(tooltipContent, document.body)}
    </>
  );
};
