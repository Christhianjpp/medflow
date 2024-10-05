'use client'

import { useState } from 'react'
import { format, startOfWeek, addDays, isSameDay, parseISO } from 'date-fns'

import { Users, Clock, MapPin, Plus, Edit, Check, X, Download, Upload } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Appointment {
  id: number
  patientName: string
  time: string
  duration: number
  type: string
  details: string
  location: string
}

interface Task {
  id: number
  task: string
  deadline: string
  category: string
  completed: boolean
}

const initialAppointments: Appointment[] = [
  { id: 1, patientName: 'María García', time: '2023-09-25T09:00', duration: 30, type: 'Consulta General', details: 'Seguimiento de presión arterial', location: 'Clínica Central' },
  { id: 2, patientName: 'Juan Pérez', time: '2023-09-25T10:00', duration: 45, type: 'Seguimiento', details: 'Control post-operatorio', location: 'Hospital San Juan' },
  { id: 3, patientName: 'Ana Martínez', time: '2023-09-25T11:30', duration: 30, type: 'Revisión de Exámenes', details: 'Resultados de análisis de sangre', location: 'Clínica Central' },
  { id: 4, patientName: 'Carlos Rodríguez', time: '2023-09-25T14:00', duration: 60, type: 'Primera Consulta', details: 'Evaluación inicial', location: 'Consultorio Privado' },
  { id: 5, patientName: 'Laura Sánchez', time: '2023-09-25T15:30', duration: 30, type: 'Consulta General', details: 'Dolor de espalda crónico', location: 'Hospital San Juan' },
  { id: 6, patientName: 'Pedro Gómez', time: '2023-09-26T10:00', duration: 45, type: 'Seguimiento', details: 'Control de medicación', location: 'Clínica Central' },
  { id: 7, patientName: 'Sofía Torres', time: '2023-09-27T11:00', duration: 30, type: 'Consulta General', details: 'Revisión anual', location: 'Consultorio Privado' },
]

const initialTasks: Task[] = [
  { id: 1, task: 'Revisar resultados de laboratorio de María García', deadline: '14:00', category: 'pacientes', completed: false },
  { id: 2, task: 'Llamar a Juan Pérez para seguimiento', deadline: '16:00', category: 'seguimiento', completed: false },
  { id: 3, task: 'Actualizar historia clínica de Ana Martínez', deadline: '18:00', category: 'pacientes', completed: false },
  { id: 4, task: 'Preparar informe para la junta médica', deadline: '17:00', category: 'personal', completed: false },
  { id: 5, task: 'Revisar radiografías de Carlos Rodríguez', deadline: '15:00', category: 'pacientes', completed: false },
  { id: 6, task: 'Organizar inventario de suministros', deadline: '12:00', category: 'consultorio', completed: false },
]

