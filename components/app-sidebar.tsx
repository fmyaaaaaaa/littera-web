"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { sidebarItems } from "@/constants/sidebar";
import AppLogo from "./app-logo";
import AppPrivacy from "./app-privacy";
import { NavMain } from "./nav-main";

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <AppLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarItems} />
      </SidebarContent>
      <SidebarFooter>
        <AppPrivacy />
      </SidebarFooter>
    </Sidebar>
  );
}
