import { useLoading } from "@/context/LoadingContext";

import { useRouter, usePathname } from "next/navigation";

export function useLoadingOverlay() {
  const { showLoading, hideLoading } = useLoading();
  const router = useRouter();
  const pathname = usePathname();

  const withLoading = async <T>(
    asyncFn: () => Promise<T>,
    message: string = "Loading..."
  ): Promise<T> => {
    try {
      showLoading(message);
      const result = await asyncFn();
      return result;
    } finally {
      hideLoading();
    }
  };

  const withNavigationLoading = async (href: string) => {
    // If navigating to the same pathname, don't show the overlay
    try {
      const targetPath = href.startsWith('/') ? href : `/${href}`;
      if (pathname === targetPath) {
        hideLoading();
        return;
      }
    } catch (_) {
      // noop
    }
    try {
      showLoading("Navigating to project details...");
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