const locations = ['Todas las ubicaciones', 'Clínica Central', 'Hospital San Juan', 'Consultorio Privado']

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<Appointment | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)
  const [selectedLocation, setSelectedLocation] = useState('Todas las ubicaciones')

  const weekDays = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB']
  const weekStart = startOfWeek(currentDate)

  const filteredAppointments = selectedLocation === 'Todas las ubicaciones'
    ? appointments
    : appointments.filter(appointment => appointment.location === selectedLocation)

  const renderTimeSlots = () => {
    const slots = []
    for (let i = 8; i < 18; i++) {
      slots.push(
        <div key={i} className="grid grid-cols-8 border-t">
          <div className="col-span-1 p-2 text-xs text-gray-500">{`${i}:00`}</div>
          {weekDays.map((_, index) => (
            <div key={index} className="col-span-1 border-l p-2"></div>
          ))}
        </div>
      )
    }
    return slots
  }

  const renderAppointments = () => {
    return filteredAppointments.map((appointment) => {
      const appointmentDate = parseISO(appointment.time)
      const dayIndex = appointmentDate.getDay()
      const startHour = appointmentDate.getHours()
      const startMinute = appointmentDate.getMinutes()
      const top = (startHour - 8) * 60 + startMinute
      const height = appointment.duration

      return (
        <div
          key={appointment.id}
          className="absolute bg-blue-500 text-white p-1 rounded text-xs overflow-hidden cursor-pointer"
          style={{
            top: `${top}px`,
            height: `${height}px`,
            left: `${(100 / 7) * dayIndex}%`,
            width: `${100 / 7}%`,
          }}
          onClick={() => setSelectedEvent(appointment)}
        >
          {appointment.patientName} - {appointment.type}
        </div>
      )
    })
  }

  const handleAddEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newEvent: Appointment = {
      id: appointments.length + 1,
      patientName: formData.get('patientName') as string,
      time: formData.get('time') as string,
      duration: parseInt(formData.get('duration') as string),
      type: formData.get('type') as string,
      details: formData.get('details') as string,
      location: formData.get('location') as string,
    }
    setAppointments([...appointments, newEvent])
    setIsAddingEvent(false)
  }

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newTask: Task = {
      id: tasks.length + 1,
      task: formData.get('task') as string,
      deadline: formData.get('deadline') as string,
      category: formData.get('category') as string,
      completed: false,
    }
    setTasks([...tasks, newTask])
    setIsAddingTask(false)
  }

  const handleEditTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingTask) return

    const formData = new FormData(event.currentTarget)
    const updatedTask: Task = {
      id: editingTask.id,
      task: formData.get('task') as string,
      deadline: formData.get('deadline') as string,
      category: formData.get('category') as string,
      completed: editingTask.completed,
    }
    setTasks(tasks.map(task => task.id === editingTask.id ? updatedTask : task))
    setEditingTask(null)
  }

  const handleCompleteTask = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleImportCalendar = () => {
    console.log("Importación de calendario simulada")
  }

  const handleExportCalendar = () => {
    console.log("Exportación de calendario simulada")
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Bienvenido Dr. González</h1>
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <CardTitle className="text-2xl">Calendario de Citas</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar ubicación" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => setCurrentDate(new Date())}>Hoy</Button>
                <Button variant="outline" onClick={() => setCurrentDate(addDays(currentDate, -7))}>{'<'}</Button>
                <Button variant="outline" onClick={() => setCurrentDate(addDays(currentDate, 7))}>{'>'}</Button>
                <Button onClick={() => setIsAddingEvent(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Añadir Cita
                </Button>
                <Button variant="outline" onClick={handleImportCalendar}>
                  <Upload className="mr-2 h-4 w-4" /> Importar iCal
                </Button>
                <Button variant="outline" onClick={handleExportCalendar}>
                  <Download className="mr-2 h-4 w-4" /> Exportar iCal
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-8 gap-2 mb-4">
              <div className="col-span-1"></div>
              {weekDays.map((day, index) => (
                <div key={index} className="col-span-1 text-center font-semibold">
                  <div>{day}</div>
                  <div className={`text-2xl ${isSameDay(addDays(weekStart, index), new Date()) ? 'bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto' : ''}`}>
                    {format(addDays(weekStart, index), 'd')}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative" style={{ height: '600px' }}>
              {renderTimeSlots()}
              {renderAppointments()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="mr-2" />
                {selectedEvent ? 'Detalles de la Cita' : 'Próximas Citas'}
              </div>
              {selectedEvent && (
                <Button variant="outline" size="sm" onClick={() => setEditingAppointment(selectedEvent)}>
                  <Edit className="mr-2 h-4 w-4" /> Editar
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedEvent ? (
              <div className="space-y-2">
                <p className="font-semibold">{selectedEvent.patientName}</p>
                <p>{selectedEvent.type}</p>
                <p>{format(parseISO(selectedEvent.time), 'HH:mm')} - {format(addDays(parseISO(selectedEvent.time), 0), 'HH:mm')}</p>
                <p>{selectedEvent.details}</p>
                <p className="flex items-center"><MapPin className="mr-2 h-4 w-4" /> {selectedEvent.location}</p>
                <Button variant="outline" onClick={() => setSelectedEvent(null)}>Volver a la lista</Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {filteredAppointments.slice(0, 3).map((appointment) => (
                  <li key={appointment.id} className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{appointment.patientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{appointment.patientName}</p>
                      <p className="text-sm text-gray-500">{format(parseISO(appointment.time), 'HH:mm')} - {appointment.type}</p>
                      <p className="text-sm text-gray-500 flex items-center"><MapPin className="mr-1 h-3 w-3" /> {appointment.location}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Clock className="mr-2" />
                Tareas Pendientes
              </CardTitle>
              <Button onClick={() => setIsAddingTask(true)}>
                <Plus className="mr-2 h-4 w-4" /> Añadir Tarea
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="todos">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="pacientes">Pacientes</TabsTrigger>
                <TabsTrigger value="consultorio">Consultorio</TabsTrigger>
                <TabsTrigger value="seguimiento">Seguimiento</TabsTrigger>
                <TabsTrigger value="personal">Personal</TabsTrigger>
              </TabsList>
              <TabsContent value="todos">
                <TaskList tasks={tasks} setEditingTask={setEditingTask} handleCompleteTask={handleCompleteTask} />
              </TabsContent>
              <TabsContent value="pacientes">
                <TaskList tasks={tasks.filter(t => t.category === 'pacientes')} setEditingTask={setEditingTask} handleCompleteTask={handleCompleteTask} />
              </TabsContent>
              <TabsContent value="consultorio">
                <TaskList tasks={tasks.filter(t => t.category === 'consultorio')} setEditingTask={setEditingTask} handleCompleteTask={handleCompleteTask} />
              </TabsContent>
              <TabsContent value="seguimiento">
                <TaskList tasks={tasks.filter(t => t.category === 'seguimiento')} setEditingTask={setEditingTask} handleCompleteTask={handleCompleteTask} />
              </TabsContent>
              <TabsContent value="personal">
                <TaskList tasks={tasks.filter(t => t.category === 'personal')} setEditingTask={setEditingTask} handleCompleteTask={handleCompleteTask} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir Nueva Cita</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddEvent}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="patientName" className="text-right">
                  Paciente
                </Label>
                <Input id="patientName" name="patientName" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Fecha y Hora
                </Label>
                <Input id="time" name="time" type="datetime-local" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duración (min)
                </Label>
                <Input id="duration" name="duration" type="number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Tipo
                </Label>
                <Input id="type" name="type" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="details" className="text-right">
                  Detalles
                </Label>
                <Textarea id="details" name="details" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Ubicación
                </Label>
                <select id="location" name="location" className="col-span-3">
                  {locations.slice(1).map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Añadir Cita</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir Nueva Tarea</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddTask}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="task" className="text-right">
                  Tarea
                </Label>
                <Input id="task" name="task" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deadline" className="text-right">
                  Deadline
                </Label>
                <Input id="deadline" name="deadline" type="time" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Categoría
                </Label>
                <select id="category" name="category" className="col-span-3">
                  <option value="pacientes">Pacientes</option>
                  <option value="consultorio">Consultorio</option>
                  <option value="seguimiento">Seguimiento</option>
                  <option value="personal">Personal</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Añadir Tarea</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={editingTask !== null} onOpenChange={() => setEditingTask(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Tarea</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditTask}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="task" className="text-right">
                  Tarea
                </Label>
                <Input id="task" name="task" defaultValue={editingTask?.task} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deadline" className="text-right">
                  Deadline
                </Label>
                <Input id="deadline" name="deadline" type="time" defaultValue={editingTask?.deadline} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Categoría
                </Label>
                <select id="category" name="category" defaultValue={editingTask?.category} className="col-span-3">
                  <option value="pacientes">Pacientes</option>
                  <option value="consultorio">Consultorio</option>
                  <option value="seguimiento">Seguimiento</option>
                  <option value="personal">Personal</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar Cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={editingAppointment !== null} onOpenChange={() => setEditingAppointment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Cita</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-gray-500">La funcionalidad de editar citas aún no está implementada.</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setEditingAppointment(null)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function TaskList({ tasks, setEditingTask, handleCompleteTask }: { tasks: Task[], setEditingTask: (task: Task) => void, handleCompleteTask: (id: number) => void }) {
  return (
    <ul className="space-y-4 mt-4">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => handleCompleteTask(task.id)}
            />
            <div>
              <p className={`font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.task}</p>
              <p className="text-sm text-gray-500">Antes de las {task.deadline}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setEditingTask(task)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleCompleteTask(task.id)}>
              {task.completed ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
