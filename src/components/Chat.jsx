import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Send, Bot, User, MessageSquare } from 'lucide-react'
import { cn } from '../lib/utils'

const WEBHOOK_URL = '/webhook/7fd73e4a-3b97-422e-a56e-c60f8a0b2cae'

export default function Chat({ onAction }) {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: '¡Hola! Soy tu asistente de Mermaid AI. ¿Cómo puedo ayudarte hoy?' }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const sendMessage = async (e) => {
        e.preventDefault()
        if (!input.trim() || loading) return

        const userText = input
        setMessages(prev => [...prev, { role: 'user', content: userText }])
        setInput('')
        setLoading(true)

        try {
            const response = await axios.post(WEBHOOK_URL, { chatInput: userText })
            let botText = "Hecho."
            let newEvents = null
            const data = response.data

            if (Array.isArray(data) && data.length > 0) {
                botText = data[0].message || data[0].output || botText
                if (data[0].events) newEvents = data[0].events
            } else if (typeof data === 'object') {
                botText = data.output || data.message || botText
                if (data.events) newEvents = data.events
            }

            setMessages(prev => [...prev, { role: 'assistant', content: botText }])
            if (newEvents) onAction({ events: newEvents })
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Error de conexión." }])
        }
        setLoading(false)
    }

    return (
        <div className="flex flex-col h-full bg-background border-l">
            {/* Header */}
            <div className="h-16 border-b flex items-center px-6 bg-muted/20 gap-3">
                <div className="p-2 bg-primary/10 rounded-md">
                    <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold tracking-tight">Asistente AI</h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border shrink-0 shadow-sm",
                            msg.role === 'user' ? "bg-primary text-white" : "bg-card")}>
                            {msg.role === 'user' ? 'M' : <Bot className="h-4 w-4 text-primary" />}
                        </div>
                        <div className={cn("px-3 py-2 rounded-lg text-sm max-w-[85%] shadow-sm leading-relaxed",
                            msg.role === 'user' ? "bg-primary text-white" : "bg-muted border")}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-card border flex items-center justify-center shrink-0">
                            <Bot className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex items-center gap-1 bg-muted px-3 py-2 rounded-lg border">
                            <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse"></span>
                            <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse [animation-delay:0.2s]"></span>
                            <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse [animation-delay:0.4s]"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-muted/10">
                <form onSubmit={sendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 bg-background border rounded-md px-3 py-2 text-sm focus:ring-1 ring-primary outline-none"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white px-3 py-2 rounded-md hover:opacity-90 disabled:opacity-50 transition-opacity"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </form>
            </div>
        </div>
    )
}
