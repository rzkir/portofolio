"use client";

import { useEffect, useRef, useState, useMemo } from 'react';
import React from 'react';
import { motion } from 'framer-motion';

interface AnimationState {
  filter?: string;
  opacity?: number;
  y?: number;
  [key: string]: any;
}

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'characters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationState;
  animationTo?: AnimationState[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: React.ElementType;
  loading?: boolean;
  initialDelay?: number;
}

const buildKeyframes = (from: AnimationState, steps: AnimationState[]): Record<string, any[]> => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s: AnimationState) => Object.keys(s)),
  ]);

  const keyframes: Record<string, any[]> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s: AnimationState) => s[k])];
  });
  return keyframes;
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
}: BlurTextProps) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
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

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  const content = (
    <>
      {elements.map((segment, index) => {
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
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </>
  );

  return React.createElement(Component, {
    ref,
    className,
    style: { display: 'flex', flexWrap: 'wrap' }
  }, content);
};

export default BlurText;