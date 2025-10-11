"use client";

import { useState, useMemo, useCallback, useEffect } from "react";

import { useLenis } from "@/lib/useLenis";

import { useLoadingOverlay } from "@/base/Loading/useLoadingOverlay";

export function useStateProjects(projectsData: ProjectsContentProps[] = []) {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [previewProject, setPreviewProject] =
    useState<ProjectsContentProps | null>(null);

  const lenis = useLenis();

  const { withNavigationLoading } = useLoadingOverlay();

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(projectsData.map((project) => project.category)),
    ];
    return ["all", ...uniqueCategories];
  }, [projectsData]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return projectsData;
    return projectsData.filter(
      (project) => project.category === selectedCategory
    );
  }, [projectsData, selectedCategory]);

  const displayedProjects = useMemo(
    () => filteredProjects.slice(0, 6),
    [filteredProjects]
  );

  const topProject = displayedProjects[0];
  const middleProjects = displayedProjects.slice(1, 4);
  const bottomProjects = displayedProjects.slice(4);

  useEffect(() => {
    if (previewProject) {
      if (lenis) {
        lenis.stop();
      }

      return () => {
        if (lenis) {
          lenis.start();
        }
      };
    }
  }, [previewProject, lenis]);

  const handlePreview = useCallback((project: ProjectsContentProps) => {
    setPreviewProject(project);
  }, []);

  const handleViewDetails = useCallback(
    async (slug: string) => {
      await withNavigationLoading(`/projects/${slug}`, "projects");
    },
    [withNavigationLoading]
  );

  return {
    // State
    activeIndex,
    setActiveIndex,
    selectedCategory,
    setSelectedCategory,
    previewProject,
    setPreviewProject,

    // Computed values
    categories,
    filteredProjects,
    displayedProjects,
    topProject,
    middleProjects,
    bottomProjects,

    // Handlers
    handlePreview,
    handleViewDetails,
  };
}
