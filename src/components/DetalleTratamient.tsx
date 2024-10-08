'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
    CalendarIcon,
    FileText,
    ChevronRight,
    Calendar as CalendarIconOutline,
    UserCircle,
    Shield,
    ChevronLeft
} from "lucide-react"
import { tratamientos } from '@/app/api/data'

// Definición de interfaces para el tipado
interface Paciente {
    id: number;
    nombre: string;
    fechaNacimiento: string;
    genero: string;
    historialMedico: string[];
    seguro: {
        nombre: string;
        poliza: string;
        certificado: string;
        paisAtencion: string;
        lugarEmpleo: string;
        ocupacion: string;
    };
}

interface Medicamento {
    nombre: string;
    dosis: string;
    frecuencia: string;
}

interface Tratamiento {
    id: number;
    nombre: string;
    fechaInicio: string;
    fechaFin: string;
    descripcion: string;
    analisis: string;
    sesionesCompletadas: number;
    sesionesTotales: number;
    proximaSesion: string;
    medicamentos: Medicamento[];
    recomendaciones: string[];
}

// Datos de ejemplo

// Paciente = {
//     id: 1,
//     nombre: "Juan Pérez",
//     fechaNacimiento: "1978-09-22",
//     genero: "Masculino",
//     historialMedico: ["2023-02-14 Tratamiento para hipertensión"],
//     seguro: {
//         nombre: "Seguros Bienestar",
//         poliza: "POL-002-2023",
//         certificado: "CERT-789012",
//         paisAtencion: "Panamá",
//         lugarEmpleo: "Corporación XYZ",
//         ocupacion: "Contador"
//     }
// }

const tratamientoActual: Tratamiento = {
    id: 1,
    nombre: "Tratamiento para dolor lumbar crónico",
    fechaInicio: "2023-11-01",
    fechaFin: "2024-01-31",
    descripcion: "Programa integral de fisioterapia y manejo del dolor para aliviar el dolor lumbar crónico y mejorar la movilidad.",
    analisis: "El paciente presenta dolor lumbar crónico debido a una hernia discal L4-L5. Se recomienda un enfoque multidisciplinario que incluya fisioterapia, ejercicios de fortalecimiento core y técnicas de manejo del dolor.",
    sesionesCompletadas: 8,
    sesionesTotales: 20,
    proximaSesion: "2023-12-15",
    medicamentos: [
        { nombre: "Ibuprofeno", dosis: "400mg", frecuencia: "Cada 8 horas según sea necesario" },
        { nombre: "Relajante muscular", dosis: "10mg", frecuencia: "Antes de dormir" }
    ],
    recomendaciones: [
        "Realizar ejercicios de estiramiento diariamente",
        "Aplicar compresas calientes en la zona lumbar por 15 minutos, dos veces al día",
        "Evitar levantar objetos pesados",
        "Mantener una postura correcta al sentarse y caminar"
    ]
}

export default function VistaTratamientoActual({ idNumber }: { idNumber: string }) {
    const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | undefined>(new Date(tratamientoActual.proximaSesion))
    const paciente = tratamientos.find(t => t.idNumber === idNumber)
    return (
        <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
            <div className="flex-1">
                <Card className="mb-6">
                    <CardHeader className="flex flex-col space-y-4">
                        <CardTitle className="text-2xl text-primary">Tratamiento Actual</CardTitle>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <CalendarIcon className="h-5 w-5 text-green-500" />
                                <span className="font-semibold">Inicio:</span>
                                <Badge variant="outline" className="bg-green-50">{tratamientoActual.fechaInicio}</Badge>
                            </div>
                            <ChevronRight className="h-4 w-4" />
                            <div className="flex items-center space-x-2">
                                <CalendarIcon className="h-5 w-5 text-red-500" />
                                <span className="font-semibold">Fin:</span>
                                <Badge variant="outline" className="bg-red-50">{tratamientoActual.fechaFin}</Badge>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="resumen" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="resumen">Resumen</TabsTrigger>
                                <TabsTrigger value="analisis">Análisis</TabsTrigger>
                                <TabsTrigger value="sesiones">Sesiones</TabsTrigger>
                            </TabsList>
                            <TabsContent value="resumen">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{tratamientoActual.nombre}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p>{tratamientoActual.descripcion}</p>
                                        <div>
                                            <h4 className="font-semibold mb-2">Medicamentos</h4>
                                            <ul className="list-disc pl-5">
                                                {tratamientoActual.medicamentos.map((med, index) => (
                                                    <li key={index}>
                                                        {med.nombre} - {med.dosis} ({med.frecuencia})
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">Recomendaciones</h4>
                                            <ul className="list-disc pl-5">
                                                {tratamientoActual.recomendaciones.map((rec, index) => (
                                                    <li key={index}>{rec}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="analisis">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Análisis del Tratamiento</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{tratamientoActual.analisis}</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="sesiones">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Sesiones de Tratamiento</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span>Progreso de sesiones:</span>
                                            <span className="font-semibold">{tratamientoActual.sesionesCompletadas} de {tratamientoActual.sesionesTotales}</span>
                                        </div>
                                        <Progress value={(tratamientoActual.sesionesCompletadas / tratamientoActual.sesionesTotales) * 100} />
                                        <div className="flex justify-between items-center">
                                            <span>Próxima sesión:</span>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className={cn("w-[240px] justify-start text-left font-normal", !fechaSeleccionada && "text-muted-foreground")}>
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {fechaSeleccionada ? format(fechaSeleccionada, "PPP") : <span>Seleccionar fecha</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={fechaSeleccionada}
                                                        onSelect={setFechaSeleccionada}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
                <div className="flex justify-end space-x-4">
                    <Button variant="outline">
                        <ChevronLeft className="mr-2 h-4 w-4" /> Tratamiento Anterior
                    </Button>
                    <Button>
                        Editar Tratamiento <FileText className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Card className="w-80 h-fit sticky top-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Información del Paciente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <UserCircle className="h-5 w-5 text-gray-500" />
                            <span className="text-lg">{paciente?.paciente}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CalendarIconOutline className="h-5 w-5 text-gray-500" />
                            <span>Fecha de nacimiento: {paciente?.fechaNacimiento}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-gray-500" />
                            <span>Género: {paciente?.genero}</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Información de Seguro</h3>
                        <Card className="bg-blue-50 border-blue-200">
                            <CardContent className="p-4 space-y-2">
                                <div className="flex items-center space-x-2 text-blue-600">
                                    <Shield className="h-5 w-5" />
                                    <span className="font-semibold">{paciente?.seguro.nombre}</span>
                                </div>
                                <p>Póliza: {paciente?.seguro.poliza}</p>
                                <p>Certificado: {paciente?.seguro.certificado}</p>
                                <p>País de Atención: {paciente?.seguro.paisAtencion}</p>
                                <p>Lugar de Empleo: {paciente?.seguro.lugarEmpleo}</p>
                                <p>Ocupación: {paciente?.seguro.ocupacion}</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Historial Médico</h3>
                        <Card>
                            <CardContent className="p-4">
                                <ul className="list-disc pl-5 space-y-1">
                                    {paciente?.historialMedico.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
