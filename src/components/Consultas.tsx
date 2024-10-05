'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Mic, StopCircle, FileDown, Volume2, User, Calendar, FileText, FileCheck, Shield, Stethoscope, Clipboard, Activity, Pill, ThermometerIcon, HeartPulse, Brain, Eye, CheckCircle2, AlertTriangle, MessageCircle, Thermometer, Stethoscope as StethoscopeIcon, Pill as PillIcon, FileText as FileTextIcon, Calendar as CalendarIcon } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from 'date-fns'




type ConsultaActiva = 'seleccion-paciente' | 'grabacion-consulta' | 'revision-consulta';

interface SignosVitales {
    temperatura: string;
    presionArterial: string;
    frecuenciaCardiaca: string;
    frecuenciaRespiratoria: string;
}

interface Procedimiento {
    vacuna: string;
    lote: string;
    sitioInyeccion: string;
    reaccionesInmediatas: string;
}

interface ResumenConsulta {
    subjetivo: string;
    objetivo: string;
    evaluacion: string;
    plan: string;
    signosVitales: SignosVitales;
    procedimiento?: Procedimiento;
}

interface HistorialMedico {
    fecha: string;
    descripcion: string;
    resumen: ResumenConsulta;
}

interface Seguro {
    compania: string;
    poliza: string;
    certificado: string;
    paisAtencion: string;
    lugarEmpleo: string;
    ocupacion: string;
}

interface Cita {
    id: string;
    fecha: string;
    motivo: string;
}

interface Paciente {
    id: string;
    nombre: string;
    fechaNacimiento: string;
    genero: string;
    cedula: string;
    email: string;
    celular: string;
    historialMedico: HistorialMedico[];
    seguro: Seguro;
    citas: Cita[];
}

interface MicrofonoInfo {
    conectado: boolean;
    nombre: string;
    nivelSonido: number;
}

interface ReclamoSeguro {
    compania: string;
    poliza: string;
    certificado: string;
    paisAtencion: string;
    lugarEmpleo: string;
    ocupacion: string;
    fechaSintomas?: string;
    descripcionSintomas?: string;
    esAccidente?: boolean;
    fechaAccidente?: string;
    lugarAccidente?: string;
    descripcionAccidente?: string;
}

interface ResultadoProcesado {
    antecedentes: string;
    general: string;
    tratamientos: string;
    alergias: string;
    medicamentos: string;
    vacunas: string;
    documentos: string;
}

interface TratamientoSugerido {
    id: number;
    nombre: string;
    duracion: string;
    sesiones: string;
    descripcion: string;
}

const pacientes: Paciente[] = [
    {
        id: '1',
        nombre: 'María García',
        fechaNacimiento: '1985-03-15',
        genero: 'Femenino',
        cedula: '8-123-4567',
        email: 'maria.garcia@email.com',
        celular: '6123-4567',
        historialMedico: [
            {
                fecha: '2023-01-10',
                descripcion: 'Consulta por dolor de espalda',
                resumen: {
                    subjetivo:
                        'La paciente refiere dolor en la zona lumbar que se intensifica al estar sentada por largos períodos.',
                    objetivo:
                        'Se observa tensión muscular en la región lumbar. Rango de movimiento limitado en flexión anterior.',
                    evaluacion: 'Probable tensión muscular debido a mala postura.',
                    plan: 'Se recomienda fisioterapia, ejercicios de estiramiento y mejora de la ergonomía en el lugar de trabajo.',
                    signosVitales: {
                        temperatura: '36.5°C',
                        presionArterial: '120/80 mmHg',
                        frecuenciaCardiaca: '72 lpm',
                        frecuenciaRespiratoria: '16 rpm',
                    },
                },
            },
            {
                fecha: '2023-03-22',
                descripcion: 'Vacuna contra la gripe',
                resumen: {
                    subjetivo:
                        'Paciente acude para vacunación anual contra la gripe. No refiere síntomas actuales.',
                    objetivo:
                        'Paciente en buen estado general. No se observan contraindicaciones para la vacunación.',
                    evaluacion: 'Apto para recibir la vacuna antigripal.',
                    plan: 'Administración de vacuna antigripal estacional. Observación por 15 minutos post-vacunación.',
                    procedimiento: {
                        vacuna: 'Antigripal estacional',
                        lote: 'VG2023-456',
                        sitioInyeccion: 'Deltoides izquierdo',
                        reaccionesInmediatas: 'Ninguna',
                    },
                    signosVitales: {
                        temperatura: '36.7°C',
                        presionArterial: '118/78 mmHg',
                        frecuenciaCardiaca: '70 lpm',
                        frecuenciaRespiratoria: '14 rpm',
                    },
                },
            },
        ],
        seguro: {
            compania: 'Seguros Confianza',
            poliza: 'POL-001-2023',
            certificado: 'CERT-123456',
            paisAtencion: 'Panamá',
            lugarEmpleo: 'Empresa ABC',
            ocupacion: 'Ingeniera de Software',
        },
        citas: [
            { id: '1', fecha: '2023-09-15', motivo: 'Revisión anual' },
            { id: '2', fecha: '2023-10-01', motivo: 'Seguimiento dolor de espalda' },
        ],
    },
    {
        id: '2',
        nombre: 'Juan Pérez',
        fechaNacimiento: '1978-09-22',
        genero: 'Masculino',
        cedula: '3-987-6543',
        email: 'juan.perez@email.com',
        celular: '6987-6543',
        historialMedico: [
            {
                fecha: '2023-02-14',
                descripcion: 'Tratamiento para hipertensión',
                resumen: {
                    subjetivo: 'Paciente refiere episodios de mareo y dolor de cabeza.',
                    objetivo: 'PA: 150/95 mmHg, FC: 78 lpm, Peso: 82 kg',
                    evaluacion: 'Hipertensión arterial no controlada',
                    plan: 'Se ajusta medicación. Se prescribe Losartán 50 mg/día. Control en 2 semanas.',
                    signosVitales: {
                        temperatura: '36.8°C',
                        presionArterial: '150/95 mmHg',
                        frecuenciaCardiaca: '78 lpm',
                        frecuenciaRespiratoria: '18 rpm',
                    },
                },
            },
        ],
        seguro: {
            compania: 'Seguros Bienestar',
            poliza: 'POL-002-2023',
            certificado: 'CERT-789012',
            paisAtencion: 'Panamá',
            lugarEmpleo: 'Corporación XYZ',
            ocupacion: 'Contador',
        },
        citas: [
            { id: '1', fecha: '2023-09-20', motivo: 'Control de presión arterial' },
            { id: '2', fecha: '2023-10-05', motivo: 'Exámenes de laboratorio' },
        ],
    },
];

