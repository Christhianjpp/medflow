'use client';

import React, { useState } from 'react';
import {
    Calendar as CalendarIcon,
    Clock,
    Users,
    ChevronRight,
    ChevronLeft,

    Activity,
    FileText,
    Plus,
    Search,
    Filter,

    MapPin,
    Scissors,
    DollarSign,
    CheckCircle,
    FileQuestion,
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Appointment {
    id: number;
    time: string;
    name: string;
    reason: string;
    notes: string;
    type: 'new' | 'annual' | 'follow-up' | 'routine';
    status: 'Confirmada' | 'Pendiente';
    image: string;
    location: string;
}

interface Procedure {
    id: number;
    time: string;
    name: string;
    procedure: string;
    notes: string;
    type: 'surgery' | 'endoscopy';
    status: 'Confirmada' | 'Pendiente';
    image: string;
    location: string;
}

type ViewType = 'list' | 'week' | 'day';

export default function AppointmentModule() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const [appointments, setAppointments] = useState<Appointment[]>([
        {
            id: 1,
            time: '09:00',
            name: 'Ana Martínez',
            reason: 'Chequeo anual',
            notes: 'Paciente con historial de hipertensión',
            type: 'annual',
            status: 'Confirmada',
            image: '/placeholder.svg?height=100&width=100',
            location: 'Clínica San José',
        },
        {
            id: 2,
            time: '10:30',
            name: 'Carlos Ruiz',
            reason: 'Seguimiento tratamiento',
            notes: 'Revisar resultados de laboratorio',
            type: 'follow-up',
            status: 'Pendiente',
            image: '/placeholder.svg?height=100&width=100',
            location: 'Consultorio Central',
        },
        {
            id: 3,
            time: '12:00',
            name: 'Elena Gómez',
            reason: 'Primera consulta',
            notes: 'Derivada por el Dr. Pérez',
            type: 'new',
            status: 'Confirmada',
            image: '/placeholder.svg?height=100&width=100',
            location: 'Hospital Universitario',
        },
    ]);

    const [procedures, setProcedures] = useState<Procedure[]>([
        {
            id: 1,
            time: '14:00',
            name: 'Juan Pérez',
            procedure: 'Cirugía de rodilla',
            notes: 'Artroscopia programada',
            type: 'surgery',
            status: 'Confirmada',
            image: '/placeholder.svg?height=100&width=100',
            location: 'Hospital Central',
        },
        {
            id: 2,
            time: '16:30',
            name: 'María López',
            procedure: 'Endoscopia',
            notes: 'Ayuno de 8 horas requerido',
            type: 'endoscopy',
            status: 'Pendiente',
            image: '/placeholder.svg?height=100&width=100',
            location: 'Clínica San José',
        },
    ]);

    const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id' | 'image'>>({
        time: '',
        name: '',
        reason: '',
        notes: '',
        type: 'routine',
        status: 'Pendiente',
        location: '',
    });

    const [newProcedure, setNewProcedure] = useState<Omit<Procedure, 'id' | 'image'>>({
        time: '',
        name: '',
        procedure: '',
        notes: '',
        type: 'surgery',
        status: 'Pendiente',
        location: '',
    });

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [view, setView] = useState<ViewType>('list');

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const nextDay = (): void => {
        const next = new Date(currentDate);
        next.setDate(next.getDate() + 1);
        setCurrentDate(next);
    };

    const previousDay = (): void => {
        const prev = new Date(currentDate);
        prev.setDate(prev.getDate() - 1);
        setCurrentDate(prev);
    };

    const handleNewAppointmentChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNewAppointment((prev) => ({ ...prev, [name]: value }));
    };

    const handleNewProcedureChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNewProcedure((prev) => ({ ...prev, [name]: value }));
    };

    const handleNewAppointmentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAppointments((prev) => [
            ...prev,
            { ...newAppointment, id: Date.now(), image: '/placeholder.svg?height=100&width=100' },
        ]);
        setNewAppointment({
            time: '',
            name: '',
            reason: '',
            notes: '',
            type: 'routine',
            status: 'Pendiente',
            location: '',
        });
    };

    const handleNewProcedureSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProcedures((prev) => [
            ...prev,
            { ...newProcedure, id: Date.now(), image: '/placeholder.svg?height=100&width=100' },
        ]);
        setNewProcedure({
            time: '',
            name: '',
            procedure: '',
            notes: '',
            type: 'surgery',
            status: 'Pendiente',
            location: '',
        });
    };

    const getAppointmentColor = (type: string): string => {
        switch (type) {
            case 'new':
                return 'bg-purple-100 text-purple-800';
            case 'annual':
                return 'bg-green-100 text-green-800';
            case 'follow-up':
                return 'bg-blue-100 text-blue-800';
            case 'routine':
                return 'bg-gray-100 text-gray-800';
            case 'surgery':
                return 'bg-red-100 text-red-800';
            case 'endoscopy':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredAppointments = appointments.filter((appointment) =>
        [appointment.name, appointment.reason, appointment.location]
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const filteredProcedures = procedures.filter((procedure) =>
        [procedure.name, procedure.procedure, procedure.location]
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const AppointmentDetails: React.FC<{ appointment: Appointment }> = ({ appointment }) => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    Ver detalles
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detalles de la Cita</DialogTitle>
                    <DialogDescription>
                        Información detallada de la cita con {appointment.name}
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <p>
                        <strong>Paciente:</strong> {appointment.name}
                    </p>
                    <p>
                        <strong>Fecha:</strong> {formatDate(currentDate)}
                    </p>
                    <p>
                        <strong>Hora:</strong> {appointment.time}
                    </p>
                    <p>
                        <strong>Motivo:</strong> {appointment.reason}
                    </p>
                    <p>
                        <strong>Ubicación:</strong> {appointment.location}
                    </p>
                    <p>
                        <strong>Notas:</strong> {appointment.notes || 'Sin notas adicionales'}
                    </p>
                    <Badge className={getAppointmentColor(appointment.type)}>{appointment.type}</Badge>
                </div>
            </DialogContent>
        </Dialog>
    );

    const ProcedureDetails: React.FC<{ procedure: Procedure }> = ({ procedure }) => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    Ver detalles
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detalles del Procedimiento</DialogTitle>
                    <DialogDescription>
                        Información detallada del procedimiento para {procedure.name}
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <p>
                        <strong>Paciente:</strong> {procedure.name}
                    </p>
                    <p>
                        <strong>Fecha:</strong> {formatDate(currentDate)}
                    </p>
                    <p>
                        <strong>Hora:</strong> {procedure.time}
                    </p>
                    <p>
                        <strong>Procedimiento:</strong> {procedure.procedure}
                    </p>
                    <p>
                        <strong>Ubicación:</strong> {procedure.location}
                    </p>
                    <p>
                        <strong>Notas:</strong> {procedure.notes || 'Sin notas adicionales'}
                    </p>
                    <Badge className={getAppointmentColor(procedure.type)}>{procedure.type}</Badge>
                </div>
            </DialogContent>
        </Dialog>
    );

    const NewAppointmentForm: React.FC = () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Cita
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Añadir Nueva Cita</DialogTitle>
                    <DialogDescription>Complete los detalles para agendar una nueva cita</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleNewAppointmentSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Nombre del Paciente</Label>
                        <Input
                            id="name"
                            name="name"
                            value={newAppointment.name}
                            onChange={handleNewAppointmentChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="time">Hora</Label>
                        <Input
                            id="time"
                            name="time"
                            type="time"
                            value={newAppointment.time}
                            onChange={handleNewAppointmentChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="reason">Motivo de la Consulta</Label>
                        <Input
                            id="reason"
                            name="reason"
                            value={newAppointment.reason}
                            onChange={handleNewAppointmentChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="location">Ubicación</Label>
                        <Input
                            id="location"
                            name="location"
                            value={newAppointment.location}
                            onChange={handleNewAppointmentChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="type">Tipo de Cita</Label>
                        <Select
                            name="type"
                            value={newAppointment.type}
                            onValueChange={(value) =>
                                setNewAppointment((prev) => ({ ...prev, type: value as Appointment['type'] }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione el tipo de cita" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="new">Primera Consulta</SelectItem>
                                <SelectItem value="annual">Chequeo Anual</SelectItem>
                                <SelectItem value="follow-up">Seguimiento</SelectItem>
                                <SelectItem value="routine">Consulta de Rutina</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="notes">Notas Adicionales</Label>
                        <Textarea
                            id="notes"
                            name="notes"
                            value={newAppointment.notes}
                            onChange={handleNewAppointmentChange}
                        />
                    </div>
                    <Button type="submit">Agendar Cita</Button>
                </form>
            </DialogContent>
        </Dialog>
    );

    const NewProcedureForm: React.FC = () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Procedimiento
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Añadir Nuevo Procedimiento</DialogTitle>
                    <DialogDescription>
                        Complete los detalles para agendar un nuevo procedimiento
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleNewProcedureSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Nombre del Paciente</Label>
                        <Input
                            id="name"
                            name="name"
                            value={newProcedure.name}
                            onChange={handleNewProcedureChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="time">Hora</Label>
                        <Input
                            id="time"
                            name="time"
                            type="time"
                            value={newProcedure.time}
                            onChange={handleNewProcedureChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="procedure">Tipo de Procedimiento</Label>
                        <Input
                            id="procedure"
                            name="procedure"
                            value={newProcedure.procedure}
                            onChange={handleNewProcedureChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="type">Tipo de Procedimiento</Label>
                        <Select
                            name="type"
                            value={newProcedure.type}
                            onValueChange={(value) =>
                                setNewProcedure((prev) => ({ ...prev, type: value as Procedure['type'] }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione el tipo de procedimiento" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="surgery">Cirugía</SelectItem>
                                <SelectItem value="endoscopy">Endoscopía</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="location">Ubicación</Label>
                        <Input
                            id="location"
                            name="location"
                            value={newProcedure.location}
                            onChange={handleNewProcedureChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="notes">Notas Adicionales</Label>
                        <Textarea
                            id="notes"
                            name="notes"
                            value={newProcedure.notes}
                            onChange={handleNewProcedureChange}
                        />
                    </div>
                    <Button type="submit">Agendar Procedimiento</Button>
                </form>
            </DialogContent>
        </Dialog>
    );

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Gestión de Citas y Procedimientos - MedFlow</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-2">
                    <CardHeader className="bg-white border-b">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <CalendarIcon className="h-6 w-6 text-primary" />
                                <div>
                                    <CardTitle className="text-xl font-semibold">Agenda del Día</CardTitle>
                                    <CardDescription>{formatDate(currentDate)}</CardDescription>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="icon" onClick={previousDay}>
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only">Día anterior</span>
                                </Button>
                                <Button variant="outline" size="icon" onClick={nextDay}>
                                    <ChevronRight className="h-4 w-4" />
                                    <span className="sr-only">Día siguiente</span>
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-4 mt-4">
                            <div className="space-x-2">
                                <Button variant={view === 'list' ? 'default' : 'secondary'} onClick={() => setView('list')}>
                                    Lista
                                </Button>
                                <Button variant={view === 'week' ? 'default' : 'secondary'} onClick={() => setView('week')}>
                                    Semana
                                </Button>
                                <Button variant={view === 'day' ? 'default' : 'secondary'} onClick={() => setView('day')}>
                                    Día
                                </Button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <NewAppointmentForm />
                                <NewProcedureForm />
                                <Button variant="outline">
                                    Filtros
                                    <Filter className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="search" className="sr-only">
                                Buscar citas y procedimientos
                            </Label>
                            <div className="relative">
                                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="search"
                                    type="search"
                                    placeholder="Buscar por nombre, motivo o ubicación..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8"
                                />
                            </div>
                        </div>
                        <Tabs defaultValue="appointments">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="appointments">Citas</TabsTrigger>
                                <TabsTrigger value="procedures">Procedimientos</TabsTrigger>
                            </TabsList>
                            <TabsContent value="appointments">
                                <div className="space-y-4">
                                    {filteredAppointments.map((appointment: Appointment) => (
                                        <Card key={appointment.id} className="bg-white">
                                            <CardContent className="p-4 flex items-start space-x-4">
                                                <Avatar className="w-16 h-16">
                                                    <AvatarImage src={appointment.image} alt={appointment.name} />
                                                    <AvatarFallback>
                                                        {appointment.name
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-grow">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="text-lg font-semibold">{appointment.name}</h3>
                                                            <p className="text-sm text-gray-600 flex items-center">
                                                                <CalendarIcon className="h-4 w-4 mr-1" />
                                                                {appointment.reason}
                                                            </p>
                                                            <p className="text-sm text-gray-600 flex items-center">
                                                                <Clock className="h-4 w-4 mr-1" />
                                                                {appointment.time}
                                                            </p>
                                                            <p className="text-sm text-gray-600 flex items-center">
                                                                <MapPin className="h-4 w-4 mr-1" />
                                                                {appointment.location}
                                                            </p>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            <Button variant="destructive" size="sm">
                                                                Cancelar
                                                            </Button>
                                                            <Button variant="outline" size="sm">
                                                                Reprogramar
                                                            </Button>
                                                            <Button variant="default" size="sm">
                                                                {appointment.status === 'Confirmada' ? 'Iniciar Consulta' : 'Confirmar'}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-2 flex items-start">
                                                        <FileText className="h-4 w-4 mr-1 mt-1 flex-shrink-0" />
                                                        {appointment.notes}
                                                    </p>
                                                    <div className="mt-2 flex justify-between items-center">
                                                        <Badge className={getAppointmentColor(appointment.type)}>
                                                            {appointment.type === 'new'
                                                                ? 'Primera Consulta'
                                                                : appointment.type === 'annual'
                                                                    ? 'Chequeo Anual'
                                                                    : appointment.type === 'follow-up'
                                                                        ? 'Seguimiento'
                                                                        : 'Consulta de Rutina'}
                                                        </Badge>
                                                        <AppointmentDetails appointment={appointment} />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="procedures">
                                <div className="space-y-4">
                                    {filteredProcedures.map((procedure: Procedure) => (
                                        <Card key={procedure.id} className="bg-white">
                                            <CardContent className="p-4 flex items-start space-x-4">
                                                <Avatar className="w-16 h-16">
                                                    <AvatarImage src={procedure.image} alt={procedure.name} />
                                                    <AvatarFallback>
                                                        {procedure.name
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-grow">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="text-lg font-semibold">{procedure.name}</h3>
                                                            <p className="text-sm text-gray-600 flex items-center">
                                                                <Scissors className="h-4 w-4 mr-1" />
                                                                {procedure.procedure}
                                                            </p>
                                                            <p className="text-sm text-gray-600 flex items-center">
                                                                <Clock className="h-4 w-4 mr-1" />
                                                                {procedure.time}
                                                            </p>
                                                            <p className="text-sm text-gray-600 flex items-center">
                                                                <MapPin className="h-4 w-4 mr-1" />
                                                                {procedure.location}
                                                            </p>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            <Button variant="destructive" size="sm">
                                                                Cancelar
                                                            </Button>
                                                            <Button variant="outline" size="sm">
                                                                Reprogramar
                                                            </Button>
                                                            <Button variant="default" size="sm">
                                                                {procedure.status === 'Confirmada' ? 'Iniciar Procedimiento' : 'Confirmar'}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-2 flex items-start">
                                                        <FileText className="h-4 w-4 mr-1 mt-1 flex-shrink-0" />
                                                        {procedure.notes}
                                                    </p>
                                                    <div className="mt-2 flex justify-between items-center">
                                                        <Badge className={getAppointmentColor(procedure.type)}>
                                                            {procedure.type === 'surgery' ? 'Cirugía' : 'Endoscopía'}
                                                        </Badge>
                                                        <ProcedureDetails procedure={procedure} />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader className="bg-secondary text-secondary-foreground">
                            <CardTitle>Resumen del Día</CardTitle>
                        </CardHeader>
                        <CardContent className="mt-4">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 bg-blue-100 p-3 rounded-lg">
                                    <Users className="h-6 w-6 text-blue-500" />
                                    <div>
                                        <p className="text-2xl font-bold text-blue-700">{appointments.length}</p>
                                        <p className="text-sm text-blue-600">Citas programadas</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 bg-green-100 p-3 rounded-lg">
                                    <Scissors className="h-6 w-6 text-green-500" />
                                    <div>
                                        <p className="text-2xl font-bold text-green-700">{procedures.length}</p>
                                        <p className="text-sm text-green-600">Procedimientos programados</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 bg-yellow-100 p-3 rounded-lg">
                                    <Activity className="h-6 w-6 text-yellow-500" />
                                    <div>
                                        <p className="text-2xl font-bold text-yellow-700">
                                            {appointments.filter((a) => a.status === 'Pendiente').length +
                                                procedures.filter((p) => p.status === 'Pendiente').length}
                                        </p>
                                        <p className="text-sm text-yellow-600">Pendientes de confirmación</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="bg-primary text-primary-foreground">
                            <CardTitle>Acciones Pendientes</CardTitle>
                        </CardHeader>
                        <CardContent className="mt-4">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 bg-red-100 p-3 rounded-lg">
                                    <DollarSign className="h-6 w-6 text-red-500" />
                                    <div>
                                        <h3 className="font-semibold text-red-700">Pagos Pendientes</h3>
                                        <p className="text-sm text-red-600">3 pacientes con copagos pendientes</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 bg-orange-100 p-3 rounded-lg">
                                    <CheckCircle className="h-6 w-6 text-orange-500" />
                                    <div>
                                        <h3 className="font-semibold text-orange-700">Confirmaciones</h3>
                                        <p className="text-sm text-orange-600">5 citas requieren confirmación</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 bg-purple-100 p-3 rounded-lg">
                                    <FileQuestion className="h-6 w-6 text-purple-500" />
                                    <div>
                                        <h3 className="font-semibold text-purple-700">Exámenes Pendientes</h3>
                                        <p className="text-sm text-purple-600">2 pacientes deben enviar exámenes</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
