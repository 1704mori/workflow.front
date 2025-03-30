"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GitBranch,
  Play,
  BarChart4,
  Settings,
  ChevronRight,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Workflows",
      href: "/workflows",
      icon: <GitBranch className="w-5 h-5" />,
    },
    {
      name: "Executions",
      href: "/executions",
      icon: <Play className="w-5 h-5" />,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: <BarChart4 className="w-5 h-5" />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r h-[calc(100vh-4rem)] p-4">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
              isActive(item.href)
                ? "bg-slate-100 text-slate-900"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
            {isActive(item.href) && (
              <ChevronRight className="ml-auto h-4 w-4" />
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
