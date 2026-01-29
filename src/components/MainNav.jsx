import React from 'react';
import { cn } from '../lib/utils';
import { ModeToggle } from './ModeToggle';

export function MainNav() {
    const pathname = window.location.pathname;

    const items = [
        { href: '/Home', label: 'Inicio' },
        { href: '/acerca', label: 'Acerca de' },
        { href: '/contacto', label: 'Contacto' },
    ];

    return (
        <div className="flex h-14 items-center px-4 w-full">
            <div className="mr-4 hidden md:flex items-center space-x-6">
                <button className="flex items-center space-x-2">
                    <span className="font-bold">Mermaid Knowledge AI</span>
                </button>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                    {items.map((item) => (
                        <button
                            key={item.href}
                            className={cn(
                                'transition-colors hover:text-foreground/80',
                                pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                            )}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-4">
                <nav className="flex items-center">
                    <ModeToggle />
                </nav>
            </div>
        </div>
    );
}
