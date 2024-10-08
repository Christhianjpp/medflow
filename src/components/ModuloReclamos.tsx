'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DollarSignIcon, TrendingUpIcon, TrendingDownIcon, UsersIcon, CheckIcon, EyeIcon, PrinterIcon, PlusCircleIcon } from 'lucide-react'

interface Claim {
    id: string;
    patientName: string;
    patientId: string;
    birthDate: string;
    claimDate: string;
    diagnosis: string;
    treatmentCost: number;
    copay: number;
    insuranceCost: number;
    status: 'Aprobado' | 'En Proceso' | 'Completado';
    insuranceCompany: string;
    details: string;
    stage: string;
    occupation: string;
    email: string;
    phone: string;
    medicalProvider: string;
    providerSpecialty: string;
    providerLicense: string;
    diagnosisCodes: string[];
    medications: string[];
    procedures: string[];
    policyNumber: string;
    certificateNumber: string;
    otherInsurance: string;
    countryOfCare: string;
    workplace: string;
    illnessEffectiveDate: string;
    firstSymptomsDate: string;
    accidentDescription: string;
    accidentLocation: string;
    accidentResponsible: string;
    previousTreatment: string;
    pregnancyRelated: string;
    pregnancyStartDate: string;
    clinicalDetails: string;
    preAuthorization: string;
    preAuthorizationNumber: string;
    providerIsInNetwork: string;
}

// Función para generar IDs alfanuméricos
const generateClaimId = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return 'CL-' + Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// Datos simulados de reclamos
const initialClaims: Claim[] = [
    {
        id: generateClaimId(),
        patientName: 'John Doe',
        patientId: '8-123-456',
        birthDate: '1980-05-15',
        claimDate: '2023-10-01',
        diagnosis: 'Consulta de rutina',
        treatmentCost: 150,
        copay: 20,
        insuranceCost: 130,
        status: 'Aprobado',
        insuranceCompany: 'ASSA Compañía de Seguros',
        details: 'Chequeo anual',
        stage: 'Completado',
        occupation: 'Ingeniero',
        email: 'john.doe@example.com',
        phone: '6123-4567',
        medicalProvider: 'Dr. Smith',
        providerSpecialty: 'Medicina General',
        providerLicense: 'MED-12345',
        diagnosisCodes: ['Z00.00'],
        medications: ['Paracetamol 500mg'],
        procedures: ['Examen físico general'],
        policyNumber: 'POL-987654',
        certificateNumber: 'CERT-123456',
        otherInsurance: 'No',
        countryOfCare: 'Panamá',
        workplace: 'TechCorp Inc.',
        illnessEffectiveDate: '2023-09-30',
        firstSymptomsDate: '2023-09-28',
        accidentDescription: '',
        accidentLocation: '',
        accidentResponsible: '',
        previousTreatment: 'No',
        pregnancyRelated: 'No',
        pregnancyStartDate: '',
        clinicalDetails: 'Paciente presenta síntomas de resfriado común.',
        preAuthorization: 'No',
        preAuthorizationNumber: '',
        providerIsInNetwork: 'Sí',
    }
]

