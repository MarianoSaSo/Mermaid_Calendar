import React from "react";
import { cn } from "../lib/utils";
import { getMenuList } from "../lib/menu-list";

export function Sidebar({ className }) {
    const pathname = window.location.pathname; // Simplified for Vite demo
    const menuGroups = getMenuList(pathname);

    return (
        <div
            className={cn(
                "hidden md:flex flex-col h-screen w-64 border-r bg-background p-4",
                className
            )}
        >
            <div className="flex items-center justify-center mb-4 px-2">
                <video
                    src="/logo_lateral2.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-32 h-32 rounded-full shadow object-cover"
                />
            </div>

            <nav className="flex-1 space-y-8 overflow-y-auto">
                {menuGroups.map((group, groupIndex) => (
                    <div key={groupIndex} className="space-y-2">
                        {group.groupLabel && (
                            <h3 className="px-2 text-sm font-medium text-muted-foreground">
                                {group.groupLabel}
                            </h3>
                        )}
                        <ul className="space-y-1">
                            {group.menus.map((menu, menuIndex) => {
                                const isActive = menu.active || pathname === menu.href;

                                return (
                                    <li key={menuIndex}>
                                        <button
                                            className={cn(
                                                "w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                                isActive
                                                    ? "bg-accent text-accent-foreground"
                                                    : "hover:bg-accent/50 hover:text-accent-foreground text-muted-foreground"
                                            )}
                                        >
                                            <menu.icon className="h-4 w-4" />
                                            <span>{menu.label}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>
        </div>
    );
}