export default function ModuloConsultas() {
    const [consultaActiva, setConsultaActiva] = useState<ConsultaActiva>('seleccion-paciente');
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState<string>('');
    const [consultaPrevia, setConsultaPrevia] = useState<string>('nueva');
    const [citaSeleccionada, setCitaSeleccionada] = useState<string>('nueva');
    const [grabando, setGrabando] = useState<boolean>(false);
    const [consultaTexto, setConsultaTexto] = useState<string>('');
    const [formatoConsulta, setFormatoConsulta] = useState<'soap' | 'indicaciones' | 'general'>('soap');
    const [microfonoInfo, setMicrofonoInfo] = useState<MicrofonoInfo>({
        conectado: false,
        nombre: '',
        nivelSonido: 0,
    });
    const [reclamoSeguro, setReclamoSeguro] = useState<ReclamoSeguro>({
        compania: '',
        poliza: '',
        certificado: '',
        paisAtencion: '',
        lugarEmpleo: '',
        ocupacion: '',
    });
    const [transcripcionCompleta, setTranscripcionCompleta] = useState<string>('');
    const [consultaConfirmada, setConsultaConfirmada] = useState<boolean>(false);
    const [resultadosProcesados, setResultadosProcesados] = useState<ResultadoProcesado>({
        antecedentes: '',
        general: '',
        tratamientos: '',
        alergias: '',
        medicamentos: '',
        vacunas: '',
        documentos: '',
    });
    const [seccionesSeleccionadas, setSeccionesSeleccionadas] = useState<Record<string, boolean>>({
        antecedentes: false,
        general: false,
        tratamientos: false,
        alergias: false,
        medicamentos: false,
        vacunas: false,
        documentos: false,
    });
    const [citaSugerida, setCitaSugerida] = useState<{ fecha: Date; motivo: string } | null>(null);
    const [tratamientosSugeridos, setTratamientosSugeridos] = useState<TratamientoSugerido[]>([]);
    const [tratamientosConfirmados, setTratamientosConfirmados] = useState<Record<number, boolean>>({});

    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const audioContext = useRef<AudioContext | null>(null);
    const analyser = useRef<AnalyserNode | null>(null);
    const audioChunks = useRef<Blob[]>([]);

    useEffect(() => {
        if (grabando) {
            const updateMicrophoneLevel = () => {
                if (analyser.current) {
                    const dataArray = new Uint8Array(analyser.current.frequencyBinCount);
                    analyser.current.getByteFrequencyData(dataArray);
                    const level = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
                    setMicrofonoInfo((prev) => ({ ...prev, nivelSonido: level }));
                }
                requestAnimationFrame(updateMicrophoneLevel);
            };
            updateMicrophoneLevel();
        }
    }, [grabando]);

    useEffect(() => {
        if (pacienteSeleccionado) {
            const paciente = pacientes.find((p) => p.id === pacienteSeleccionado);
            if (paciente && paciente.seguro) {
                setReclamoSeguro({
                    ...reclamoSeguro,
                    ...paciente.seguro,
                });
            }
        }
    }, [pacienteSeleccionado]);

    const iniciarGrabacion = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);

            audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            analyser.current = audioContext.current.createAnalyser();
            const source = audioContext.current.createMediaStreamSource(stream);
            source.connect(analyser.current);

            const tracks = stream.getAudioTracks();
            if (tracks.length > 0) {
                setMicrofonoInfo((prev) => ({ ...prev, conectado: true, nombre: tracks[0].label }));
            }

            mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
                audioChunks.current.push(event.data);
            };

            mediaRecorder.current.onstop = procesarAudio;

            audioChunks.current = [];
            mediaRecorder.current.start();
            setGrabando(true);
        } catch (error) {
            console.error('Error al iniciar la grabación:', error);
            setMicrofonoInfo((prev) => ({
                ...prev,
                conectado: false,
                nombre: 'No se pudo acceder al micrófono',
            }));
        }
    };

    const detenerGrabacion = () => {
        if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
            mediaRecorder.current.stop();
            setGrabando(false);
        }
    };

    const procesarAudio = async () => {
        let consultaSimulada = '';
        const paciente = pacientes.find((p) => p.id === pacienteSeleccionado)?.nombre || '';

        switch (formatoConsulta) {
            case 'soap':
                consultaSimulada = `
S (Subjetivo):
El paciente ${paciente} reporta dolor de cabeza y fatiga.

O (Objetivo):
- Temperatura: 37.2°C
- Presión arterial: 120/80 mmHg
- Frecuencia cardíaca: 72 bpm

A (Evaluación):
Posible caso de gripe estacional.

P (Plan):
- Reposo en casa por 3 días
- Hidratación abundante
- Paracetamol 500mg cada 8 horas si hay fiebre
- Seguimiento telefónico en 48 horas
        `;
                break;
            case 'indicaciones':
                consultaSimulada = `
Indicaciones para ${paciente}:

1. Reposo en cama durante 3 días.
2. Beber al menos 2 litros de agua al día.
3. Tomar paracetamol 500mg cada 8 horas si la temperatura supera los 38°C.
4. Evitar actividades físicas intensas durante una semana.
5. Llamar al consultorio si los síntomas empeoran o no mejoran en 48 horas.
6. Programar una cita de seguimiento en 7 días.
        `;
                break;
            case 'general':
                consultaSimulada = `
Consulta general para ${paciente}:

Motivo de la consulta: Dolor de cabeza y fatiga

Observaciones:
- El paciente presenta síntomas consistentes con un cuadro gripal.
- No se observan signos de complicaciones.

Recomendaciones:
- Se sugiere tratamiento sintomático y reposo.
- Monitorear la evolución de los síntomas.
- Se proporciona receta para medicamentos paliativos.

Próximos pasos:
- Seguimiento telefónico en 48 horas.
- El paciente debe volver a consulta si los síntomas persisten más de una semana.
        `;
                break;
        }

        setConsultaTexto(consultaSimulada);

        // Simular transcripción completa
        setTranscripcionCompleta(`
Doctor: Buenas tardes, ${paciente}. ¿Cómo se siente hoy?
Paciente: Buenas tardes, doctor. No me siento muy bien. Tengo dolor de cabeza y me siento muy cansado.
Doctor: Entiendo. ¿Desde cuándo tiene estos síntomas?
Paciente: Empezaron ayer por la tarde.
Doctor: ¿Ha tenido fiebre?
Paciente: No estoy seguro, pero me he sentido un poco caliente.
Doctor: Bien, vamos a revisarlo. [Pausa para examen] Su temperatura es de 37.2°C, lo cual es ligeramente elevado. Su presión arterial y frecuencia cardíaca están normales.
Paciente: ¿Qué cree que pueda ser, doctor?
Doctor: Basado en sus síntomas y el examen físico, parece ser un caso de gripe estacional. Vamos a tratarlo de forma sintomática.
Paciente: ¿Qué debo hacer?
Doctor: Le recomiendo reposo en casa por 3 días, hidratación abundante, y tomar paracetamol 500mg cada 8 horas si tiene fiebre. Si los síntomas empeoran o no mejoran en 48 horas, por favor llame al consultorio.
Paciente: Entendido, doctor. ¿Cuándo debo volver?
Doctor: Haremos un seguimiento telefónico en 48 horas. Si todo va bien, no será necesario que venga, pero si los síntomas persisten más de una semana, deberá volver a consulta.
Paciente: Muchas gracias, doctor.
Doctor: De nada. Cuídese y que se mejore pronto.
    `);

        // Simular procesamiento de IA
        const resultadosIA = simularProcesamientoIA(transcripcionCompleta);
        setResultadosProcesados(resultadosIA.secciones);
        setCitaSugerida(resultadosIA.citaSugerida);
        setTratamientosSugeridos(resultadosIA.tratamientosSugeridos);
        setTratamientosConfirmados(
            resultadosIA.tratamientosSugeridos.reduce((acc, t) => ({ ...acc, [t.id]: false }), {})
        );

        setConsultaActiva('revision-consulta');
    };

    const simularProcesamientoIA = (transcripcion: string) => {
        // Esta función simularía el procesamiento de IA en un escenario real
        return {
            secciones: {
                antecedentes: 'El paciente reporta antecedentes de hipertensión en la familia.',
                general: 'Paciente presenta síntomas de gripe estacional.',
                tratamientos: 'Se sugiere reposo y medicación sintomática.',
                alergias: 'No se detectaron nuevas alergias.',
                medicamentos: 'Se recomienda paracetamol 500mg cada 8 horas.',
                vacunas: 'Se sugiere actualizar la vacuna contra la influenza.',
                documentos: 'Se generó una receta para los medicamentos recomendados.',
            },
            citaSugerida: {
                fecha: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                motivo: 'Seguimiento de síntomas gripales',
            },
            tratamientosSugeridos: [
                {
                    id: 1,
                    nombre: 'Terapia de rehabilitación pulmonar',
                    duracion: '3 meses',
                    sesiones: '12',
                    descripcion: 'Sesiones semanales para mejorar la capacidad respiratoria.',
                },
                {
                    id: 2,
                    nombre: 'Programa de control de peso',
                    duracion: '6 meses',
                    sesiones: '24',
                    descripcion: 'Plan nutricional y de ejercicios personalizado.',
                },
                {
                    id: 3,
                    nombre: 'Terapia cognitivo-conductual',
                    duracion: '3 meses',
                    sesiones: '12',
                    descripcion: 'Para manejo del estrés y ansiedad asociados a la condición médica.',
                },
            ],
        };
    };

    const exportarAEMR = () => {
        const contenido = `
Fecha: ${new Date().toLocaleString()}
Paciente: ${pacientes.find((p) => p.id === pacienteSeleccionado)?.nombre}
Formato: ${formatoConsulta.toUpperCase()}

${consultaTexto}

Transcripción completa:
${transcripcionCompleta}

Resultados procesados:
${Object.entries(resultadosProcesados)
                .filter(([key, _]) => seccionesSeleccionadas[key])
                .map(
                    ([key, value]) => `${key.toUpperCase()}:
${value}
`
                )
                .join('\n')}

Cita sugerida: ${citaSugerida
                ? `${format(citaSugerida.fecha, 'dd/MM/yyyy')} - ${citaSugerida.motivo}`
                : 'No se sugirió cita'
            }

Tratamientos sugeridos:
${tratamientosSugeridos
                .map((t) => `- ${t.nombre}: ${t.duracion}, ${t.sesiones} sesiones`)
                .join('\n')}
    `;
        const blob = new Blob([contenido], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `consulta_${pacienteSeleccionado}_${new Date().toISOString()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const generarReclamoSeguro = () => {
        // Aquí se generaría el reclamo de seguro real
        console.log('Generando reclamo de seguro:', reclamoSeguro);
        // En una implementación real, aquí se enviaría la información a un servidor o se generaría un PDF
    };

    const confirmarConsulta = () => {
        setConsultaConfirmada(true);
        // Aquí se añadiría la lógica para guardar la consulta en el historial médico del paciente
        console.log('Consulta confirmada y añadida al historial médico');
        console.log('Secciones seleccionadas:', seccionesSeleccionadas);
        console.log(
            'Tratamientos confirmados:',
            Object.entries(tratamientosConfirmados)
                .filter(([_, v]) => v)
                .map(([k, _]) => tratamientosSugeridos.find((t) => t.id.toString() === k))
        );
    };

    const actualizarTratamiento = (
        id: number,
        campo: keyof TratamientoSugerido,
        valor: string
    ) => {
        setTratamientosSugeridos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, [campo]: valor } : t))
        );
    };

    const enviarTratamientosAModulo = () => {
        const tratamientosConfirmadosData = tratamientosSugeridos.filter(
            (t) => tratamientosConfirmados[t.id]
        );
        console.log('Enviando tratamientos al módulo:', tratamientosConfirmadosData);
        // Aquí iría la lógica para enviar los tratamientos al módulo correspondiente
    };

    const pacienteActual = pacientes.find((p) => p.id === pacienteSeleccionado);

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 p-4 overflow-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-green-600">Nueva Consulta</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs
                            value={consultaActiva}
                            onValueChange={(value: string) => setConsultaActiva(value as ConsultaActiva)}
                        >
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="seleccion-paciente">1. Selección de Paciente</TabsTrigger>
                                <TabsTrigger value="grabacion-consulta">2. Grabación de Consulta</TabsTrigger>
                                <TabsTrigger value="revision-consulta">3. Revisión de Consulta</TabsTrigger>
                            </TabsList>

                            {/* Pestaña de Selección de Paciente */}
                            <TabsContent value="seleccion-paciente">
                                <div className="space-y-4 mt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="paciente-select">Seleccionar Paciente</Label>
                                        <Select onValueChange={setPacienteSeleccionado} value={pacienteSeleccionado}>
                                            <SelectTrigger id="paciente-select">
                                                <SelectValue placeholder="Seleccione un paciente" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {pacientes.map((paciente) => (
                                                    <SelectItem key={paciente.id} value={paciente.id}>
                                                        {paciente.nombre}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    {pacienteSeleccionado && (
                                        <>
                                            <div className="space-y-2">
                                                <Label htmlFor="cita-select">Seleccionar Cita Creada (opcional)</Label>
                                                <Select onValueChange={setCitaSeleccionada} value={citaSeleccionada}>
                                                    <SelectTrigger id="cita-select">
                                                        <SelectValue placeholder="Seleccione una cita" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="nueva">Nueva consulta sin cita previa</SelectItem>
                                                        {pacienteActual?.citas.map((cita) => (
                                                            <SelectItem key={cita.id} value={cita.id}>
                                                                {format(new Date(cita.fecha), 'dd/MM/yyyy')} - {cita.motivo}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="consulta-previa-select">
                                                    Seleccionar Consulta Previa (opcional)
                                                </Label>
                                                <Select onValueChange={setConsultaPrevia} value={consultaPrevia}>
                                                    <SelectTrigger id="consulta-previa-select">
                                                        <SelectValue placeholder="Seleccione una consulta previa" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="nueva">Nueva consulta</SelectItem>
                                                        {pacienteActual?.historialMedico.map((consulta, index) => (
                                                            <SelectItem key={index} value={index.toString()}>
                                                                {consulta.fecha} - {consulta.descripcion}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </>
                                    )}
                                    <div className="space-y-2">
                                        <Label>Formato de Consulta</Label>
                                        <RadioGroup defaultValue="soap" >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="soap" id="soap" />
                                                <Label htmlFor="soap">SOAP</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="indicaciones" id="indicaciones" />
                                                <Label htmlFor="indicaciones">Indicaciones</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="general" id="general" />
                                                <Label htmlFor="general">General</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    <Button
                                        onClick={() => setConsultaActiva('grabacion-consulta')}
                                        disabled={!pacienteSeleccionado}
                                    >
                                        Continuar a Grabación
                                    </Button>
                                </div>
                            </TabsContent>

                            {/* Pestaña de Grabación de Consulta */}
                            <TabsContent value="grabacion-consulta">
                                <div className="space-y-4 mt-4">
                                    <p className="text-lg font-medium">
                                        Paciente seleccionado:{' '}
                                        {pacientes.find((p) => p.id === pacienteSeleccionado)?.nombre}
                                    </p>
                                    {citaSeleccionada !== 'nueva' && (
                                        <p className="text-md">
                                            Cita seleccionada:{' '}
                                            {pacienteActual?.citas.find((c) => c.id === citaSeleccionada)?.motivo}
                                        </p>
                                    )}
                                    {consultaPrevia !== 'nueva' && (
                                        <p className="text-md">
                                            Consulta previa seleccionada:{' '}
                                            {
                                                pacienteActual?.historialMedico[parseInt(consultaPrevia)]?.descripcion
                                            }
                                        </p>
                                    )}
                                    <Alert>
                                        <AlertTitle>Instrucciones para la grabación</AlertTitle>
                                        <AlertDescription>
                                            <p>
                                                Para una detección precisa del historial médico, asegúrese de discutir los
                                                siguientes puntos durante la consulta:
                                            </p>
                                            <ul className="list-none space-y-2 mt-2">
                                                <li className="flex items-center">
                                                    <MessageCircle className="mr-2 h-5 w-5 text-blue-500" />
                                                    <span>Motivo principal de la consulta</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <Thermometer className="mr-2 h-5 w-5 text-red-500" />
                                                    <span>Síntomas actuales y su duración</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <FileTextIcon className="mr-2 h-5 w-5 text-green-500" />
                                                    <span>Historial médico relevante</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <PillIcon className="mr-2 h-5 w-5 text-purple-500" />
                                                    <span>Medicamentos actuales</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                                                    <span>Alergias conocidas</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <Clipboard className="mr-2 h-5 w-5 text-indigo-500" />
                                                    <span>Resultados de exámenes recientes (si aplica)</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <StethoscopeIcon className="mr-2 h-5 w-5 text-teal-500" />
                                                    <span>Plan de tratamiento y seguimiento</span>
                                                </li>
                                            </ul>
                                        </AlertDescription>
                                    </Alert>
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Volume2
                                                className={`h-6 w-6 ${microfonoInfo.conectado ? 'text-green-500' : 'text-red-500'
                                                    }`}
                                            />
                                            <span>
                                                {microfonoInfo.conectado
                                                    ? microfonoInfo.nombre
                                                    : 'Micrófono no conectado'}
                                            </span>
                                        </div>
                                        {grabando && (
                                            <div className="w-full max-w-xs">
                                                <Label>Nivel de sonido</Label>
                                                <Progress value={microfonoInfo.nivelSonido} className="w-full" />
                                            </div>
                                        )}
                                        <div className="flex justify-center space-x-4">
                                            <Button
                                                onClick={iniciarGrabacion}
                                                disabled={grabando}
                                                className="bg-green-500 hover:bg-green-600"
                                            >
                                                <Mic className="mr-2 h-4 w-4" /> Iniciar Grabación
                                            </Button>
                                            <Button
                                                onClick={detenerGrabacion}
                                                disabled={!grabando}
                                                className="bg-red-500 hover:bg-red-600"
                                            >
                                                <StopCircle className="mr-2 h-4 w-4" /> Detener Grabación
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Pestaña de Revisión de Consulta */}
                            <TabsContent value="revision-consulta">
                                <div className="space-y-4 mt-4">
                                    <Alert >
                                        <AlertTriangle className="h-4 w-4" />
                                        <AlertTitle>Advertencia</AlertTitle>
                                        <AlertDescription>
                                            Todos los resultados procesados por la IA deben ser valorados y confirmados
                                            por el doctor. No nos hacemos responsables por diagnósticos imprecisos o
                                            erróneos.
                                        </AlertDescription>
                                    </Alert>

                                    <Tabs defaultValue="antecedentes">
                                        <TabsList>
                                            <TabsTrigger value="antecedentes">Antecedentes</TabsTrigger>
                                            <TabsTrigger value="general">General</TabsTrigger>
                                            <TabsTrigger value="tratamientos">Tratamientos</TabsTrigger>
                                            <TabsTrigger value="alergias">Alergias</TabsTrigger>
                                            <TabsTrigger value="medicamentos">Medicamentos</TabsTrigger>
                                            <TabsTrigger value="vacunas">Vacunas</TabsTrigger>
                                            <TabsTrigger value="documentos">Documentos</TabsTrigger>
                                        </TabsList>
                                        {Object.entries(resultadosProcesados).map(([key, value]) => (
                                            <TabsContent key={key} value={key}>
                                                <div className="space-y-2">
                                                    <Label htmlFor={`${key}-texto`}>
                                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                                    </Label>
                                                    <Textarea
                                                        id={`${key}-texto`}
                                                        value={value}
                                                        onChange={(e) =>
                                                            setResultadosProcesados({
                                                                ...resultadosProcesados,
                                                                [key]: e.target.value,
                                                            })
                                                        }
                                                        className="h-32 resize-none"
                                                    />
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`${key}-checkbox`}
                                                            checked={seccionesSeleccionadas[key]}
                                                            onCheckedChange={(checked) =>
                                                                setSeccionesSeleccionadas({
                                                                    ...seccionesSeleccionadas,
                                                                    [key]: checked as boolean,
                                                                })
                                                            }
                                                        />
                                                        <Label htmlFor={`${key}-checkbox`}>Añadir al expediente médico</Label>
                                                    </div>
                                                </div>
                                            </TabsContent>
                                        ))}
                                    </Tabs>

                                    {citaSugerida && (
                                        <div className="mt-4 p-4 bg-blue-50 rounded-md">
                                            <h3 className="font-semibold text-lg mb-2">Cita de Seguimiento Sugerida</h3>
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <CalendarIcon className="h-5 w-5 text-blue-500" />
                                                    <Input
                                                        type="date"
                                                        value={format(citaSugerida.fecha, 'yyyy-MM-dd')}
                                                        onChange={(e) =>
                                                            setCitaSugerida({
                                                                ...citaSugerida,
                                                                fecha: new Date(e.target.value),
                                                            } as { fecha: Date; motivo: string })
                                                        }
                                                    />
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <MessageCircle className="h-5 w-5 text-blue-500" />
                                                    <Input
                                                        value={citaSugerida.motivo}
                                                        onChange={(e) =>
                                                            setCitaSugerida({
                                                                ...citaSugerida,
                                                                motivo: e.target.value,
                                                            } as { fecha: Date; motivo: string })
                                                        }
                                                        placeholder="Motivo de la cita"
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() => console.log('Cita confirmada:', citaSugerida)}
                                                className="mt-2"
                                            >
                                                Confirmar Cita
                                            </Button>
                                        </div>
                                    )}

                                    {tratamientosSugeridos.length > 0 && (
                                        <div className="mt-4 p-4 bg-green-50 rounded-md">
                                            <h3 className="font-semibold text-lg mb-2">Tratamientos Sugeridos</h3>
                                            <ul className="space-y-4">
                                                {tratamientosSugeridos.map((tratamiento) => (
                                                    <li key={tratamiento.id} className="space-y-2">
                                                        <div className="flex items-start space-x-2">
                                                            <Checkbox
                                                                id={`tratamiento-${tratamiento.id}`}
                                                                checked={tratamientosConfirmados[tratamiento.id]}
                                                                onCheckedChange={(checked) =>
                                                                    setTratamientosConfirmados({
                                                                        ...tratamientosConfirmados,
                                                                        [tratamiento.id]: checked as boolean,
                                                                    })
                                                                }
                                                            />
                                                            <div className="flex-grow">
                                                                <Input
                                                                    value={tratamiento.nombre}
                                                                    onChange={(e) =>
                                                                        actualizarTratamiento(
                                                                            tratamiento.id,
                                                                            'nombre',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="font-medium mb-1"
                                                                />
                                                                <div className="flex space-x-2">
                                                                    <Input
                                                                        value={tratamiento.duracion}
                                                                        onChange={(e) =>
                                                                            actualizarTratamiento(
                                                                                tratamiento.id,
                                                                                'duracion',
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        placeholder="Duración"
                                                                        className="w-1/3"
                                                                    />
                                                                    <Input
                                                                        value={tratamiento.sesiones}
                                                                        onChange={(e) =>
                                                                            actualizarTratamiento(
                                                                                tratamiento.id,
                                                                                'sesiones',
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        placeholder="Sesiones"
                                                                        className="w-1/3"
                                                                    />
                                                                </div>
                                                                <Textarea
                                                                    value={tratamiento.descripcion}
                                                                    onChange={(e) =>
                                                                        actualizarTratamiento(
                                                                            tratamiento.id,
                                                                            'descripcion',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    placeholder="Descripción"
                                                                    className="mt-1"
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                            <Button onClick={enviarTratamientosAModulo} className="mt-4">
                                                Enviar Tratamientos al Módulo
                                            </Button>
                                        </div>
                                    )}

                                    <div className="flex justify-between mt-4">
                                        <Button onClick={exportarAEMR} className="bg-blue-500 hover:bg-blue-600">
                                            <FileDown className="mr-2 h-4 w-4" /> Exportar a EMR
                                        </Button>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button className="bg-yellow-500 hover:bg-yellow-600">
                                                    <FileCheck className="mr-2 h-4 w-4" /> Generar Reclamo de Seguro
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Formulario de Reclamo de Seguro</DialogTitle>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="compania" className="text-right">
                                                            Compañía de Seguros
                                                        </Label>
                                                        <Input
                                                            id="compania"
                                                            value={reclamoSeguro.compania}
                                                            onChange={(e) =>
                                                                setReclamoSeguro({
                                                                    ...reclamoSeguro,
                                                                    compania: e.target.value,
                                                                })
                                                            }
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="poliza" className="text-right">
                                                            Número de Póliza
                                                        </Label>
                                                        <Input
                                                            id="poliza"
                                                            value={reclamoSeguro.poliza}
                                                            onChange={(e) =>
                                                                setReclamoSeguro({
                                                                    ...reclamoSeguro,
                                                                    poliza: e.target.value,
                                                                })
                                                            }
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="certificado" className="text-right">
                                                            Nº Certificado
                                                        </Label>
                                                        <Input
                                                            id="certificado"
                                                            value={reclamoSeguro.certificado}
                                                            onChange={(e) =>
                                                                setReclamoSeguro({
                                                                    ...reclamoSeguro,
                                                                    certificado: e.target.value,
                                                                })
                                                            }
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="paisAtencion" className="text-right">
                                                            País de Atención
                                                        </Label>
                                                        <Input
                                                            id="paisAtencion"
                                                            value={reclamoSeguro.paisAtencion}
                                                            onChange={(e) =>
                                                                setReclamoSeguro({
                                                                    ...reclamoSeguro,
                                                                    paisAtencion: e.target.value,
                                                                })
                                                            }
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="lugarEmpleo" className="text-right">
                                                            Lugar de Empleo
                                                        </Label>
                                                        <Input
                                                            id="lugarEmpleo"
                                                            value={reclamoSeguro.lugarEmpleo}
                                                            onChange={(e) =>
                                                                setReclamoSeguro({
                                                                    ...reclamoSeguro,
                                                                    lugarEmpleo: e.target.value,
                                                                })
                                                            }
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="ocupacion" className="text-right">
                                                            Ocupación
                                                        </Label>
                                                        <Input
                                                            id="ocupacion"
                                                            value={reclamoSeguro.ocupacion}
                                                            onChange={(e) =>
                                                                setReclamoSeguro({
                                                                    ...reclamoSeguro,
                                                                    ocupacion: e.target.value,
                                                                })
                                                            }
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                </div>
                                                <Button onClick={generarReclamoSeguro}>Generar Reclamo</Button>
                                            </DialogContent>
                                        </Dialog>
                                        <Button
                                            onClick={confirmarConsulta}
                                            className="bg-green-500 hover:bg-green-600"
                                        >
                                            <CheckCircle2 className="mr-2 h-4 w-4" /> Confirmar y Guardar Consulta
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            <div className="w-80 bg-white p-4 shadow-lg overflow-auto">
                <h2 className="text-xl font-bold mb-4">Información del Paciente</h2>
                {pacienteActual ? (
                    <>
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <User className="mr-2 h-5 w-5 text-gray-500" />
                                <span className="font-medium">{pacienteActual.nombre}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                                <span>Fecha de nacimiento: {pacienteActual.fechaNacimiento}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <FileText className="mr-2 h-5 w-5 text-gray-500" />
                                <span>Género: {pacienteActual.genero}</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Información de Seguro</h3>
                            <div className="bg-blue-50 p-3 rounded-md">
                                <div className="flex items-center mb-2">
                                    <Shield className="mr-2 h-5 w-5 text-blue-500" />
                                    <span className="font-medium text-blue-700">{pacienteActual.seguro.compania}</span>
                                </div>
                                <p className="text-sm text-blue-600">Póliza: {pacienteActual.seguro.poliza}</p>
                                <p className="text-sm text-blue-600">Certificado: {pacienteActual.seguro.certificado}</p>
                                <p className="text-sm text-blue-600">País de Atención: {pacienteActual.seguro.paisAtencion}</p>
                                <p className="text-sm text-blue-600">Lugar de Empleo: {pacienteActual.seguro.lugarEmpleo}</p>
                                <p className="text-sm text-blue-600">Ocupación: {pacienteActual.seguro.ocupacion}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Historial Médico</h3>
                            <ScrollArea className="h-64 rounded border p-2">
                                {pacienteActual.historialMedico.map((registro, index) => (
                                    <div key={index} className="mb-2 pb-2 border-b last:border-b-0">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="link" className="p-0 h-auto">
                                                    <p className="font-medium text-left">{registro.fecha}</p>
                                                    <p className="text-sm text-gray-600 text-left">{registro.descripcion}</p>
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[700px]">
                                                <DialogHeader>
                                                    <DialogTitle>Resumen de Consulta</DialogTitle>
                                                </DialogHeader>
                                                <div className="mt-2">
                                                    <h4 className="font-semibold">Fecha: {registro.fecha}</h4>
                                                    <h4 className="font-semibold mt-2">Motivo: {registro.descripcion}</h4>
                                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                                        <div className="space-y-2">
                                                            <div className="flex items-center">
                                                                <Stethoscope className="h-5 w-5 mr-2 text-blue-500" />
                                                                <h5 className="font-semibold">Subjetivo</h5>
                                                            </div>
                                                            <p className="text-sm">{registro.resumen.subjetivo}</p>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="flex items-center">
                                                                <Clipboard className="h-5 w-5 mr-2 text-green-500" />
                                                                <h5 className="font-semibold">Objetivo</h5>
                                                            </div>
                                                            <p className="text-sm">{registro.resumen.objetivo}</p>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="flex items-center">
                                                                <Brain className="h-5 w-5 mr-2 text-purple-500" />
                                                                <h5 className="font-semibold">Evaluación</h5>
                                                            </div>
                                                            <p className="text-sm">{registro.resumen.evaluacion}</p>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="flex items-center">
                                                                <Clipboard className="h-5 w-5 mr-2 text-red-500" />
                                                                <h5 className="font-semibold">Plan</h5>
                                                            </div>
                                                            <p className="text-sm">{registro.resumen.plan}</p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4">
                                                        <div className="flex items-center mb-2">
                                                            <Activity className="h-5 w-5 mr-2 text-yellow-500" />
                                                            <h5 className="font-semibold">Signos Vitales</h5>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="flex items-center">
                                                                <ThermometerIcon className="h-4 w-4 mr-1 text-red-400" />
                                                                <span className="text-sm">Temperatura: {registro.resumen.signosVitales.temperatura}</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <HeartPulse className="h-4 w-4 mr-1 text-red-400" />
                                                                <span className="text-sm">Presión Arterial: {registro.resumen.signosVitales.presionArterial}</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Activity className="h-4 w-4 mr-1 text-red-400" />
                                                                <span className="text-sm">Frecuencia Cardíaca: {registro.resumen.signosVitales.frecuenciaCardiaca}</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Stethoscope className="h-4 w-4 mr-1 text-red-400" />
                                                                <span className="text-sm">Frecuencia Respiratoria: {registro.resumen.signosVitales.frecuenciaRespiratoria}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {registro.resumen.procedimiento && (
                                                        <div className="mt-4">
                                                            <div className="flex items-center mb-2">
                                                                <Pill className="h-5 w-5 mr-2 text-indigo-500" />
                                                                <h5 className="font-semibold">Procedimiento</h5>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-2">
                                                                <p className="text-sm"><span className="font-medium">Vacuna:</span> {registro.resumen.procedimiento.vacuna}</p>
                                                                <p className="text-sm"><span className="font-medium">Lote:</span> {registro.resumen.procedimiento.lote}</p>
                                                                <p className="text-sm"><span className="font-medium">Sitio de Inyección:</span> {registro.resumen.procedimiento.sitioInyeccion}</p>
                                                                <p className="text-sm"><span className="font-medium">Reacciones Inmediatas:</span> {registro.resumen.procedimiento.reaccionesInmediatas}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {registro.resumen && (
                                                        <div className="mt-4">
                                                            <div className="flex items-center mb-2">
                                                                <Eye className="h-5 w-5 mr-2 text-cyan-500" />
                                                                <h5 className="font-semibold">Resultados de Laboratorio</h5>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-2">

                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                ))}
                            </ScrollArea>
                        </div>
                    </>
                ) : (
                    <p>Seleccione un paciente para ver su información.</p>
                )}
                <div className="mt-4">
                    <h3 className="font-semibold mb-2">Fecha Actual</h3>
                    <p>{new Date().toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    )
}
