'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { CalendarIcon, ChevronRight, Save, Mic, Upload, UserCircle, FileText, Stethoscope, Plus, Trash2, Calendar as CalendarIconOutline, Shield } from "lucide-react"
import { addDays, formatDate } from 'date-fns'

// Definición de tipos
interface Paciente {
    id: number
    nombre: string
    fechaNacimiento: string
    genero: string
    historialMedico: string[]
}

interface Consulta {
    id: number
    pacienteId: number
    fecha: string
    motivo: string
}

interface Tratamiento {
    id: number
    nombre: string
    descripcion: string
    sesiones: number
}

interface Sesion {
    fecha: Date | null
    hora: string
    notas: string
}

interface Paso {
    titulo: string
    icono: React.ElementType
}

// Datos simulados para pacientes, consultas, tratamientos, y pasos
const pacientes: Paciente[] = [
    { id: 1, nombre: "Juan Pérez", fechaNacimiento: "1978-09-22", genero: "Masculino", historialMedico: ["2023-02-14 Tratamiento para hipertensión"] },
    { id: 2, nombre: "María García", fechaNacimiento: "1985-03-15", genero: "Femenino", historialMedico: ["2023-05-20 Tratamiento para migraña"] },
    { id: 3, nombre: "Carlos López", fechaNacimiento: "1990-11-30", genero: "Masculino", historialMedico: ["2023-08-05 Terapia física para lesión de rodilla"] },
]

const consultasPrevias: Consulta[] = [
    { id: 1, pacienteId: 1, fecha: "2023-09-15", motivo: "Dolor de espalda crónico" },
    { id: 2, pacienteId: 1, fecha: "2023-10-02", motivo: "Seguimiento hipertensión" },
    { id: 3, pacienteId: 2, fecha: "2023-11-20", motivo: "Revisión anual" },
]

const tratamientosSugeridos: Tratamiento[] = [
    { id: 1, nombre: "Fisioterapia para dolor lumbar", descripcion: "10 sesiones de terapia física, ejercicios de fortalecimiento.", sesiones: 10 },
    { id: 2, nombre: "Ajuste de medicación para hipertensión", descripcion: "Incremento de dosis de lisinopril, seguimiento en 4 semanas.", sesiones: 4 },
    { id: 3, nombre: "Plan de manejo de estrés", descripcion: "Terapia cognitivo-conductual, técnicas de relajación.", sesiones: 8 },
]

const pasos: Paso[] = [
    { titulo: "Selección de Paciente", icono: UserCircle },
    { titulo: "Análisis de Consulta", icono: FileText },
    { titulo: "Definición de Tratamiento", icono: Stethoscope },
]

