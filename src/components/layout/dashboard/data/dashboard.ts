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
    title: "Works",
    href: "/dashboard/works",
    icon: BriefcaseBusiness,
    subItems: [
      { title: "Works", href: "/dashboard/works" },
      { title: "Categories", href: "/dashboard/works/categories" },
      { title: "Framework", href: "/dashboard/analytics/framework" },
    ],
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
];

export const generalNavItems = [
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Help",
    href: "/dashboard/help",
    icon: LifeBuoy,
  },
  {
    title: "Logout",
    href: "/logout",
    icon: LogOut,
  },
];
