import { useLoading } from "@/utils/context/LoadingContext";

import { useRouter } from "next/navigation";

export function useLoadingOverlay() {
  const { showLoading, hideLoading } = useLoading();
  const router = useRouter();

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
    try {
      showLoading("Navigating to project details...");
      // Simulate a small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push(href);
    } catch (error) {
      hideLoading();
      console.error("Navigation error:", error);
    }
  };

  return {
    showLoading,
    hideLoading,
    withLoading,
    withNavigationLoading,
  };
}