export default function TratamientoMedicoMejorado() {
    const [pasoActual, setPasoActual] = useState<number>(0)
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState<Paciente | null>(null)
    const [consultaSeleccionada, setConsultaSeleccionada] = useState<Consulta | null>(null)
    const [nuevaConsulta, setNuevaConsulta] = useState<string>("")
    const [analisisConsulta, setAnalisisConsulta] = useState<string>("")
    const [tratamientoSeleccionado, setTratamientoSeleccionado] = useState<Tratamiento | null>(null)
    const [tratamientoManual, setTratamientoManual] = useState<string>("")
    const [sesiones, setSesiones] = useState<Sesion[]>([])
    const [grabandoAudio, setGrabandoAudio] = useState<boolean>(false)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)
    const audioRef = useRef<MediaRecorder | null>(null)

    // Funciones de manejo de paso
    const siguientePaso = () => setPasoActual((prev) => Math.min(prev + 1, pasos.length - 1))

    const seleccionarPaciente = (id: string) => {
        setPacienteSeleccionado(pacientes.find(p => p.id === Number(id)) || null)
        setConsultaSeleccionada(null)
    }

    const seleccionarConsulta = (id: string) => setConsultaSeleccionada(consultasPrevias.find(c => c.id === Number(id)) || null)

    const analizarConsulta = async () => {
        const textoConsulta = consultaSeleccionada ? consultaSeleccionada.motivo : nuevaConsulta
        setAnalisisConsulta(`Análisis de la consulta: ${textoConsulta}\n\nBasado en el análisis de IA, se recomienda considerar los siguientes tratamientos...`)
    }

    const seleccionarTratamiento = (tratamiento: Tratamiento) => {
        setTratamientoSeleccionado(tratamiento)
        setSesiones(generarSesiones(tratamiento.sesiones, tratamiento.nombre))
    }

    // Funciones auxiliares
    const generarSesiones = (cantidad: number, tratamientoNombre: string): Sesion[] => Array.from({ length: cantidad }, (_, i) => ({
        fecha: addDays(new Date(), i * 7),
        hora: "09:00",
        notas: `Sesión ${i + 1} de ${tratamientoNombre}`
    }))

    const actualizarSesion = (index: number, campo: keyof Sesion, valor: any) => {
        const nuevasSesiones = [...sesiones]
        nuevasSesiones[index] = { ...nuevasSesiones[index], [campo]: valor }
        setSesiones(nuevasSesiones)
    }

    const agregarSesion = () => setSesiones([...sesiones, { fecha: null, hora: "09:00", notas: "" }])

    const eliminarSesion = (index: number) => setSesiones(sesiones.filter((_, i) => i !== index))

    const guardarTratamiento = () => {
        console.log("Tratamiento guardado", {
            paciente: pacienteSeleccionado,
            consulta: consultaSeleccionada || { tipo: "nueva", descripcion: nuevaConsulta },
            tratamiento: tratamientoSeleccionado || { tipo: "manual", descripcion: tratamientoManual },
            sesiones: sesiones.filter(sesion => sesion.fecha),
            audioUrl
        })
        alert("Tratamiento guardado y sesiones agendadas con éxito")
    }

    // Manejo de grabación de audio
    const iniciarGrabacion = () => {
        setGrabandoAudio(true)
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream)
                audioRef.current = mediaRecorder
                let chunks: BlobPart[] = []

                mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
                    setAudioUrl(URL.createObjectURL(blob))
                }

                mediaRecorder.start()
            })
            .catch(err => console.error("Error al acceder al micrófono", err))
    }

    const detenerGrabacion = () => {
        setGrabandoAudio(false)
        if (audioRef.current) audioRef.current.stop()
    }

    const subirAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) setAudioUrl(URL.createObjectURL(file))
    }

    return (
        <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
            {/* Panel de Tratamiento */}
            <div className="flex-1">
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Nuevo Tratamiento</CardTitle>
                        <div className="flex mt-6 bg-white rounded-lg shadow-sm">
                            {pasos.map((paso, index) => (
                                <button
                                    key={index}
                                    className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg flex items-center justify-center ${index === pasoActual ? 'bg-primary text-primary-foreground shadow-sm' : 'text-gray-500 hover:bg-gray-100'
                                        }`}
                                    onClick={() => setPasoActual(index)}
                                >
                                    <paso.icono className="w-5 h-5 mr-2" />
                                    {paso.titulo}
                                </button>
                            ))}
                        </div>
                    </CardHeader>

                    <CardContent>
                        {/* Lógica del paso 0 */}
                        {pasoActual === 0 && (
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="paciente">Seleccionar Paciente</Label>
                                    <Select onValueChange={seleccionarPaciente}>
                                        <SelectTrigger id="paciente">
                                            <SelectValue placeholder="Seleccione un paciente" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {pacientes.map((paciente) => (
                                                <SelectItem key={paciente.id} value={paciente.id.toString()}>
                                                    {paciente.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Selección de Consulta Previa */}
                                <div>
                                    <Label htmlFor="consulta-previa">Seleccionar Consulta Previa (opcional)</Label>
                                    <Select onValueChange={seleccionarConsulta}>
                                        <SelectTrigger id="consulta-previa">
                                            <SelectValue placeholder="Nueva consulta sin cita previa" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {consultasPrevias
                                                .filter(consulta => consulta.pacienteId === (pacienteSeleccionado?.id || null))
                                                .map((consulta) => (
                                                    <SelectItem key={consulta.id} value={consulta.id.toString()}>
                                                        {consulta.fecha} - {consulta.motivo}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Nueva consulta */}
                                {!consultaSeleccionada && (
                                    <div>
                                        <Label htmlFor="nueva-consulta">Nueva consulta</Label>
                                        <Textarea
                                            id="nueva-consulta"
                                            placeholder="Describa la nueva consulta"
                                            value={nuevaConsulta}
                                            onChange={(e) => setNuevaConsulta(e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Lógica del paso 1 */}
                        {pasoActual === 1 && (
                            <div className="space-y-4">
                                <Label>Análisis de la Consulta</Label>
                                <Textarea value={analisisConsulta} readOnly rows={6} className="bg-gray-50" />
                                <div>
                                    <Label>Ampliar el tratamiento</Label>
                                    <Textarea
                                        placeholder="Añada información adicional para el tratamiento"
                                        value={tratamientoManual}
                                        onChange={(e) => setTratamientoManual(e.target.value)}
                                        rows={4}
                                    />
                                </div>

                                {/* Grabación de audio */}
                                <div className="flex space-x-2">
                                    <Button onClick={grabandoAudio ? detenerGrabacion : iniciarGrabacion} variant={grabandoAudio ? "destructive" : "secondary"}>
                                        <Mic className="mr-2 h-4 w-4" />
                                        {grabandoAudio ? 'Detener Grabación' : 'Iniciar Grabación'}
                                    </Button>
                                    <label className="flex items-center justify-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md cursor-pointer hover:bg-secondary/90">
                                        <Upload className="mr-2 h-4 w-4" />
                                        <span className="text-sm font-medium">Subir Audio</span>
                                        <input type='file' className="hidden" accept="audio/*" onChange={subirAudio} />
                                    </label>
                                </div>
                                {audioUrl && <audio src={audioUrl} controls className="w-full mt-2" />}
                                <Button onClick={analizarConsulta} className="w-full">Analizar con IA</Button>
                            </div>
                        )}

                        {/* Lógica del paso 2 */}
                        {pasoActual === 2 && (
                            <div className="space-y-4">
                                <Label>Seleccionar Tratamiento Sugerido</Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {tratamientosSugeridos.map((tratamiento) => (
                                        <Card key={tratamiento.id} className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => seleccionarTratamiento(tratamiento)}>
                                            <CardHeader>
                                                <CardTitle className="text-md">{tratamiento.nombre}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-gray-600">{tratamiento.descripcion}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                                {tratamientoSeleccionado && (
                                    <div className="mt-6 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <Label>Configuración de Sesiones</Label>
                                            <Button onClick={agregarSesion} variant="outline" size="sm">
                                                <Plus className="mr-2 h-4 w-4" /> Agregar Sesión
                                            </Button>
                                        </div>
                                        {sesiones.map((sesion, index) => (
                                            <Card key={index} className="bg-white">
                                                <CardContent className="flex items-center space-x-4 py-4">
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button variant="outline" className={cn(!sesion.fecha && "text-muted-foreground")}>
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {sesion.fecha ? formatDate(sesion.fecha, "PPP") : "Fecha"}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar
                                                                mode="single"
                                                                selected={sesion.fecha ?? undefined}  // Cambiar null a undefined
                                                                onSelect={(date) => actualizarSesion(index, 'fecha', date)}
                                                                initialFocus
                                                            />

                                                        </PopoverContent>
                                                    </Popover>
                                                    <Input
                                                        type="time"
                                                        value={sesion.hora}
                                                        onChange={(e) => actualizarSesion(index, 'hora', e.target.value)}
                                                        className="w-32"
                                                    />
                                                    <Input
                                                        placeholder="Notas"
                                                        value={sesion.notas}
                                                        onChange={(e) => actualizarSesion(index, 'notas', e.target.value)}
                                                        className="flex-1"
                                                    />
                                                    <Button variant="destructive" size="icon" onClick={() => eliminarSesion(index)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Botón Continuar o Guardar */}
                <div className="flex justify-end">
                    <Button onClick={pasoActual === pasos.length - 1 ? guardarTratamiento : siguientePaso} className="bg-primary hover:bg-primary/90">
                        {pasoActual === pasos.length - 1 ? (
                            <>
                                <Save className="mr-2 h-4 w-4" /> Guardar Tratamiento
                            </>
                        ) : (
                            <>
                                Continuar <ChevronRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Panel de Información del Paciente */}
            {pacienteSeleccionado && (
                <Card className="w-80 h-fit sticky top-6">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Información del Paciente</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <UserCircle className="h-5 w-5 text-gray-500" />
                                <span className="text-lg">{pacienteSeleccionado.nombre}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CalendarIconOutline className="h-5 w-5 text-gray-500" />
                                <span>Fecha de nacimiento: {pacienteSeleccionado.fechaNacimiento}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-gray-500" />
                                <span>Género: {pacienteSeleccionado.genero}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Información de Seguro</h3>
                            <Card className="bg-blue-50 border-blue-200">
                                <CardContent className="p-4 space-y-2">
                                    <div className="flex items-center space-x-2 text-blue-600">
                                        <Shield className="h-5 w-5" />
                                        <span className="font-semibold">Seguros Bienestar</span>
                                    </div>
                                    <p>Póliza: POL-002-2023</p>
                                    <p>Certificado: CERT-789012</p>
                                    <p>País de Atención: Panamá</p>
                                    <p>Lugar de Empleo: Corporación XYZ</p>
                                    <p>Ocupación: Contador</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Historial Médico</h3>
                            <Card>
                                <CardContent className="p-4">
                                    <ul className="list-disc pl-5 space-y-1">
                                        {pacienteSeleccionado.historialMedico.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
