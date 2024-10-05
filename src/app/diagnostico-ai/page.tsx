import AIAgentsWithData from '@/components/AIAgentsWithData'
import React from 'react'

const pageIA = () => {
    return (
        <div className="min-h-screen bg-background">
            <header className="py-6 bg-primary text-primary-foreground">
                <h1 className="text-2xl font-bold text-center">MedFlow - Asistentes IA para Médicos</h1>
            </header>
            <main className="py-8">
                <AIAgentsWithData />
            </main>
        </div>
    )
}

export default pageIA