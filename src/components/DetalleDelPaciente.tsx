// PatientDetails.tsx
'use client'
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    PlusCircleIcon,
    ClipboardIcon,
    FileTextIcon,
    UploadIcon,
    PrinterIcon,
    DownloadIcon,
    EyeIcon,
    LinkIcon,
    MailIcon,
    PencilIcon,
    Mic,
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { patients } from '@/app/api/data';
// Define las interfaces para los datos
interface Patient {
    id: number;
    name: string;
    idNumber: string;
    lastVisit: string;
    nextAppointment: string;
    birthDate: string;
    gender: string;
    phone: string;
    email: string;
    address: string;
}

interface MedicalInsurance {
    company: string;
    policyNumber: string;
    planType: string;
    startDate: string;
    endDate: string;
    copay: string;
}

interface Appointment {
    date: string;
    reason: string;
    doctor: string;
    type: string;
}

interface Treatment {
    id: number;
    date: string;
    title: string;
    doctor: string;
}

interface Document {
    id: number;
    name: string;
    date: string;
}

interface Medication {
    id: number;
    name: string;
    dosage: string;
}

interface Allergy {
    id: number;
    name: string;
    reactionDetails: string;
}

interface Consultation {
    id: number;
    date: string;
    title: string;
    doctor: string;
    specialty: string;
}

