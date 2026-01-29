import React, { useState, useCallback, useEffect } from 'react'
import CalendarView from './components/CalendarView'
import Chat from './components/Chat'
import { Sidebar } from "./components/Sidebar"
import { MainNav } from "./components/MainNav"
import { Button } from "./components/ui/button"
import UserMenu from "./components/UserMenu"
import { Menu } from "lucide-react"
import { AuthProvider } from './contexts/AuthContext'
import { parseISO, parse } from 'date-fns'
import es from 'date-fns/locale/es'

function CalendarApp() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [date, setDate] = useState(new Date())
    const [view, setView] = useState('month')
    const [events, setEvents] = useState([
        {
            title: '📅 Nueva Agenda Mermaid',
            start: new Date(),
            end: new Date(new Date().setHours(new Date().getHours() + 1)),
        }
    ])

    const handleChatAction = useCallback((payload) => {
        try {
            if (payload.events && Array.isArray(payload.events)) {
                const mappedEvents = payload.events.map(evt => {
                    let startDate, endDate;
                    if (evt.event_day && evt.start_time_event) {
                        try {
                            const dateStr = String(evt.event_day).trim()
                            const startStr = String(evt.start_time_event).trim()
                            const endStr = evt.finish_time_event ? String(evt.finish_time_event).trim() : startStr
                            const fullStartStr = `${dateStr} ${startStr}`
                            const fullEndStr = `${dateStr} ${endStr}`
                            const patterns = ["d 'de' MMMM 'de' yyyy HH:mm", "d 'de' MMMM 'de' yyyy H:mm"]
                            for (const pattern of patterns) {
                                startDate = parse(fullStartStr, pattern, new Date(), { locale: es })
                                endDate = parse(fullEndStr, pattern, new Date(), { locale: es })
                                if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) break
                            }
                        } catch (e) { console.error(e) }
                    }
                    if (!startDate || isNaN(startDate.getTime())) {
                        try {
                            const s = evt.start instanceof Object ? (evt.start.dateTime || evt.start.date) : evt.start
                            if (s) startDate = parseISO(s)
                            const e = evt.end instanceof Object ? (evt.end.dateTime || evt.end.date) : evt.end
                            if (e) endDate = parseISO(e)
                        } catch (err) { console.error(err) }
                    }
                    if (startDate && !isNaN(startDate.getTime()) && endDate && !isNaN(endDate.getTime())) {
                        if (startDate > endDate) endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
                        return {
                            title: evt.event_description || evt.summary || evt.title || 'Evento',
                            start: startDate,
                            end: endDate,
                            allDay: Boolean(evt.start?.date),
                            resource: evt
                        }
                    }
                    return null
                }).filter(e => e !== null)

                if (mappedEvents.length > 0) {
                    setEvents(mappedEvents)
                    setDate(mappedEvents[0].start)
                    setView('day')
                }
            }
        } catch (error) { console.error("Error in action handler:", error) }
    }, [])

    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground">
            {/* Sidebar para móviles */}
            <div className="md:hidden">
                {sidebarOpen && (
                    <div className="fixed inset-0 z-40 flex">
                        <div
                            className="fixed inset-0 bg-gray-600 bg-opacity-75"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-background">
                            <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                                <Sidebar className="w-full border-0" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Sidebar para escritorio */}
            <div className="hidden md:flex">
                <Sidebar />
            </div>

            {/* Contenido principal */}
            <div className="flex w-0 flex-1 flex-col overflow-hidden">
                {/* Barra de navegación superior */}
                <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b bg-background">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden ml-4"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Abrir menú</span>
                    </Button>
                    <div className="flex-1">
                        <MainNav />
                    </div>
                    <div className="flex items-center px-4">
                        <UserMenu />
                    </div>
                </header>

                {/* Título opcional */}
                <div className="px-4 md:px-6 py-2 md:py-3 flex justify-center border-b bg-muted/20">
                    <h1 className="text-base md:text-lg font-semibold text-foreground text-center">
                        Mi Agenda Digital - Mermaid AI
                    </h1>
                </div>

                {/* Contenido */}
                <main className="flex-1 overflow-hidden flex bg-slate-50 dark:bg-slate-900/50">
                    <div className="flex-1 p-4 md:p-6 overflow-y-auto h-full">
                        <CalendarView
                            date={date}
                            events={events}
                            view={view}
                            onNavigate={setDate}
                            onView={setView}
                        />
                    </div>
                    {/* Chat Sidebar Integrado Estilo Shadcn */}
                    <div className="w-[400px] border-l bg-background hidden lg:block h-full">
                        <Chat onAction={handleChatAction} />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <CalendarApp />
        </AuthProvider>
    )
}
