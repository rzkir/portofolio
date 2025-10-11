"use client";

import { useLoading } from "@/context/LoadingContext";

import { useRouter, usePathname } from "next/navigation";

type LoadingType = "projects" | "articles" | "contacts" | "general";

export function useLoadingOverlay() {
  const { showLoading, hideLoading } = useLoading();
  const router = useRouter();
  const pathname = usePathname();

  const withLoading = async <T>(
    asyncFn: () => Promise<T>,
    message: string = "Loading...",
    type: LoadingType = "general"
  ): Promise<T> => {
    try {
      showLoading(message, type);
      const result = await asyncFn();
      return result;
    } finally {
      hideLoading();
    }
  };

  const withNavigationLoading = async (
    href: string,
    type: LoadingType = "general"
  ) => {
    // If navigating to the same pathname, don't show the overlay
    try {
      const targetPath = href.startsWith("/") ? href : `/${href}`;
      if (pathname === targetPath) {
        hideLoading();
        return;
      }
    } catch (_) {
      // noop
    }

    // Determine message based on type and path
    let message = "Loading...";
    if (href === "/" || href === "") {
      message = "Loading to homepage...";
    } else if (type === "projects") {
      if (href.includes("/projects/") && !href.endsWith("/projects")) {
        message = "Loading project details...";
      } else {
        message = "Loading projects...";
      }
    } else if (type === "articles") {
      if (href.includes("/articles/") && !href.endsWith("/articles")) {
        message = "Loading article details...";
      } else {
        message = "Loading articles...";
      }
    } else if (type === "contacts") {
      if (href.includes("/contacts")) {
        message = "Loading contact form...";
      } else {
        message = "Preparing contact page...";
      }
    }

    try {
      showLoading(message, type);
      // Small delay gives time for overlay to appear smoothly
      await new Promise((resolve) => setTimeout(resolve, 400));
      router.push(href);
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      // Ensure the overlay hides even if navigation completes very quickly
      setTimeout(() => {
        hideLoading();
      }, 700);
    }
  };

  return {
    showLoading,
    hideLoading,
    withLoading,
    withNavigationLoading,
  };
}
