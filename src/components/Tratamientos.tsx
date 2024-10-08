'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Search, UserCircle, CalendarDays, Activity, Eye } from "lucide-react"
import Link from 'next/link'
import { tratamientos } from '@/app/api/data'

// Define the type for each tratamiento


// Static data with the correct type


export default function ListaTratamientos() {
    const [busqueda, setBusqueda] = useState<string>("")

    // Filter the treatments based on the search input
    const tratamientosFiltrados = tratamientos.filter(
        (tratamiento) =>
            tratamiento.paciente.toLowerCase().includes(busqueda.toLowerCase()) ||
            tratamiento.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
            tratamiento.estado.toLowerCase().includes(busqueda.toLowerCase())
    )

    // Simulate navigation to add a new treatment
    const simularNuevoTratamiento = (): void => {
        alert("Navegando a la pantalla de nuevo tratamiento...")
    }

    // Simulate viewing a treatment
    const simularVerTratamiento = (id: number): void => {
        alert(`Viendo detalles del tratamiento con ID: ${id}`)
    }

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle className="text-2xl font-bold">Tratamientos Médicos</CardTitle>
                        <p className="text-muted-foreground mt-2">Gestiona y visualiza todos los tratamientos médicos</p>
                    </div>
                    <Link href='/tratamientos/nuevo-tratamiento'>
                        <Button >
                            <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Tratamiento
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    <div className="mb-6">
                        <Label htmlFor="buscar-tratamiento" className="sr-only">
                            Buscar tratamiento
                        </Label>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="buscar-tratamiento"
                                placeholder="Buscar por paciente, tipo de tratamiento o estado"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Paciente</TableHead>
                                    <TableHead>Fecha de Inicio</TableHead>
                                    <TableHead>Tipo de Tratamiento</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tratamientosFiltrados.map((tratamiento) => (
                                    <TableRow key={tratamiento.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center">
                                                <UserCircle className="mr-2 h-5 w-5 text-muted-foreground" />
                                                {tratamiento.paciente}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <CalendarDays className="mr-2 h-5 w-5 text-muted-foreground" />
                                                {tratamiento.fechaInicio}
                                            </div>
                                        </TableCell>
                                        <TableCell>{tratamiento.tipo}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <Activity className="mr-2 h-5 w-5 text-muted-foreground" />
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${tratamiento.estado === 'En progreso' ? 'bg-blue-100 text-blue-800' :
                                                    tratamiento.estado === 'Completado' ? 'bg-green-100 text-green-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {tratamiento.estado}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/tratamientos/${tratamiento.idNumber}`}>
                                                <Button
                                                    variant="outline"
                                                    size="sm"

                                                >
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Ver Tratamiento
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
