import React from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Grid, List } from 'lucide-react'

export const CustomToolbar = (toolbar) => {
    const goToBack = () => toolbar.onNavigate('PREV')
    const goToNext = () => toolbar.onNavigate('NEXT')
    const goToCurrent = () => toolbar.onNavigate('TODAY')

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            {/* Etiquetas de fechas */}
            <div className="flex items-center gap-4">
                <div className="flex items-center bg-muted rounded-md border p-1">
                    <button
                        onClick={goToBack}
                        className="p-1.5 hover:bg-background rounded-sm transition-all text-muted-foreground hover:text-foreground"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={goToCurrent}
                        className="px-3 py-1 text-[11px] font-semibold hover:bg-background rounded-sm transition-all"
                    >
                        Hoy
                    </button>
                    <button
                        onClick={goToNext}
                        className="p-1.5 hover:bg-background rounded-sm transition-all text-muted-foreground hover:text-foreground"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
                <h2 className="text-lg font-bold tracking-tight capitalize">
                    {toolbar.label}
                </h2>
            </div>

            {/* Selector de Vistas */}
            <div className="flex bg-muted rounded-lg border p-1 shadow-sm">
                {[
                    { id: 'month', label: 'Mes' },
                    { id: 'week', label: 'Semana' },
                    { id: 'day', label: 'Día' }
                ].map((v) => (
                    <button
                        key={v.id}
                        onClick={() => toolbar.onView(v.id)}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${toolbar.view === v.id
                                ? 'bg-background text-primary shadow-sm border border-border'
                                : 'text-muted-foreground hover:text-foreground/80'
                            }`}
                    >
                        {v.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
