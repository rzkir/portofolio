"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import { useLoadingOverlay } from "@/base/Loading/useLoadingOverlay";

import { useScrollTo, useLenis } from "@/lib/useLenis";

import { useLoading } from "@/context/LoadingContext";

import { useThemeSwitchOverlay } from "@/context/SwitchThemaOverlay";

export const useStateHeader = () => {
  const { theme, setTheme } = useTheme();
  const { isInitialLoading } = useLoading();
  const { withNavigationLoading } = useLoadingOverlay();
  const { isOverlayVisible, showThemeSwitchOverlay, hideThemeSwitchOverlay } =
    useThemeSwitchOverlay();
  const lenis = useLenis();
  const scrollTo = useScrollTo();

  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      if (lenis) {
        lenis.stop();
      }

      return () => {
        if (lenis) {
          lenis.start();
        }
      };
    }
  }, [isMenuOpen, lenis]);

  const handleThemeChange = (newTheme: string) => {
    showThemeSwitchOverlay();
    setTheme(newTheme);
  };

  const handleSmoothScroll = (path: string) => {
    setIsMenuOpen(false);

    if (path === "/") {
      if (window.location.pathname === "/") {
        scrollTo("html", { duration: 1.5 });
      } else {
        withNavigationLoading("/", "general");
      }
    } else if (path.startsWith("#")) {
      if (window.location.pathname === "/") {
        scrollTo(path, {
          offset: -80,
        });
      } else {
        withNavigationLoading(`/${path}`, "general");
      }
    } else {
      let loadingType: "projects" | "articles" | "contacts" | "general" =
        "general";
      if (path.startsWith("/projects")) {
        loadingType = "projects";
      } else if (path.startsWith("/articles")) {
        loadingType = "articles";
      } else if (path.startsWith("/contacts")) {
        loadingType = "contacts";
      }

      withNavigationLoading(path, loadingType);
    }
  };

  return {
    // Theme related
    theme,
    setTheme: handleThemeChange,
    mounted,

    // Loading related
    isInitialLoading,

    // Menu state
    isMenuOpen,
    setIsMenuOpen,

    // Logo hover state
    hoveredIndex,
    setHoveredIndex,

    // Theme overlay state
    isThemeOverlayVisible: isOverlayVisible,
    hideThemeSwitchOverlay,

    // Functions
    handleSmoothScroll,
  };
};
