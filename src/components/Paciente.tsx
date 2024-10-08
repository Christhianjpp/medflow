'use client'
import { useState, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchIcon, PlusCircleIcon } from "lucide-react"
import Link from 'next/link'

// Definimos el tipo para un paciente
interface Patient {
    id: number
    name: string
    idNumber: string
    lastVisit: string
    nextAppointment: string
}

export const patients: Patient[] = [
    { id: 1, name: "Ana Pérez", idNumber: "8-123-4567", lastVisit: "10/09/2023", nextAppointment: "15/10/2023" },
    { id: 2, name: "Carlos Gómez", idNumber: "PE-456-789", lastVisit: "05/09/2023", nextAppointment: "20/10/2023" },
    { id: 3, name: "María Rodríguez", idNumber: "3-234-5678", lastVisit: "12/09/2023", nextAppointment: "18/10/2023" },
    { id: 4, name: "Juan Martínez", idNumber: "E-345-6789", lastVisit: "08/09/2023", nextAppointment: "22/10/2023" },
    { id: 5, name: "Laura Sánchez", idNumber: "6-345-6789", lastVisit: "14/09/2023", nextAppointment: "25/10/2023" },
]
export default function PatientList() {
    // Estado para almacenar el término de búsqueda
    const [searchTerm, setSearchTerm] = useState<string>("")

    // Lista de pacientes con sus respectivos detalles

    // Filtramos los pacientes en base al término de búsqueda
    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.idNumber.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Maneja el cambio en el campo de búsqueda
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(e.target.value)
    }

    // Muestra detalles de un paciente al hacer clic
    const handleViewDetails = (patientId: number): void => {
        console.log(`Ver detalles del paciente con ID: ${patientId}`)
        // Aquí iría la lógica para navegar a la pantalla de detalles del paciente
    }

    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">Lista de Pacientes</CardTitle>
                    <Button>
                        <PlusCircleIcon className="mr-2 h-4 w-4" />
                        Nuevo Paciente
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2 mb-4">
                        <Input
                            type="text"
                            placeholder="Buscar pacientes..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="max-w-sm"
                        />
                        <Button variant="outline" size="icon">
                            <SearchIcon className="h-4 w-4" />
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Foto</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Cédula/Pasaporte</TableHead>
                                <TableHead>Última Visita</TableHead>
                                <TableHead>Próxima Cita</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPatients.map((patient) => (
                                <TableRow key={patient.id}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={`/placeholder-avatar.jpg`} alt={patient.name} />
                                            <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium">{patient.name}</TableCell>
                                    <TableCell>{patient.idNumber}</TableCell>
                                    <TableCell>{patient.lastVisit}</TableCell>
                                    <TableCell>{patient.nextAppointment}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/pacientes/${patient.idNumber}`} >
                                            <Button variant="outline" onClick={() => handleViewDetails(patient.id)}>
                                                Ver Detalles
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
