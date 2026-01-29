import { LayoutGrid, Settings, Users, Home } from "lucide-react";

export function getMenuList(pathname) {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/Home",
                    label: "Inicio",
                    icon: LayoutGrid,
                }
            ]
        },
        {
            groupLabel: "Profesorado",
            menus: [
                {
                    href: "/calendar",
                    label: "Agenda Mermaid",
                    icon: Home,
                    active: true
                },
                {
                    href: "/profesorado/vertodas",
                    label: "Ver todas",
                    icon: Settings
                }
            ]
        },
        {
            groupLabel: "Alumnado",
            menus: [
                {
                    href: "/alumnado",
                    label: "Ver todo",
                    icon: Users
                }
            ]
        },
        {
            groupLabel: "Sistema",
            menus: [
                {
                    href: "/config",
                    label: "Configuración",
                    icon: Settings
                }
            ]
        }
    ];
}
