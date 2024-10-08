"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from 'date-fns'
import { Search, Plus, Stethoscope, Clipboard, Activity, Pill } from 'lucide-react'
import Link from 'next/link'

// Define types for consultations
interface Consulta {
    id: number;
    fecha: string;
    paciente: string;
    cedula: string;
    motivo: string;
    subjetivo: string;
    objetivo: string;
    evaluacion: string;
    plan: string;
}

export default function ModuloConsultas() {
    const [consultas, setConsultas] = useState<Consulta[]>([]) // Define type for consultas state
    const [filtroConsulta, setFiltroConsulta] = useState<string>('') // Define type for filtroConsulta state
    const [consultaSeleccionada, setConsultaSeleccionada] = useState<Consulta | null>(null) // Define type for consultaSeleccionada

    useEffect(() => {
        // Simular carga de datos
        setConsultas([
            {
                id: 1,
                fecha: '2023-05-15',
                paciente: 'Juan Pérez',
                cedula: '1234567890',
                motivo: 'Control rutinario',
                subjetivo: 'El paciente refiere sentirse bien en general.',
                objetivo: 'Signos vitales normales. Peso: 70kg, Altura: 175cm, Presión arterial: 120/80 mmHg',
                evaluacion: 'Estado de salud general bueno.',
                plan: 'Mantener dieta y ejercicio actuales. Próxima revisión en 6 meses.'
            },
            {
                id: 2,
                fecha: '2023-05-16',
                paciente: 'María García',
                cedula: '0987654321',
                motivo: 'Dolor de cabeza',
                subjetivo: 'La paciente refiere dolor de cabeza frecuente en las últimas dos semanas.',
                objetivo: 'No se observan signos neurológicos anormales. Presión arterial ligeramente elevada: 140/90 mmHg',
                evaluacion: 'Posible migraña tensional.',
                plan: 'Recetar analgésicos suaves. Recomendar técnicas de relajación. Seguimiento en 2 semanas.'
            },
            {
                id: 3,
                fecha: '2023-05-17',
                paciente: 'Carlos Rodríguez',
                cedula: '5678901234',
                motivo: 'Seguimiento tratamiento',
                subjetivo: 'El paciente informa mejoría en los síntomas de hipertensión.',
                objetivo: 'Presión arterial: 130/85 mmHg. Frecuencia cardíaca: 72 lpm.',
                evaluacion: 'El tratamiento actual parece ser efectivo.',
                plan: 'Continuar con la medicación actual. Enfatizar la importancia de la dieta baja en sodio.'
            },
        ])
    }, [])

    const consultasFiltradas = consultas.filter(consulta =>
        consulta.paciente.toLowerCase().includes(filtroConsulta.toLowerCase()) ||
        consulta.motivo.toLowerCase().includes(filtroConsulta.toLowerCase())
    )

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold text-green-600">Lista de Consultas</CardTitle>


                    <Link href='/consultas/nueva-consulta'>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Añadir Nueva Consulta
                        </Button>
                    </Link>

                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Input
                                placeholder="Buscar consulta..."
                                value={filtroConsulta}
                                onChange={(e) => setFiltroConsulta(e.target.value)}
                                className="max-w-sm"
                            />
                            <Search className="text-gray-400" />
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader className="bg-black">
                                    <TableRow>
                                        <TableHead className="text-white">ID de Consulta</TableHead>
                                        <TableHead className="text-white">Paciente</TableHead>
                                        <TableHead className="text-white">Cédula</TableHead>
                                        <TableHead className="text-white">Fecha</TableHead>
                                        <TableHead className="text-white">Detalle</TableHead>
                                        <TableHead className="text-white">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {consultasFiltradas.map((consulta) => (
                                        <TableRow key={consulta.id}>
                                            <TableCell>{consulta.id}</TableCell>
                                            <TableCell>{consulta.paciente}</TableCell>
                                            <TableCell>{consulta.cedula}</TableCell>
                                            <TableCell>{format(new Date(consulta.fecha), 'dd/MM/yyyy')}</TableCell>
                                            <TableCell>{consulta.motivo}</TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm" onClick={() => setConsultaSeleccionada(consulta)}>
                                                            Ver detalles
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-3xl">
                                                        <DialogHeader>
                                                            <DialogTitle>Detalles de la Consulta</DialogTitle>
                                                        </DialogHeader>
                                                        <Tabs defaultValue="soap" className="w-full">
                                                            <TabsList>
                                                                <TabsTrigger value="soap">SOAP</TabsTrigger>
                                                                <TabsTrigger value="indicaciones">Indicaciones</TabsTrigger>
                                                            </TabsList>
                                                            <TabsContent value="soap" className="space-y-4">
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="subjetivo">Subjetivo</Label>
                                                                    <Textarea id="subjetivo" value={consultaSeleccionada?.subjetivo || ''} readOnly />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="objetivo">Objetivo</Label>
                                                                    <Textarea id="objetivo" value={consultaSeleccionada?.objetivo || ''} readOnly />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="evaluacion">Evaluación</Label>
                                                                    <Textarea id="evaluacion" value={consultaSeleccionada?.evaluacion || ''} readOnly />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="plan">Plan</Label>
                                                                    <Textarea id="plan" value={consultaSeleccionada?.plan || ''} readOnly />
                                                                </div>
                                                            </TabsContent>
                                                            <TabsContent value="indicaciones" className="space-y-4">
                                                                <div className="space-y-2">
                                                                    <Label className="flex items-center space-x-2">
                                                                        <Stethoscope className="h-4 w-4" />
                                                                        <span>Diagnóstico</span>
                                                                    </Label>
                                                                    <Textarea value={consultaSeleccionada?.evaluacion || ''} readOnly />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label className="flex items-center space-x-2">
                                                                        <Clipboard className="h-4 w-4" />
                                                                        <span>Indicaciones</span>
                                                                    </Label>
                                                                    <Textarea value={consultaSeleccionada?.plan || ''} readOnly />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label className="flex items-center space-x-2">
                                                                        <Activity className="h-4 w-4" />
                                                                        <span>Exámenes</span>
                                                                    </Label>
                                                                    <Textarea placeholder="No se han indicado exámenes" readOnly />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label className="flex items-center space-x-2">
                                                                        <Pill className="h-4 w-4" />
                                                                        <span>Medicamentos</span>
                                                                    </Label>
                                                                    <Textarea placeholder="No se han recetado medicamentos" readOnly />
                                                                </div>
                                                            </TabsContent>
                                                        </Tabs>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
