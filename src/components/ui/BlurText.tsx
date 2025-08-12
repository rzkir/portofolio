"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'characters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: any;
  animationTo?: any;
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: React.ElementType;
  loading?: boolean;
  initialDelay?: number;
  maxElements?: number; // New prop to limit DOM elements
}

const buildKeyframes = (from: any, to: any[]) => {
  return to.map((snapshot, index) => ({
    ...snapshot,
    transition: { duration: 0.1, ease: "easeOut" }
  }));
};

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  as: Component = 'p',
  loading = false,
  initialDelay = 0,
  maxElements = 50, // Limit DOM elements
}: BlurTextProps) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || loading) return;

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (ref.current) {
              observer.unobserve(ref.current);
            }
          }
        },
        { threshold, rootMargin }
      );
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => observer.disconnect();
    }, initialDelay * 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, rootMargin, loading, initialDelay]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -50 }
        : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5,
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  // If loading, show initial state
  const shouldAnimate = !loading && inView;

  // Optimize: Use CSS animations for shorter text, motion spans for longer text
  const shouldUseCSSAnimation = text.length < 100 || (animateBy === 'words' && text.split(' ').length < 20);

  if (shouldUseCSSAnimation) {
    // Use CSS animation approach for better performance
    const elements = animateBy === 'words' ? text.split(' ') : text.split('');
    const limitedElements = elements.slice(0, maxElements);

    const stepCount = toSnapshots.length + 1;
    const totalDuration = stepDuration * (stepCount - 1);
    const times = Array.from({ length: stepCount }, (_, i) =>
      stepCount === 1 ? 0 : i / (stepCount - 1)
    );

    const content = (
      <>
        {limitedElements.map((segment, index) => {
          const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

          const spanTransition = {
            duration: totalDuration,
            times,
            delay: (index * delay) / 1000,
            ease: easing,
          };

          return (
            <motion.span
              className="inline-block will-change-[transform,filter,opacity]"
              key={index}
              initial={fromSnapshot}
              animate={shouldAnimate ? animateKeyframes : fromSnapshot}
              transition={spanTransition}
              onAnimationComplete={
                index === limitedElements.length - 1 ? onAnimationComplete : undefined
              }
            >
              {segment === ' ' ? '\u00A0' : segment}
              {animateBy === 'words' && index < limitedElements.length - 1 && '\u00A0'}
            </motion.span>
          );
        })}
        {elements.length > maxElements && (
          <span className="text-muted-foreground">...</span>
        )}
      </>
    );

    return React.createElement(Component as any, {
      ref,
      className,
      style: { display: 'flex', flexWrap: 'wrap' }
    }, content);
  } else {
    // For longer text, use a single animated container with CSS
    const animationDuration = (text.length * delay) / 1000 + stepDuration;

    return React.createElement(Component as any, {
      ref,
      className: `${className} ${shouldAnimate ? 'animate-blur-text' : ''}`,
      style: {
        display: 'block',
        animationDuration: `${animationDuration}s`,
        animationDelay: `${initialDelay}s`,
        animationFillMode: 'both',
        ...fromSnapshot
      },
      onAnimationEnd: onAnimationComplete
    }, text);
  }
};

export default BlurText;