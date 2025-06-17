import {
  LayoutDashboard,
  Users,
  Settings,
  BriefcaseBusiness,
  FileText,
  LifeBuoy,
  LogOut,
  Youtube,
  ChartBarStacked,
  Library,
  Newspaper
} from "lucide-react";

type NavItem = {
  title: string;
  href: string;
  icon: any;
  subItems?: SubItem[];
};

type SubItem = {
  title: string;
  href: string;
};

export const sidebarNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Pages",
    href: "/dashboard/pages",
    icon: FileText,
    subItems: [
      { title: "Home", href: "/dashboard/pages/home" },
      { title: "About", href: "/dashboard/pages/about" },
      { title: "Skills", href: "/dashboard/pages/skills" },
      { title: "Achievement", href: "/dashboard/pages/achievement" },
    ],
  },
  {
    title: "Youtube",
    href: "/dashboard/youtube",
    icon: Youtube,
  },
  {
    title: "Framework",
    href: "/dashboard/framework",
    icon: Library,
  },
  {
    title: "Categories",
    href: "/dashboard/categories",
    icon: ChartBarStacked,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: BriefcaseBusiness,
  },
  {
    title: "Blog",
    href: "/dashboard/blog",
    icon: Newspaper,
  },
];

export const generalNavItems = [
  {
    title: "User",
    href: "/dashboard/user",
    icon: Newspaper,
  },

  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },

  {
    title: "Logout",
    href: "/logout",
    icon: LogOut,
  },
];
