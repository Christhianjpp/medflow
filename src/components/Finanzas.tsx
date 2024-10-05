'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Eye,
    Printer,
    Edit,
    DollarSign,
    AlertTriangle,
    TrendingUp,
    TrendingDown,
    Users,
    Calendar,
    Plus,
    Trash2,
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Patient {
    id: number;
    name: string;
    cedula: string;
    phone: string;
    email: string;
    address: string;
}

interface Item {
    title: string;
    price: number;
}

interface Invoice {
    id: number;
    patientId: number;
    serviceName: string;
    date: string;
    status: 'Pagado' | 'Pendiente';
    payment: string;
    amount: number;
    paymentType: 'Copago' | 'Sin Seguro';
    items: Item[];
}

// Simulated patient data with more details
const patients: Patient[] = [
    {
        id: 1,
        name: 'Albert Flores',
        cedula: '1234567890',
        phone: '(406) 555-0120',
        email: 'albert.flores@example.com',
        address: '123 Main St, Anytown, AN 12345',
    },
    {
        id: 2,
        name: 'Jacob Jones',
        cedula: '0987654321',
        phone: '(208) 555-0112',
        email: 'jacob.jones@example.com',
        address: '456 Oak Ave, Somewhere, SW 67890',
    },
    {
        id: 3,
        name: 'Darlene Robertson',
        cedula: '1122334455',
        phone: '(704) 555-0127',
        email: 'darlene.robertson@example.com',
        address: '789 Pine Rd, Elsewhere, EW 54321',
    },
    {
        id: 4,
        name: 'Leslie Alexander',
        cedula: '5544332211',
        phone: '(684) 555-0102',
        email: 'leslie.alexander@example.com',
        address: '321 Elm St, Nowhere, NW 10987',
    },
    {
        id: 5,
        name: 'Ralph Edwards',
        cedula: '6677889900',
        phone: '(307) 555-0133',
        email: 'ralph.edwards@example.com',
        address: '654 Birch Ln, Anywhere, AW 13579',
    },
];

// Simulated invoice data
const invoices: Invoice[] = [
    {
        id: 1,
        patientId: 1,
        serviceName: 'Consulta General',
        date: '2024-02-21',
        status: 'Pagado',
        payment: 'Efectivo',
        amount: 150,
        paymentType: 'Copago',
        items: [
            { title: 'Consulta General', price: 100 },
            { title: 'Medicamentos', price: 50 },
        ],
    },
    {
        id: 2,
        patientId: 2,
        serviceName: 'Radiografía',
        date: '2024-02-22',
        status: 'Pendiente',
        payment: 'Tarjeta',
        amount: 200,
        paymentType: 'Sin Seguro',
        items: [{ title: 'Radiografía de Tórax', price: 200 }],
    },
    {
        id: 3,
        patientId: 3,
        serviceName: 'Análisis de Sangre',
        date: '2024-02-23',
        status: 'Pagado',
        payment: 'Seguro',
        amount: 180,
        paymentType: 'Copago',
        items: [
            { title: 'Análisis de Sangre Completo', price: 150 },
            { title: 'Prueba de Colesterol', price: 30 },
        ],
    },
];

