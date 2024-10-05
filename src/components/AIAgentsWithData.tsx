'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Agent = {
    id: string
    name: string
    description: string
    avatar: string
    role: string
    requiresPatient: boolean
    requiresDiagnosis: boolean
}

type Patient = {
    id: string
    name: string
    documentNumber: string
    diagnoses: string[]
}

type Diagnosis = {
    id: string
    name: string
    description: string
}

const agents: Agent[] = [
    {
        id: '1',
        name: 'Asistente de Diagnóstico',
        description: 'Ayuda a analizar síntomas y sugiere posibles diagnósticos',
        avatar: '/placeholder.svg?height=50&width=50',
        role: 'Soy un asistente especializado en ayudar con el análisis de síntomas y sugerir posibles diagnósticos basados en la información proporcionada.',
        requiresPatient: true,
        requiresDiagnosis: false
    },
    {
        id: '2',
        name: 'Consultor de Tratamientos',
        description: 'Proporciona información sobre opciones de tratamiento',
        avatar: '/placeholder.svg?height=50&width=50',
        role: 'Me especializo en proporcionar información actualizada sobre opciones de tratamiento para diversos diagnósticos.',
        requiresPatient: true,
        requiresDiagnosis: true
    },
    {
        id: '3',
        name: 'Asesor de Historial Médico',
        description: 'Ayuda a analizar y resumir historiales médicos',
        avatar: '/placeholder.svg?height=50&width=50',
        role: 'Puedo ayudarte a analizar y resumir historiales médicos complejos, destacando información relevante.',
        requiresPatient: true,
        requiresDiagnosis: false
    },
    {
        id: '4',
        name: 'Asistente de Investigación Médica',
        description: 'Proporciona información sobre estudios y avances médicos recientes',
        avatar: '/placeholder.svg?height=50&width=50',
        role: 'Te mantengo actualizado sobre los últimos estudios y avances en investigación médica relevantes para tu práctica.',
        requiresPatient: false,
        requiresDiagnosis: false
    },
]

// Simulated database data
const patients: Patient[] = [
    { id: '1', name: 'Juan Pérez', documentNumber: '12345678', diagnoses: ['Hipertensión', 'Diabetes Tipo 2'] },
    { id: '2', name: 'María García', documentNumber: '87654321', diagnoses: ['Asma'] },
    { id: '3', name: 'Carlos López', documentNumber: '23456789', diagnoses: ['Artritis'] },
]

const diagnoses: Diagnosis[] = [
    { id: '1', name: 'Hipertensión', description: 'Presión arterial alta' },
    { id: '2', name: 'Diabetes Tipo 2', description: 'Niveles elevados de azúcar en sangre' },
    { id: '3', name: 'Asma', description: 'Enfermedad respiratoria crónica' },
    { id: '4', name: 'Artritis', description: 'Inflamación de las articulaciones' },
]

export default function AIAgentsWithData() {
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
    const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(null)
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([])
    const [input, setInput] = useState('')

    const handleAgentSelect = (agentId: string) => {
        const agent = agents.find(a => a.id === agentId)
        if (agent) {
            setSelectedAgent(agent)
            setMessages([{ role: 'system', content: agent.role }])
            if (!agent.requiresPatient) {
                setSelectedPatient(null)
            }
            if (!agent.requiresDiagnosis) {
                setSelectedDiagnosis(null)
            }
        }
    }

    const handlePatientSelect = (patientId: string) => {
        const patient = patients.find(p => p.id === patientId)
        if (patient) {
            setSelectedPatient(patient)
            setSelectedDiagnosis(null)
        }
    }

    const handleDiagnosisSelect = (diagnosisId: string) => {
        const diagnosis = diagnoses.find(d => d.id === diagnosisId)
        if (diagnosis) {
            setSelectedDiagnosis(diagnosis)
        }
    }

    const handleSendMessage = () => {
        if (input.trim() && selectedAgent) {
            const userMessage = { role: 'user', content: input }
            setMessages(prev => [...prev, userMessage])

            // Simular respuesta del agente
            setTimeout(() => {
                let responseContent = `Como ${selectedAgent.name}, puedo ayudarte con eso. `
                if (selectedPatient) {
                    responseContent += `Analizando la información de ${selectedPatient.name}, `
                }
                if (selectedDiagnosis) {
                    responseContent += `considerando el diagnóstico de ${selectedDiagnosis.name}, `
                }
                responseContent += '¿Qué más necesitas saber?'

                setMessages(prev => [...prev, { role: 'assistant', content: responseContent }])
            }, 1000)

            setInput('')
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Asistentes IA para Médicos</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Selecciona un asistente IA</label>
                    <Select onValueChange={handleAgentSelect}>
                        <SelectTrigger>
                            <SelectValue placeholder="Elige un asistente" />
                        </SelectTrigger>
                        <SelectContent>
                            {agents.map((agent) => (
                                <SelectItem key={agent.id} value={agent.id}>
                                    <div className="flex items-center">
                                        <Avatar className="h-8 w-8 mr-2">
                                            <AvatarImage src={agent.avatar} alt={agent.name} />
                                            <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{agent.name}</div>
                                            <div className="text-sm text-muted-foreground">{agent.description}</div>
                                        </div>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {selectedAgent?.requiresPatient && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Selecciona un paciente</label>
                        <Select onValueChange={handlePatientSelect}>
                            <SelectTrigger>
                                <SelectValue placeholder="Elige un paciente" />
                            </SelectTrigger>
                            <SelectContent>
                                {patients.map((patient) => (
                                    <SelectItem key={patient.id} value={patient.id}>
                                        {patient.name} - Doc: {patient.documentNumber}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
                {selectedAgent?.requiresDiagnosis && selectedPatient && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Selecciona un diagnóstico</label>
                        <Select onValueChange={handleDiagnosisSelect}>
                            <SelectTrigger>
                                <SelectValue placeholder="Elige un diagnóstico" />
                            </SelectTrigger>
                            <SelectContent>
                                {diagnoses
                                    .filter(d => selectedPatient.diagnoses.includes(d.name))
                                    .map((diagnosis) => (
                                        <SelectItem key={diagnosis.id} value={diagnosis.id}>
                                            {diagnosis.name} - {diagnosis.description}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>
            {selectedAgent && (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Consulta con {selectedAgent.name}</CardTitle>
                        <CardDescription>
                            {selectedPatient && `Paciente: ${selectedPatient.name} (Doc: ${selectedPatient.documentNumber})`}
                            {selectedDiagnosis && ` | Diagnóstico: ${selectedDiagnosis.name}`}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[400px] w-full pr-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : ''}`}>
                                    <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                                        {msg.content}
                                    </span>
                                </div>
                            ))}
                        </ScrollArea>
                        <div className="flex mt-4">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Escribe tu consulta..."
                                className="flex-grow mr-2"
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <Button onClick={handleSendMessage}>Enviar</Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}