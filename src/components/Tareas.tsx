"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2, Plus, User, Stethoscope, ClipboardList, CheckCircle2, Clock, XCircle } from 'lucide-react'

// Tipos de datos
interface LinkedEntity {
    id: number
    name: string
    type: 'patient' | 'treatment' | 'consultation'
}

interface Task {
    id: number
    description: string
    dueDate: Date
    category: string
    status: 'No iniciada' | 'En progreso' | 'Completada'
    linkedTo?: LinkedEntity
}

interface TaskSummary {
    total: number
    completed: number
    inProgress: number
    notStarted: number
}

export default function TaskManagementWithBlackColumns() {
    // Estados
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, description: "Revisar resultados de laboratorio de María García", dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), category: "Pacientes", status: 'En progreso', linkedTo: { id: 1, name: 'María García', type: 'patient' } },
        { id: 2, description: "Llamar a Juan Pérez para seguimiento", dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), category: "Seguimiento", status: 'No iniciada', linkedTo: { id: 1, name: 'Tratamiento de hipertensión', type: 'treatment' } },
        { id: 3, description: "Actualizar plan de tratamiento de Ana Martínez", dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), category: "Tratamientos", status: 'Completada', linkedTo: { id: 2, name: 'Ana Martínez', type: 'patient' } },
        { id: 4, description: "Preparar informe para la junta médica", dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), category: "Consultorio", status: 'En progreso' },
        { id: 5, description: "Revisar radiografías de Carlos Rodríguez", dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), category: "Pacientes", status: 'No iniciada', linkedTo: { id: 1, name: 'Consulta del 05/10', type: 'consultation' } },
        { id: 6, description: "Organizar inventario de suministros", dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), category: "Personal", status: 'Completada' },
    ])

    const [newTask, setNewTask] = useState<Partial<Task>>({
        description: '',
        dueDate: new Date(),
        category: 'Pacientes',
        status: 'No iniciada',
    })

    const [taskSummary, setTaskSummary] = useState<TaskSummary>({
        total: 0,
        completed: 0,
        inProgress: 0,
        notStarted: 0,
    })

    const [linkedEntities, setLinkedEntities] = useState<LinkedEntity[]>([
        { id: 1, name: 'María García', type: 'patient' },
        { id: 2, name: 'Ana Martínez', type: 'patient' },
        { id: 1, name: 'Tratamiento de hipertensión', type: 'treatment' },
        { id: 1, name: 'Consulta del 05/10', type: 'consultation' },
    ])

    const [showNewEntityInput, setShowNewEntityInput] = useState<boolean>(false)
    const [newEntityName, setNewEntityName] = useState<string>('')
    const [dueDays, setDueDays] = useState<string>('3')

    // Efecto para calcular el resumen de tareas
    useEffect(() => {
        const summary = tasks.reduce((acc, task) => {
            acc.total++
            if (task.status === 'Completada') acc.completed++
            else if (task.status === 'En progreso') acc.inProgress++
            else acc.notStarted++
            return acc
        }, { total: 0, completed: 0, inProgress: 0, notStarted: 0 } as TaskSummary)
        setTaskSummary(summary)
    }, [tasks])

    // Funciones de manejo de tareas
    const addTask = (): void => {
        if (newTask.description) {
            const dueDate = new Date()
            dueDate.setDate(dueDate.getDate() + parseInt(dueDays))
            setTasks([...tasks, { id: tasks.length + 1, ...newTask, dueDate } as Task])
            setNewTask({ description: '', dueDate: new Date(), category: 'Pacientes', status: 'No iniciada' })
            setShowNewEntityInput(false)
            setNewEntityName('')
            setDueDays('3')
        }
    }

    const deleteTask = (id: number): void => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const updateTaskStatus = (id: number, status: Task['status']): void => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, status } : task
        ))
    }

    const handleLinkedEntityChange = (value: string): void => {
        if (value === 'new') {
            setShowNewEntityInput(true)
        } else {
            setShowNewEntityInput(false)
            const selectedEntity = linkedEntities.find(entity => entity.id === parseInt(value))
            if (selectedEntity) {
                setNewTask({ ...newTask, linkedTo: selectedEntity })
            }
        }
    }

    const addNewLinkedEntity = (): void => {
        if (newEntityName && newTask.linkedTo?.type) {
            const newEntity: LinkedEntity = {
                id: linkedEntities.length + 1,
                name: newEntityName,
                type: newTask.linkedTo.type
            }
            setLinkedEntities([...linkedEntities, newEntity])
            setNewTask({ ...newTask, linkedTo: newEntity })
            setShowNewEntityInput(false)
            setNewEntityName('')
        }
    }

    const getCategoryColor = (category: string): string => {
        switch (category) {
            case 'Pacientes': return 'bg-blue-100 text-blue-800'
            case 'Seguimiento': return 'bg-green-100 text-green-800'
            case 'Tratamientos': return 'bg-purple-100 text-purple-800'
            case 'Consultorio': return 'bg-yellow-100 text-yellow-800'
            case 'Personal': return 'bg-pink-100 text-pink-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusColor = (status: Task['status']): string => {
        switch (status) {
            case 'Completada': return 'bg-green-100 text-green-800'
            case 'En progreso': return 'bg-yellow-100 text-yellow-800'
            case 'No iniciada': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getLinkedToIcon = (type?: 'patient' | 'treatment' | 'consultation') => {
        switch (type) {
            case 'patient': return <User className="w-4 h-4 mr-1" />
            case 'treatment': return <Stethoscope className="w-4 h-4 mr-1" />
            case 'consultation': return <ClipboardList className="w-4 h-4 mr-1" />
            default: return null
        }
    }

    const formatDueDate = (date: Date): string => {
        const now = new Date()
        const diffTime = date.getTime() - now.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        if (diffDays === 0) return 'Hoy'
        if (diffDays === 1) return 'Mañana'
        if (diffDays > 1) return `En ${diffDays} días`
        return 'Vencida'
    }

    const categories = ['Todas', 'Pacientes', 'Seguimiento', 'Tratamientos', 'Consultorio', 'Personal']

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Gestión de Tareas</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Añadir Tarea</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Añadir Nueva Tarea</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">Descripción</Label>
                                <Input
                                    id="description"
                                    className="col-span-3"
                                    value={newTask.description || ''}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="dueDate" className="text-right">Vence en (días)</Label>
                                <Input
                                    id="dueDate"
                                    type="number"
                                    min="1"
                                    className="col-span-3"
                                    value={dueDays}
                                    onChange={(e) => setDueDays(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">Categoría</Label>
                                <Select onValueChange={(value) => setNewTask({ ...newTask, category: value })}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Seleccionar categoría" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.filter(cat => cat !== 'Todas').map((category) => (
                                            <SelectItem key={category} value={category}>{category}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-right">Estado</Label>
                                <Select onValueChange={(value) => setNewTask({ ...newTask, status: value as Task['status'] })}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Seleccionar estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="No iniciada">No iniciada</SelectItem>
                                        <SelectItem value="En progreso">En progreso</SelectItem>
                                        <SelectItem value="Completada">Completada</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="linkedTo" className="text-right">Vincular a</Label>
                                <Select onValueChange={(value) => setNewTask({ ...newTask, linkedTo: { type: value as 'patient' | 'treatment' | 'consultation', id: 0, name: '' } })}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Tipo de vinculación" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="patient">Paciente</SelectItem>
                                        <SelectItem value="treatment">Tratamiento</SelectItem>
                                        <SelectItem value="consultation">Consulta</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {newTask.linkedTo && (
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="linkedEntity" className="text-right">Seleccionar {newTask.linkedTo.type}</Label>
                                    <Select onValueChange={handleLinkedEntityChange}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder={`Seleccionar ${newTask.linkedTo.type}`} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {linkedEntities
                                                .filter(entity => entity.type === newTask.linkedTo?.type)
                                                .map(entity => (
                                                    <SelectItem key={entity.id} value={entity.id.toString()}>{entity.name}</SelectItem>
                                                ))}
                                            <SelectItem value="new">Crear nuevo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                            {showNewEntityInput && (
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="newEntityName" className="text-right">Nombre del nuevo {newTask.linkedTo?.type}</Label>
                                    <Input
                                        id="newEntityName"
                                        className="col-span-2"
                                        value={newEntityName}
                                        onChange={(e) => setNewEntityName(e.target.value)}
                                    />
                                    <Button onClick={addNewLinkedEntity}>Añadir</Button>
                                </div>
                            )}
                        </div>
                        <Button onClick={addTask}>Añadir Tarea</Button>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-4 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Tareas</CardTitle>
                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{taskSummary.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tareas Completadas</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{taskSummary.completed}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tareas en Progreso</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{taskSummary.inProgress}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tareas No Iniciadas</CardTitle>
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{taskSummary.notStarted}</div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="Todas" className="w-full mb-6">
                <TabsList className="grid grid-cols-3 sm:grid-cols-6">
                    {categories.map((category) => (
                        <TabsTrigger key={category} value={category} className="text-xs sm:text-sm">
                            {category}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {categories.map((category) => (
                    <TabsContent key={category} value={category}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-semibold bg-black text-white">Descripción</TableHead>
                                    <TableHead className="font-semibold bg-black text-white">Categoría</TableHead>
                                    <TableHead className="font-semibold bg-black text-white">Estado</TableHead>
                                    <TableHead className="font-semibold bg-black text-white">Vence</TableHead>
                                    <TableHead className="font-semibold bg-black text-white">Vinculado a</TableHead>
                                    <TableHead className="text-right font-semibold bg-black text-white">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tasks
                                    .filter(task => category === 'Todas' || task.category === category)
                                    .map((task) => (
                                        <TableRow key={task.id} className="hover:bg-muted/50">
                                            <TableCell className="font-medium">{task.description}</TableCell>
                                            <TableCell>
                                                <Badge className={getCategoryColor(task.category)}>{task.category}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    value={task.status}
                                                    onValueChange={(value) => updateTaskStatus(task.id, value as Task['status'])}
                                                >
                                                    <SelectTrigger className="w-[140px]">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="No iniciada">No iniciada</SelectItem>
                                                        <SelectItem value="En progreso">En progreso</SelectItem>
                                                        <SelectItem value="Completada">Completada</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell>{formatDueDate(task.dueDate)}</TableCell>
                                            <TableCell>
                                                {task.linkedTo && (
                                                    <Badge variant="outline" className="flex items-center">
                                                        {getLinkedToIcon(task.linkedTo.type)}
                                                        {task.linkedTo.name}
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" className="mr-2">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