export default function BillingModule() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isNewInvoiceModalOpen, setIsNewInvoiceModalOpen] = useState<boolean>(false);
    const [newInvoice, setNewInvoice] = useState<{
        patientId: string;
        date: string;
        paymentType: string;
        items: { title: string; price: number }[];
    }>({
        patientId: '',
        date: new Date().toISOString().split('T')[0],
        paymentType: '',
        items: [{ title: '', price: 0 }],
    });
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    const filteredInvoices = invoices.filter(
        (invoice) =>
            patients[invoice.patientId - 1].name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patients[invoice.patientId - 1].cedula.includes(searchTerm)
    );

    const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
    const paidAmount = invoices
        .filter((invoice) => invoice.status === 'Pagado')
        .reduce((sum, invoice) => sum + invoice.amount, 0);
    const pendingAmount = totalAmount - paidAmount;
    const copaymentAmount = invoices
        .filter((invoice) => invoice.paymentType === 'Copago')
        .reduce((sum, invoice) => sum + invoice.amount, 0);
    const fullPaymentAmount = invoices
        .filter((invoice) => invoice.paymentType === 'Sin Seguro')
        .reduce((sum, invoice) => sum + invoice.amount, 0);

    const mostRequestedService = useMemo(() => {
        const serviceCounts = invoices.reduce((acc: { [key: string]: number }, curr: Invoice) => {
            acc[curr.serviceName] = (acc[curr.serviceName] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(serviceCounts).sort((a, b) => b[1] - a[1])[0][0];
    }, []);

    const InvoiceDetailsModal: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
        const patient = patients.find((p) => p.id === invoice.patientId);
        if (!patient) return null;

        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center">Factura #{invoice.id}</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-6 mt-4">
                        <div className="space-y-4">
                            <div className="bg-muted p-4 rounded-lg">
                                <h3 className="font-semibold text-lg mb-2">Información del Paciente</h3>
                                <p>
                                    <span className="font-medium">Nombre:</span> {patient.name}
                                </p>
                                <p>
                                    <span className="font-medium">Cédula:</span> {patient.cedula}
                                </p>
                                <p>
                                    <span className="font-medium">Teléfono:</span> {patient.phone}
                                </p>
                                <p>
                                    <span className="font-medium">Email:</span> {patient.email}
                                </p>
                                <p>
                                    <span className="font-medium">Dirección:</span> {patient.address}
                                </p>
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                                <h3 className="font-semibold text-lg mb-2">Detalles del Servicio</h3>
                                <p>
                                    <span className="font-medium">Servicio:</span> {invoice.serviceName}
                                </p>
                                <p>
                                    <span className="font-medium">Fecha:</span> {invoice.date}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-muted p-4 rounded-lg">
                                <h3 className="font-semibold text-lg mb-2">Detalles del Pago</h3>
                                <p>
                                    <span className="font-medium">Estado:</span>
                                    <span
                                        className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${invoice.status === 'Pagado'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                    >
                                        {invoice.status}
                                    </span>
                                </p>
                                <p>
                                    <span className="font-medium">Método de Pago:</span> {invoice.payment}
                                </p>
                                <p>
                                    <span className="font-medium">Tipo de Pago:</span> {invoice.paymentType}
                                </p>
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                                <h3 className="font-semibold text-lg mb-2">Resumen de Costos</h3>
                                <p>
                                    <span className="font-medium">Subtotal:</span> ${invoice.amount}
                                </p>
                                <p>
                                    <span className="font-medium">IVA (0%):</span> $0
                                </p>
                                <p className="text-lg font-bold mt-2">Total: ${invoice.amount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Servicio</TableHead>
                                    <TableHead>Cantidad</TableHead>
                                    <TableHead>Precio Unitario</TableHead>
                                    <TableHead>Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoice.items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>1</TableCell>
                                        <TableCell>${item.price}</TableCell>
                                        <TableCell>${item.price}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                        <Button variant="outline">
                            <Printer className="w-4 h-4 mr-1" />
                            Imprimir
                        </Button>
                        <Button variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Editar
                        </Button>
                        <Button>
                            <DollarSign className="w-4 h-4 mr-1" />
                            Registrar Pago
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    };

    const NewInvoiceModal: React.FC = () => {
        const handlePatientChange = (patientId: string) => {
            const patient = patients.find((p) => p.id === parseInt(patientId));
            setSelectedPatient(patient || null);
            setNewInvoice({ ...newInvoice, patientId });
        };

        const handleAddItem = () => {
            setNewInvoice({
                ...newInvoice,
                items: [...newInvoice.items, { title: '', price: 0 }],
            });
        };

        const handleRemoveItem = (index: number) => {
            const newItems = newInvoice.items.filter((_, i) => i !== index);
            setNewInvoice({ ...newInvoice, items: newItems });
        };

        const handleItemChange = (index: number, field: 'title' | 'price', value: string) => {
            const newItems = [...newInvoice.items];

            // Asignar el valor correcto según el campo
            if (field === 'price') {
                newItems[index].price = parseFloat(value) || 0;  // Aseguramos que el precio sea un número
            } else {
                newItems[index].title = value;  // Para 'title', simplemente asignamos el string
            }

            setNewInvoice({ ...newInvoice, items: newItems });
        };


        return (
            <Dialog open={isNewInvoiceModalOpen} onOpenChange={setIsNewInvoiceModalOpen}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center">Crear Nueva Factura</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log('New Invoice:', newInvoice);
                            setIsNewInvoiceModalOpen(false);
                            setNewInvoice({
                                patientId: '',
                                date: new Date().toISOString().split('T')[0],
                                paymentType: '',
                                items: [{ title: '', price: 0 }],
                            });
                            setSelectedPatient(null);
                        }}
                    >
                        <div className="grid grid-cols-2 gap-6 mt-4">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="patient">Paciente</Label>
                                    <Select value={newInvoice.patientId} onValueChange={handlePatientChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar paciente" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {patients.map((patient) => (
                                                <SelectItem key={patient.id} value={patient.id.toString()}>
                                                    {patient.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {selectedPatient && (
                                    <>
                                        <div>
                                            <Label>Cédula</Label>
                                            <Input value={selectedPatient.cedula} disabled />
                                        </div>
                                        <div>
                                            <Label>Teléfono</Label>
                                            <Input value={selectedPatient.phone} disabled />
                                        </div>
                                        <div>
                                            <Label>Email</Label>
                                            <Input value={selectedPatient.email} disabled />
                                        </div>
                                        <div>
                                            <Label>Dirección</Label>
                                            <Input value={selectedPatient.address} disabled />
                                        </div>
                                    </>
                                )}
                                <div>
                                    <Label htmlFor="date">Fecha</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={newInvoice.date}
                                        onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="paymentType">Tipo de Pago</Label>
                                    <Select
                                        value={newInvoice.paymentType}
                                        onValueChange={(value) => setNewInvoice({ ...newInvoice, paymentType: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar tipo de pago" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Copago">Copago</SelectItem>
                                            <SelectItem value="Sin Seguro">Sin Seguro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Servicios</h3>
                                {newInvoice.items.map((item, index) => (
                                    <div key={index} className="flex space-x-2">
                                        <Input
                                            placeholder="Título del servicio"
                                            value={item.title}
                                            onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Precio"
                                            value={item.price}
                                            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                        />
                                        {index > 0 && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => handleRemoveItem(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={handleAddItem}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Añadir Servicio
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-6">
                            <Button type="button" variant="outline" onClick={() => setIsNewInvoiceModalOpen(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit">Crear Factura</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        );
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary">Facturación</h1>
                <Button onClick={() => setIsNewInvoiceModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Nueva Factura
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Facturado</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalAmount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Pagado</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">${paidAmount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Pendiente</CardTitle>
                        <TrendingDown className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">${pendingAmount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pacientes Atendidos</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{invoices.length}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Lista de Facturas</h2>
                <div className="flex items-center space-x-2">
                    <span>Buscar:</span>
                    <Input
                        type="search"
                        placeholder="Buscar paciente, servicio, cédula, etc."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-primary">
                            <TableHead className="text-lg font-bold text-primary-foreground">Paciente</TableHead>
                            <TableHead className="text-lg font-bold text-primary-foreground">Cédula</TableHead>
                            <TableHead className="text-lg font-bold text-primary-foreground">Servicio</TableHead>
                            <TableHead className="text-lg font-bold text-primary-foreground">Fecha</TableHead>
                            <TableHead className="text-lg font-bold text-primary-foreground">Estado</TableHead>
                            <TableHead className="text-lg font-bold text-primary-foreground">Pago</TableHead>
                            <TableHead className="text-lg font-bold text-primary-foreground">Monto</TableHead>
                            <TableHead className="text-lg font-bold text-primary-foreground">Acción</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredInvoices.map((invoice, index) => {
                            const patient = patients.find((p) => p.id === invoice.patientId);
                            if (!patient) return null;

                            return (
                                <TableRow
                                    key={invoice.id}
                                    className={`cursor-pointer hover:bg-muted ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        }`}
                                >
                                    <TableCell className="font-medium border-l-4 border-primary">
                                        <div className="flex items-center space-x-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage
                                                    src={`/placeholder.svg?height=32&width=32`}
                                                    alt={patient.name}
                                                />
                                                <AvatarFallback>
                                                    {patient.name
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span>{patient.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{patient.cedula}</TableCell>
                                    <TableCell>{invoice.serviceName}</TableCell>
                                    <TableCell>{invoice.date}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${invoice.status === 'Pagado'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            {invoice.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{invoice.payment}</TableCell>
                                    <TableCell className="font-semibold">${invoice.amount}</TableCell>
                                    <TableCell>
                                        <InvoiceDetailsModal invoice={invoice} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Información Clave</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2 text-yellow-600">
                            <AlertTriangle className="w-5 h-5" />
                            <span>
                                {invoices.filter((inv) => inv.status === 'Pendiente').length} facturas pendientes de
                                pago
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 text-green-600">
                            <DollarSign className="w-5 h-5" />
                            <span>{invoices.filter((inv) => inv.status === 'Pagado').length} pagos recibidos</span>
                        </div>
                        <div className="flex items-center space-x-2 text-blue-600">
                            <Calendar className="w-5 h-5" />
                            <span>Próximo cierre de mes: 5 días</span>
                        </div>
                        <div className="flex items-center space-x-2 text-purple-600">
                            <TrendingUp className="w-5 h-5" />
                            <span>Servicio más solicitado: {mostRequestedService}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-red-600">
                            <AlertTriangle className="w-5 h-5" />
                            <span>
                                Monto pendiente más alto: $
                                {Math.max(
                                    ...invoices
                                        .filter((inv) => inv.status === 'Pendiente')
                                        .map((inv) => inv.amount)
                                )}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 text-orange-600">
                            <Users className="w-5 h-5" />
                            <span>Pacientes nuevos este mes: {Math.floor(Math.random() * 10) + 1}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <NewInvoiceModal />
        </div>
    );
}
