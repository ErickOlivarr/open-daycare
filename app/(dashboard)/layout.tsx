"use client";

import { usePathname } from "next/navigation";
import Sidebar, { type SidebarItemId } from "@/app/components/Sidebar";

export default function DashboardLayout({
  children,
}: LayoutProps<"/(dashboard)">) {
  const pathname = usePathname();
  const activeItem: SidebarItemId = pathname.startsWith("/kids")
    ? "kids"
    : "feed";

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar activeItem={activeItem} />
      <main className="h-screen min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