export default function ClaimManagement() {
    const [claims, setClaims] = useState<Claim[]>(initialClaims)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [newDetails, setNewDetails] = useState<string>('')

    const filteredClaims = claims.filter(claim =>
        claim.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.patientId.includes(searchTerm)
    )

    const handleStatusChange = (claimId: string, newStatus: Claim['status']) => {
        setClaims(claims.map(claim =>
            claim.id === claimId ? { ...claim, status: newStatus } : claim
        ))
    }

    const handleAddDetails = (claimId: string) => {
        setClaims(claims.map(claim =>
            claim.id === claimId ? { ...claim, details: claim.details + '\n' + newDetails } : claim
        ))
        setNewDetails('')
    }

    const getStatusCounts = () => {
        return claims.reduce((acc, claim) => {
            acc[claim.status] = (acc[claim.status] || 0) + 1
            return acc
        }, {} as Record<string, number>)
    }

    const statusCounts = getStatusCounts()

    const getTotalInsuranceCost = (): number => {
        return claims.reduce((total, claim) => total + claim.insuranceCost, 0)
    }

    const handlePrintClaim = (claim: Claim) => {
        console.log('Imprimiendo reclamo:', claim.id)
        alert(`Imprimiendo reclamo ${claim.id} en PDF`)
    }

    const handleNewClaim = () => {
        console.log("Nuevo reclamo")
    }

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Gestión de Reclamos a Aseguradoras</h1>
                <Button onClick={handleNewClaim} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <PlusCircleIcon className="mr-2 h-4 w-4" /> Nuevo Reclamo
                </Button>
            </div>

            {/* Resumen */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Tarjetas de Resumen */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Facturado</CardTitle>
                        <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${getTotalInsuranceCost()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Reclamos Aprobados</CardTitle>
                        <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{statusCounts['Aprobado'] || 0}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Reclamos Pendientes</CardTitle>
                        <TrendingDownIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{statusCounts['En Proceso'] || 0}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pacientes Atendidos</CardTitle>
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{claims.length}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabla de Reclamos */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Listado de Reclamos</CardTitle>
                        <Input
                            placeholder="Buscar por nombre o cédula"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-primary hover:bg-primary">
                                <TableHead className="text-primary-foreground">ID de Reclamo</TableHead>
                                <TableHead className="text-primary-foreground">Paciente</TableHead>
                                <TableHead className="text-primary-foreground">Cédula</TableHead>
                                <TableHead className="text-primary-foreground">Fecha</TableHead>
                                <TableHead className="text-primary-foreground">Diagnóstico</TableHead>
                                <TableHead className="text-primary-foreground">Costo Total</TableHead>
                                <TableHead className="text-primary-foreground">Estado</TableHead>
                                <TableHead className="text-primary-foreground">Aseguradora</TableHead>
                                <TableHead className="text-primary-foreground">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredClaims.map((claim) => (
                                <TableRow key={claim.id}>
                                    <TableCell className="font-medium">{claim.id}</TableCell>
                                    <TableCell>{claim.patientName}</TableCell>
                                    <TableCell>{claim.patientId}</TableCell>
                                    <TableCell>{claim.claimDate}</TableCell>
                                    <TableCell>{claim.diagnosis}</TableCell>
                                    <TableCell>${claim.treatmentCost}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${claim.status === 'Aprobado' ? 'bg-green-100 text-green-800' :
                                            claim.status === 'En Proceso' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                            {claim.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{claim.insuranceCompany}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" size="icon">
                                                        <EyeIcon className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl max-h-[80vh]">
                                                    <DialogHeader>
                                                        <DialogTitle>Formulario de Reclamos de Gastos Médicos - {claim.id}</DialogTitle>
                                                    </DialogHeader>
                                                    <ScrollArea className="h-[calc(80vh-4rem)] pr-4">
                                                        <div className="mt-4">
                                                            <h2 className="text-xl font-bold mb-4">SECCIÓN A: PARA SER COMPLETADO POR EL ASEGURADO/PROVEEDOR</h2>
                                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                                <div>
                                                                    <Label>NOMBRE DE LA COMPAÑÍA DE SEGUROS</Label>
                                                                    <Input value={claim.insuranceCompany} readOnly />
                                                                </div>
                                                                <div>
                                                                    <Label>NÚMERO DE PÓLIZA</Label>
                                                                    <Input value={claim.policyNumber} readOnly />
                                                                </div>
                                                                <div>
                                                                    <Label>N° CERTIFICADO</Label>
                                                                    <Input value={claim.certificateNumber} readOnly />
                                                                </div>
                                                                <div>
                                                                    <Label>NOMBRE COMPLETO DEL ASEGURADO PRINCIPAL</Label>
                                                                    <Input value={claim.patientName} readOnly />
                                                                </div>
                                                                <div>
                                                                    <Label>E-MAIL PERSONAL</Label>
                                                                    <Input value={claim.email} readOnly />
                                                                </div>
                                                                <div>
                                                                    <Label>CELULAR</Label>
                                                                    <Input value={claim.phone} readOnly />
                                                                </div>
                                                                <div>
                                                                    <Label>NOMBRE COMPLETO DEL PACIENTE QUE SE ATENDIÓ</Label>
                                                                    <Input value={claim.patientName} readOnly />
                                                                </div>
                                                                <div>
                                                                    <Label>CÉDULA O PASAPORTE</Label>
                                                                    <Input value={claim.patientId} readOnly />
                                                                </div>
                                                                <div>
                                                                    <Label>FECHA DE NACIMIENTO</Label>
                                                                    <Input value={claim.birthDate} readOnly />
                                                                </div>
                                                                <div>
                                                                    <Label>¿TIENE EL PACIENTE SEGURO EN OTRA COMPAÑÍA?</Label>
                                                                    <Input value={claim.otherInsurance} readOnly />
                                                                </div>
                                                            </div>

                                                            <h2 className="text-xl font-bold mb-4">SECCIÓN B: DETALLES DEL RECLAMO</h2>
                                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                                <div>
                                                                    <Label>PAÍS DE ATENCIÓN</Label>
                                                                    <Input value={claim.countryOfCare} readOnly />
                                                                </div>
                                                                <div>
                                                                    <Label>LUGAR DE EMPLEO, COLEGIO O UNIVERSIDAD DEL PACIENTE</Label>
                                                                    <Input value={claim.workplace} readOnly />
                                                                </div>
                                                                <div>
                                                                    <Label>RECLAMO A CAUSA DE UNA ENFERMEDAD</Label>
                                                                    <Input value={claim.diagnosis ? 'Sí' : 'No'} readOnly />
                                                                </div>
                                                                <div>
                                                                    <Label>FECHA EFECTIVA</Label>
                                                                    <Input value={claim.illnessEffectiveDate} readOnly />
                                                                </div>
                                                                <div>
                                                                    <Label>FECHA DE LOS PRIMEROS SÍNTOMAS</Label>
                                                                    <Input value={claim.firstSymptomsDate} readOnly />
                                                                </div>
                                                                <div>
                                                                    <Label>RECLAMO A CAUSA DE ACCIDENTE</Label>
                                                                    <Input value={claim.accidentDescription ? 'Sí' : 'No'} readOnly />
                                                                </div>
                                                            </div>
                                                            {claim.accidentDescription && (
                                                                <div className="mb-4">
                                                                    <Label>DESCRIBA EL ACCIDENTE</Label>
                                                                    <Textarea value={claim.accidentDescription} readOnly />
                                                                    <Label>¿DÓNDE OCURRIÓ?</Label>
                                                                    <Input value={claim.accidentLocation} readOnly />
                                                                    <Label>¿CÓMO OCURRIÓ?</Label>
                                                                    <Textarea value={claim.accidentDescription} readOnly />
                                                                    <Label>¿LA PERSONA RESPONSABLE ES UN TERCERO?</Label>
                                                                    <Input value={claim.accidentResponsible} readOnly />
                                                                </div>
                                                            )}
                                                            <div>
                                                                <Label>¿HA RECIBIDO ANTERIORMENTE TRATAMIENTO, INCAPACIDAD HOSPITALARIA POR ALGUNA DE LAS LESIONES O ENFERMEDADES DESCRITAS ARRIBA?</Label>
                                                                <Input value={claim.previousTreatment} readOnly />
                                                            </div>

                                                            <h2 className="text-xl font-bold mb-4 mt-6">SECCIÓN C: PARA SER COMPLETADO POR EL MÉDICO PROVEEDOR</h2>
                                                            <div className="mb-4">
                                                                <Label>Diagnóstico Principal, Secundario u otros:</Label>
                                                                {claim.diagnosisCodes.map((code, index) => (
                                                                    <div key={index} className="grid grid-cols-3 gap-4 mb-2">
                                                                        <Input value={claim.diagnosis} readOnly />
                                                                        <Input value={code} readOnly />
                                                                        <Input value={claim.claimDate} readOnly />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="mb-4">
                                                                <Label>¿El reclamo es presentado por embarazo?</Label>
                                                                <Input value={claim.pregnancyRelated} readOnly />
                                                                {claim.pregnancyRelated === 'Sí' && (
                                                                    <div>
                                                                        <Label>Fecha de inicio de embarazo (FUM)</Label>
                                                                        <Input value={claim.pregnancyStartDate} readOnly />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="mb-4">
                                                                <Label>¿Ha recibido el paciente tratamiento previo por alguna de las condiciones mencionadas?</Label>
                                                                <Input value={claim.previousTreatment} readOnly />
                                                            </div>
                                                            <div className="mb-4">
                                                                <Label>Favor brindar detalle del cuadro clínico, hallazgos físicos, complicaciones, exámenes de laboratorio y rayos X, así como medicamentos que apoyen el diagnóstico:</Label>
                                                                <Textarea value={claim.clinicalDetails} readOnly />
                                                            </div>
                                                            <div className="mb-4">
                                                                <Label>Informe de Servicios o Procedimientos Brindados:</Label>
                                                                <Table>
                                                                    <TableHeader>
                                                                        <TableRow>
                                                                            <TableHead>Fecha de Servicio</TableHead>
                                                                            <TableHead>Códigos CPT/HCPS</TableHead>
                                                                            <TableHead>Descripción del Procedimiento</TableHead>
                                                                            <TableHead>Total Cargos</TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        {claim.procedures.map((proc, index) => (
                                                                            <TableRow key={index}>
                                                                                <TableCell>{claim.claimDate}</TableCell>
                                                                                <TableCell>{claim.diagnosisCodes[0]}</TableCell>
                                                                                <TableCell>{proc}</TableCell>
                                                                                <TableCell>${claim.treatmentCost}</TableCell>
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                                <div>
                                                                    <Label>¿Tiene Pre-Autorización?</Label>
                                                                    <Input value={claim.preAuthorization} readOnly />
                                                                </div>
                                                                {claim.preAuthorization === 'Sí' && (
                                                                    <div>
                                                                        <Label>Número de Pre-Autorización</Label>
                                                                        <Input value={claim.preAuthorizationNumber} readOnly />
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <Label>Nombre del Médico o Proveedor</Label>
                                                                    <Input value={claim.medicalProvider} readOnly />
                                                                </div>
                                                                <div>
                                                                    <Label>¿Es usted Proveedor de Red?</Label>
                                                                    <Input value={claim.providerIsInNetwork} readOnly />
                                                                </div>
                                                            </div>
                                                            {claim.providerIsInNetwork === 'No' && (
                                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                                    <div>
                                                                        <Label>Teléfono</Label>
                                                                        <Input value={claim.phone} readOnly />
                                                                    </div>
                                                                    <div>
                                                                        <Label>E-mail</Label>
                                                                        <Input value={claim.email} readOnly />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </ScrollArea>
                                                </DialogContent>
                                            </Dialog>
                                            <Button variant="outline" size="icon" onClick={() => handlePrintClaim(claim)}>
                                                <PrinterIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
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
