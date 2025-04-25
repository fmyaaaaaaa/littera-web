import { Info } from "lucide-react";
import { SidebarMenuButton } from "./ui/sidebar";

import { SidebarMenu } from "./ui/sidebar";

import Link from "next/link";
import { SidebarMenuItem } from "./ui/sidebar";

export default function AppPrivacy() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          tooltip="Privacy Policy"
        >
          <Link href="/privacy" className="text-xs">
            <Info /> Privacy Policy
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