export default function PatientDetails({ idNumber }: { idNumber: string }) {
    // Estados principales
    const [patient, setPatient] = useState<Patient | null>(null);
    const [medicalInsurance, setMedicalInsurance] = useState<MedicalInsurance | null>(null);
    const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [audioSummary, setAudioSummary] = useState<string>('');
    const [documentType, setDocumentType] = useState<string>('');
    const [upcomingAppointmentFilter, setUpcomingAppointmentFilter] = useState<string>('all');
    const [upcomingAppointmentDateFilter, setUpcomingAppointmentDateFilter] = useState<string>('');
    const [selectedMedications, setSelectedMedications] = useState<Record<number, boolean>>({});
    const [exportStartDate, setExportStartDate] = useState<string>('');
    const [exportEndDate, setExportEndDate] = useState<string>('');
    const [exportType, setExportType] = useState<string>('');
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
    const [showFirstConsultForm, setShowFirstConsultForm] = useState<boolean>(false);
    const [showAddMedicalHistoryForm, setShowAddMedicalHistoryForm] = useState<boolean>(false);

    // Simulación de obtención de datos desde una API
    const fetchPatientData = async () => {
        // Datos simulados
        const patientData = patients.find(patient => patient.idNumber === idNumber)
        if (!patientData) {
            return
        }

        const insuranceData: MedicalInsurance = {
            company: 'Seguros Panamá Plus',
            policyNumber: 'SP-987654321',
            planType: 'Cobertura Completa',
            startDate: '01/01/2023',
            endDate: '31/12/2023',
            copay: '$10 por consulta',
        };

        const appointmentsData: Appointment[] = [
            { date: '10/10/2023', reason: 'Revisión General', doctor: 'Dr. García', type: 'general' },
            { date: '25/10/2023', reason: 'Control de Diabetes', doctor: 'Dra. Rodríguez', type: 'specialist' },
        ];

        // Simular retraso de API
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                setPatient(patientData);
                setMedicalInsurance(insuranceData);
                setUpcomingAppointments(appointmentsData);
                // Aquí puedes setear otros datos como tratamientos, documentos, etc.
                resolve();
            }, 1000);
        });
    };

    useEffect(() => {
        fetchPatientData();
    }, []);

    // Funciones con tipado
    const startRecording = (): void => {
        setIsRecording(true);
        console.log('Iniciando grabación...');
    };

    const stopRecording = (): void => {
        setIsRecording(false);
        console.log('Deteniendo grabación y procesando audio...');

        setTimeout(() => {
            const simulatedSummary =
                'El paciente reporta mejora en los niveles de glucosa en sangre. Se recomienda mantener la dosis actual de metformina y continuar con la dieta baja en carbohidratos. Próxima revisión en 3 meses.';
            setAudioSummary(simulatedSummary);
        }, 2000);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (file && documentType) {
            console.log(`Subiendo archivo: ${file.name} como ${documentType}`);
            // Aquí iría la lógica para subir el archivo
        } else {
            console.log('Por favor, seleccione un tipo de documento antes de subir el archivo.');
        }
    };

    const handleMedicationSelection = (id: number): void => {
        setSelectedMedications((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handlePrintPrescription = (): void => {
        const selectedMeds = Object.entries(selectedMedications)
            .filter(([_, isSelected]) => isSelected)
            .map(([id, _]) => id);
        console.log('Imprimiendo receta para medicamentos:', selectedMeds);
        // Aquí iría la lógica para imprimir la receta
    };

    const handleExportMedicalRecord = (): void => {
        console.log(`Exportando expediente médico desde ${exportStartDate} hasta ${exportEndDate}, tipo: ${exportType}`);
        // Aquí iría la lógica para exportar el expediente médico
    };

    const handleDocumentView = (document: Document): void => {
        setSelectedDocument(document);
        // Aquí iría la lógica para abrir el documento en un visor
    };

    const handleTreatmentView = (treatment: Treatment): void => {
        setSelectedTreatment(treatment);
        // Aquí iría la lógica para abrir los detalles del tratamiento
    };

    const handleAddMedicalHistory = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        console.log('Añadiendo información al historial médico...');
        // Aquí iría la lógica para añadir la información al historial médico
        setShowAddMedicalHistoryForm(false);
    };

    const handleCopyFormLink = (): void => {
        const formLink = 'https://example.com/first-consult-form';
        navigator.clipboard.writeText(formLink);
        console.log('Enlace del formulario copiado al portapapeles');
    };

    const handleSendFormEmail = (): void => {
        console.log('Enviando enlace del formulario por correo electrónico...');
        // Aquí iría la lógica para enviar el correo electrónico
    };

    if (!patient || !medicalInsurance) {
        return <div>Cargando datos del paciente...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Detalles del Paciente</h1>
                <div className="space-x-2">
                    <Button>
                        <PlusCircleIcon className="mr-2 h-4 w-4" />
                        Nueva Cita
                    </Button>
                    <Button variant="secondary">
                        <ClipboardIcon className="mr-2 h-4 w-4" />
                        Nuevo Tratamiento
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <DownloadIcon className="mr-2 h-4 w-4" />
                                Exportar Expediente
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Exportar Expediente Médico</DialogTitle>
                                <DialogDescription>
                                    Seleccione el rango de fechas y el tipo de información a exportar.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="exportStartDate" className="text-right">
                                        Fecha Inicio
                                    </Label>
                                    <Input
                                        id="exportStartDate"
                                        type="date"
                                        className="col-span-3"
                                        value={exportStartDate}
                                        onChange={(e) => setExportStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="exportEndDate" className="text-right">
                                        Fecha Fin
                                    </Label>
                                    <Input
                                        id="exportEndDate"
                                        type="date"
                                        className="col-span-3"
                                        value={exportEndDate}
                                        onChange={(e) => setExportEndDate(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="exportType" className="text-right">
                                        Tipo de Información
                                    </Label>
                                    <Select onValueChange={setExportType} >
                                        <SelectTrigger id="exportType">
                                            <SelectValue placeholder="Seleccione el tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todo el expediente</SelectItem>
                                            <SelectItem value="consultations">Solo consultas</SelectItem>
                                            <SelectItem value="medications">Solo medicamentos</SelectItem>
                                            <SelectItem value="tests">Solo pruebas médicas</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleExportMedicalRecord}>Exportar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Información Personal y Seguro Médico */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Información Personal */}
                <Card>
                    <CardHeader>
                        <CardTitle>Información Personal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 mb-4">
                            <Avatar className="w-20 h-20">
                                <AvatarImage src="/placeholder-avatar.jpg" alt="Foto del paciente" />
                                <AvatarFallback>{patient.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-xl font-semibold">{patient.name}</h2>
                                <p className="text-sm text-muted-foreground">ID: {patient.idNumber}</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p>
                                <strong>Fecha de Nacimiento:</strong> {patient.birthDate}
                            </p>
                            <p>
                                <strong>Género:</strong> {patient.gender}
                            </p>
                            <p>
                                <strong>Teléfono:</strong> {patient.phone}
                            </p>
                            <p>
                                <strong>Email:</strong> {patient.email}
                            </p>
                            <p>
                                <strong>Dirección:</strong> {patient.address}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Información del Seguro Médico */}
                <Card>
                    <CardHeader>
                        <CardTitle>Información del Seguro Médico</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p>
                                <strong>Compañía:</strong> {medicalInsurance.company}
                            </p>
                            <p>
                                <strong>Número de Póliza:</strong> {medicalInsurance.policyNumber}
                            </p>
                            <p>
                                <strong>Tipo de Plan:</strong> {medicalInsurance.planType}
                            </p>
                            <p>
                                <strong>Fecha de Inicio:</strong> {medicalInsurance.startDate}
                            </p>
                            <p>
                                <strong>Fecha de Vencimiento:</strong> {medicalInsurance.endDate}
                            </p>
                            <p>
                                <strong>Copago:</strong> {medicalInsurance.copay}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Próximas Citas */}
                <Card>
                    <CardHeader>
                        <CardTitle>Próximas Citas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 space-y-2">
                            <Select onValueChange={setUpcomingAppointmentFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filtrar citas" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas las citas</SelectItem>
                                    <SelectItem value="general">Consulta General</SelectItem>
                                    <SelectItem value="specialist">Especialista</SelectItem>
                                    <SelectItem value="followup">Seguimiento</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                type="date"
                                value={upcomingAppointmentDateFilter}
                                onChange={(e) => setUpcomingAppointmentDateFilter(e.target.value)}
                                placeholder="Filtrar por fecha"
                            />
                        </div>
                        <div className="space-y-4">
                            {upcomingAppointments
                                .filter(
                                    (cita) =>
                                        (upcomingAppointmentFilter === 'all' || cita.type === upcomingAppointmentFilter) &&
                                        (!upcomingAppointmentDateFilter || cita.date === upcomingAppointmentDateFilter)
                                )
                                .map((cita, index) => (
                                    <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                                        <div>
                                            <p className="font-semibold">{cita.reason}</p>
                                            <p className="text-sm text-muted-foreground">Fecha: {cita.date}</p>
                                            <p className="text-sm text-muted-foreground">Médico: {cita.doctor}</p>
                                        </div>
                                        <Button>Iniciar Consulta</Button>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Historial Médico */}


            {/* Diálogos para Documentos y Tratamientos */}
            {selectedDocument && (
                <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedDocument.name}</DialogTitle>
                            <DialogDescription>Fecha: {selectedDocument.date}</DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                            {/* Aquí iría el visor del documento */}
                            <p>Contenido del documento {selectedDocument.name}</p>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {selectedTreatment && (
                <Dialog open={!!selectedTreatment} onOpenChange={() => setSelectedTreatment(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedTreatment.title}</DialogTitle>
                            <DialogDescription>Fecha de inicio: {selectedTreatment.date}</DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                            <p>Doctor: {selectedTreatment.doctor}</p>
                            <p>
                                Detalles del tratamiento: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Ir al Tratamiento</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
            <Card className="col-span-3 mt-3">
                <CardHeader>
                    <CardTitle>Historial Médico</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="antecedentes" className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="antecedentes">Antecedentes</TabsTrigger>
                            <TabsTrigger value="general">General</TabsTrigger>
                            <TabsTrigger value="tratamientos">Tratamientos</TabsTrigger>
                            <TabsTrigger value="alergias">Alergias</TabsTrigger>
                            <TabsTrigger value="medicamentos">Medicamentos</TabsTrigger>
                            <TabsTrigger value="vacunas">Vacunas</TabsTrigger>
                            <TabsTrigger value="documentos">Documentos</TabsTrigger>
                            <TabsTrigger value="consultas">Consultas</TabsTrigger>
                        </TabsList>
                        <TabsContent value="antecedentes">
                            <div className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Antecedentes Familiares</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc list-inside">
                                            <li>Padre: Hipertensión</li>
                                            <li>Madre: Diabetes Tipo 2</li>
                                            <li>Hermana: Asma</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Antecedentes Personales</CardTitle>

                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc list-inside">
                                            <li>Cirugía de apendicitis (2010)</li>
                                            <li>Fractura de brazo izquierdo (2005)</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                                <div className="flex justify-between">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button>Agregar Antecedente</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Añadir Nuevo Antecedente</DialogTitle>
                                                <DialogDescription>
                                                    Complete los detalles del nuevo antecedente aquí.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form className="space-y-4">
                                                <div>
                                                    <Label htmlFor="antecedentType">Tipo de Antecedente</Label>
                                                    <Select>
                                                        <SelectTrigger id="antecedentType">
                                                            <SelectValue placeholder="Seleccione el tipo" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="familiar">Familiar</SelectItem>
                                                            <SelectItem value="personal">Personal</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div>
                                                    <Label htmlFor="antecedentRelation">Relación Familiar (si aplica)</Label>
                                                    <Input id="antecedentRelation" placeholder="Ej: Padre, Madre, Hermano/a" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="antecedentCondition">Condición o Enfermedad</Label>
                                                    <Input id="antecedentCondition" placeholder="Ej: Diabetes, Hipertensión" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="antecedentDiagnosisDate">Fecha de Diagnóstico</Label>
                                                    <Input id="antecedentDiagnosisDate" type="date" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="antecedentTreatment">Tratamiento (si aplica)</Label>
                                                    <Input id="antecedentTreatment" placeholder="Ej: Insulina, Cirugía" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="antecedentNotes">Notas Adicionales</Label>
                                                    <Textarea id="antecedentNotes" placeholder="Detalles adicionales sobre el antecedente" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="antecedentExtraInfo">Información Adicional</Label>
                                                    <Textarea id="antecedentExtraInfo" placeholder="Ingrese cualquier información adicional relevante" />
                                                </div>
                                            </form>
                                            <DialogFooter>
                                                <Button type="submit">Guardar Antecedente</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">
                                                <FileTextIcon className="mr-2 h-4 w-4" />
                                                Formulario de Primera Consulta
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Formulario de Primera Consulta</DialogTitle>
                                                <DialogDescription>
                                                    Opciones para compartir el formulario de primera consulta con el paciente.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex justify-between items-center mt-4">
                                                <Button onClick={handleCopyFormLink} className="flex items-center">
                                                    <LinkIcon className="mr-2 h-4 w-4" />
                                                    Copiar Enlace
                                                </Button>
                                                <Button onClick={handleSendFormEmail} className="flex items-center">
                                                    <MailIcon className="mr-2 h-4 w-4" />
                                                    Enviar por Correo
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="general">
                            <div className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Historial Médico Detallado</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {[
                                                { date: "15/09/2023", title: "Consulta de seguimiento", doctor: "Dr. García" },
                                                { date: "01/08/2023", title: "Control de diabetes", doctor: "Dra. Rodríguez" },
                                                { date: "10/07/2023", title: "Revisión general", doctor: "Dr. García" }
                                            ].map((entry, index) => (
                                                <div key={index} className="border-b pb-4">
                                                    <h4 className="font-medium">{entry.date} - {entry.title}</h4>
                                                    <p className="text-sm text-muted-foreground">Doctor: {entry.doctor}</p>
                                                    <p className="text-sm mt-2">
                                                        Resumen: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                    </p>
                                                    <Button variant="outline" className="mt-2">Ver Detalles</Button>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Grabación de Voz y Resumen IA</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mb-2">Utilice este botón para grabar notas de voz sobre el historial del paciente. El audio será procesado por IA para generar un resumen.</p>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant={isRecording ? "destructive" : "default"}
                                                onClick={isRecording ? stopRecording : startRecording}
                                            >
                                                <Mic className="mr-2 h-4 w-4" />
                                                {isRecording ? "Detener Grabación" : "Iniciar Grabación"}
                                            </Button>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline">
                                                        <PencilIcon className="mr-2 h-4 w-4" />
                                                        Añadir Manualmente
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Añadir Información al Historial Médico</DialogTitle>
                                                        <DialogDescription>
                                                            Complete los campos para añadir información al historial médico del paciente.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <form onSubmit={handleAddMedicalHistory} className="space-y-4">
                                                        <div>
                                                            <Label htmlFor="date">Fecha</Label>
                                                            <Input id="date" type="date" required />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="title">Título</Label>
                                                            <Input id="title" placeholder="Ej: Consulta de seguimiento" required />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="doctor">Doctor</Label>
                                                            <Input id="doctor" placeholder="Nombre del doctor" required />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="summary">Resumen</Label>
                                                            <Textarea id="summary" placeholder="Resumen de la consulta o procedimiento" required />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="notes">Notas Adicionales</Label>
                                                            <Textarea id="notes" placeholder="Cualquier información adicional relevante" />
                                                        </div>
                                                        <DialogFooter>
                                                            <Button type="submit">Guardar Información</Button>
                                                        </DialogFooter>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                        {audioSummary && (
                                            <div className="mt-4 p-3 bg-secondary rounded-lg">
                                                <h4 className="font-semibold mb-2">Resumen generado por IA:</h4>
                                                <p>{audioSummary}</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                        <TabsContent value="tratamientos">
                            <div className="space-y-4">
                                {[
                                    { id: 1, date: "01/09/2023", title: "Tratamiento para Diabetes Tipo 2", doctor: "Dra. Rodríguez" },
                                    { id: 2, date: "15/08/2023", title: "Terapia Física para Lesión de Rodilla", doctor: "Dr. Martínez" },
                                    { id: 3, date: "01/07/2023", title: "Tratamiento para Hipertensión", doctor: "Dr. García" }
                                ].map((treatment) => (
                                    <Card key={treatment.id}>
                                        <CardHeader>
                                            <CardTitle>{treatment.title}</CardTitle>
                                            <CardDescription>Fecha de inicio: {treatment.date}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">Doctor: {treatment.doctor}</p>
                                            <div className="mt-2 space-x-2">
                                                <Button variant="outline" onClick={() => handleTreatmentView(treatment)}>Ver Detalles</Button>
                                                <Button variant="outline">Ir al Tratamiento</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="alergias">
                            <div className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Alergias Conocidas</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc list-inside">
                                            <li>Penicilina</li>
                                            <li>Nueces</li>
                                            <li>Polen</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Añadir Nueva Alergia</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Input placeholder="Nombre de la alergia" className="mb-2" />
                                        <Textarea placeholder="Detalles de la reacción alérgica" className="mb-2" />
                                        <Button>Agregar Alergia</Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                        <TabsContent value="medicamentos">
                            <div className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Medicamentos Actuales</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {[
                                                { id: 1, name: "Metformina 500mg", dosage: "2 veces al día" },
                                                { id: 2, name: "Lisinopril 10mg", dosage: "1 vez al día" },
                                                { id: 3, name: "Salbutamol inhalador", dosage: "según sea necesario" }
                                            ].map((med) => (
                                                <li key={med.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`med-${med.id}`}
                                                        checked={selectedMedications[med.id]}
                                                        onCheckedChange={() => handleMedicationSelection(med.id)}
                                                    />
                                                    <label htmlFor={`med-${med.id}`} className="text-sm">
                                                        {med.name} - {med.dosage}
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                        <Button onClick={handlePrintPrescription} className="mt-4">
                                            <PrinterIcon className="mr-2 h-4 w-4" />
                                            Imprimir Receta Seleccionada
                                        </Button>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Añadir Nuevo Medicamento</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Input placeholder="Nombre del medicamento" className="mb-2" />
                                        <Input placeholder="Dosis" className="mb-2" />
                                        <Input placeholder="Frecuencia" className="mb-2" />
                                        <Button>Agregar Medicamento</Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                        <TabsContent value="vacunas">
                            <div className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Historial de Vacunación</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc list-inside">
                                            <li>Vacuna contra la gripe - 15/10/2022</li>
                                            <li>Vacuna COVID-19 (refuerzo) - 01/03/2023</li>
                                            <li>Tétanos - 20/05/2020</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Registrar Nueva Vacuna</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Input placeholder="Nombre de la vacuna" className="mb-2" />
                                        <Input type="date" className="mb-2" />
                                        <Button>Registrar Vacuna</Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                        <TabsContent value="documentos">
                            <div className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Subir Nuevo Documento</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Select onValueChange={setDocumentType}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccione el tipo de documento" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="resultado">Resultado de Examen</SelectItem>
                                                <SelectItem value="resumen">Resumen de Consulta</SelectItem>
                                                <SelectItem value="receta">Receta Médica</SelectItem>
                                                <SelectItem value="otro">Otro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Input type="file" onChange={handleFileUpload} className="mb-2" />
                                        <Button>
                                            <UploadIcon className="mr-2 h-4 w-4" />
                                            Subir Documento
                                        </Button>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Documentos Subidos</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {[
                                                { id: 1, name: "Resultado de Análisis de Sangre", date: "15/09/2023" },
                                                { id: 2, name: "Resumen de Consulta Cardiología", date: "01/08/2023" },
                                                { id: 3, name: "Receta Médica", date: "20/07/2023" }
                                            ].map((doc) => (
                                                <li key={doc.id} className="flex justify-between items-center">
                                                    <span className="text-sm">{doc.name} - {doc.date}</span>
                                                    <Button variant="outline" onClick={() => handleDocumentView(doc)}>
                                                        <EyeIcon className="mr-2 h-4 w-4" />
                                                        Ver Documento
                                                    </Button>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                        <TabsContent value="consultas">
                            <div className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Consultas Recientes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-4">
                                            {[
                                                { id: 1, date: "20/09/2023", title: "Consulta de Seguimiento", doctor: "Dra. Rodríguez", specialty: "Endocrinología" },
                                                { id: 2, date: "05/09/2023", title: "Revisión General", doctor: "Dr. García", specialty: "Medicina General" },
                                                { id: 3, date: "15/08/2023", title: "Control de Presión Arterial", doctor: "Dr. Martínez", specialty: "Cardiología" }
                                            ].map((consulta) => (
                                                <li key={consulta.id} className="border-b pb-4 last:border-b-0">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-medium">{consulta.title}</h4>
                                                            <p className="text-sm text-muted-foreground">Fecha: {consulta.date}</p>
                                                            <p className="text-sm text-muted-foreground">Doctor: {consulta.doctor}</p>
                                                            <p className="text-sm text-muted-foreground">Especialidad: {consulta.specialty}</p>
                                                        </div>
                                                        <Button variant="outline">Ver Detalles</Button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Programar Nueva Consulta</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <form className="space-y-4">
                                            <div>
                                                <Label htmlFor="consultType">Tipo de Consulta</Label>
                                                <Select>
                                                    <SelectTrigger id="consultType">
                                                        <SelectValue placeholder="Seleccione el tipo" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="general">Consulta General</SelectItem>
                                                        <SelectItem value="followup">Seguimiento</SelectItem>
                                                        <SelectItem value="specialist">Especialista</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="consultDate">Fecha Preferida</Label>
                                                <Input id="consultDate" type="date" />
                                            </div>
                                            <div>
                                                <Label htmlFor="consultNotes">Notas Adicionales</Label>
                                                <Textarea id="consultNotes" placeholder="Describa brevemente el motivo de la consulta" />
                                            </div>
                                            <Button>Solicitar Consulta</Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
