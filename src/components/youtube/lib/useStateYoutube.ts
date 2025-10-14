"use client";

import { useState, useMemo, useEffect, useRef } from "react";

import { useInView } from "framer-motion";

import { useLenis } from "@/lib/useLenis";

export function useStateYoutube(youtubeData: YoutubeContentProps[] = []) {
  const [selectedContent, setSelectedContent] =
    useState<YoutubeContentProps | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const lenis = useLenis();

  const headingRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isHeadingInView = useInView(headingRef, {
    once: true,
    margin: "-100px",
  });
  const isCategoriesInView = useInView(categoriesRef, {
    once: true,
    margin: "-50px",
  });
  const isContentInView = useInView(contentRef, {
    once: true,
    margin: "-50px",
  });

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(youtubeData.map((item) => item.category.toLowerCase()))
    );
    return ["all", ...uniqueCategories];
  }, [youtubeData]);

  const filteredContent = useMemo(() => {
    if (selectedCategory === "all") return youtubeData;
    return youtubeData.filter(
      (item) => item.category.toLowerCase() === selectedCategory
    );
  }, [youtubeData, selectedCategory]);

  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
  const paginatedContent = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredContent.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredContent, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedContent) {
      if (lenis) {
        lenis.stop();
      }

      return () => {
        if (lenis) {
          lenis.start();
        }
      };
    }
  }, [selectedContent, lenis]);

  return {
    // State
    selectedContent,
    setSelectedContent,
    selectedCategory,
    setSelectedCategory,
    currentPage,
    setCurrentPage,
    itemsPerPage,

    // Refs
    headingRef,
    categoriesRef,
    contentRef,

    // View states
    isHeadingInView,
    isCategoriesInView,
    isContentInView,

    // Computed values
    categories,
    filteredContent,
    totalPages,
    paginatedContent,
  };
}
