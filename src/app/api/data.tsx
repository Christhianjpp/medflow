export const pacientes = [
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
                    subjetivo: 'La paciente refiere dolor en la zona lumbar que se intensifica al estar sentada por largos períodos.',
                    objetivo: 'Se observa tensión muscular en la región lumbar. Rango de movimiento limitado en flexión anterior.',
                    evaluacion: 'Probable tensión muscular debido a mala postura.',
                    plan: 'Se recomienda fisioterapia, ejercicios de estiramiento y mejora de la ergonomía en el lugar de trabajo.',
                    signosVitales: {
                        temperatura: '36.5°C',
                        presionArterial: '120/80 mmHg',
                        frecuenciaCardiaca: '72 lpm',
                        frecuenciaRespiratoria: '16 rpm'
                    }
                }
            },
            {
                fecha: '2023-03-22',
                descripcion: 'Vacuna contra la gripe',
                resumen: {
                    subjetivo: 'Paciente acude para vacunación anual contra la gripe. No refiere síntomas actuales.',
                    objetivo: 'Paciente en buen estado general. No se observan contraindicaciones para la vacunación.',
                    evaluacion: 'Apto para recibir la vacuna antigripal.',
                    plan: 'Administración de vacuna antigripal estacional. Observación por 15 minutos post-vacunación.',
                    procedimiento: {
                        vacuna: 'Antigripal estacional',
                        lote: 'VG2023-456',
                        sitioInyeccion: 'Deltoides izquierdo',
                        reaccionesInmediatas: 'Ninguna'
                    },
                    signosVitales: {
                        temperatura: '36.7°C',
                        presionArterial: '118/78 mmHg',
                        frecuenciaCardiaca: '70 lpm',
                        frecuenciaRespiratoria: '14 rpm'
                    }
                }
            },
        ],
        seguro: {
            compania: 'Seguros Confianza',
            poliza: 'POL-001-2023',
            certificado: 'CERT-123456',
            paisAtencion: 'Panamá',
            lugarEmpleo: 'Empresa ABC',
            ocupacion: 'Ingeniera de Software'
        },
        citas: [
            { id: '1', fecha: '2023-09-15', motivo: 'Revisión anual' },
            { id: '2', fecha: '2023-10-01', motivo: 'Seguimiento dolor de espalda' },
        ]
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
                        frecuenciaRespiratoria: '18 rpm'
                    }
                }
            },
        ],
        seguro: {
            compania: 'Seguros Bienestar',
            poliza: 'POL-002-2023',
            certificado: 'CERT-789012',
            paisAtencion: 'Panamá',
            lugarEmpleo: 'Corporación XYZ',
            ocupacion: 'Contador'
        },
        citas: [
            { id: '1', fecha: '2023-09-20', motivo: 'Control de presión arterial' },
            { id: '2', fecha: '2023-10-05', motivo: 'Exámenes de laboratorio' },
        ]
    },
]
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

export const patients: Patient[] = [
    {
        id: 1,
        name: "Ana Pérez",
        idNumber: "8-123-4567",
        lastVisit: "10/09/2023",
        nextAppointment: "15/10/2023",
        birthDate: "15/05/1980",
        gender: "Femenino",
        phone: "+507 6000-1234",
        email: "ana.perez@email.com",
        address: "Calle 50, Edificio Global Plaza, Ciudad de Panamá",
    },
    {
        id: 2,
        name: "Carlos Gómez",
        idNumber: "PE-456-789",
        lastVisit: "05/09/2023",
        nextAppointment: "20/10/2023",
        birthDate: "03/11/1975",
        gender: "Masculino",
        phone: "+507 6000-5678",
        email: "carlos.gomez@email.com",
        address: "Avenida Balboa, Edificio Pacific, Ciudad de Panamá",
    },
    {
        id: 3,
        name: "María Rodríguez",
        idNumber: "3-234-5678",
        lastVisit: "12/09/2023",
        nextAppointment: "18/10/2023",
        birthDate: "23/08/1990",
        gender: "Femenino",
        phone: "+507 6000-2345",
        email: "maria.rodriguez@email.com",
        address: "Calle 52, Edificio Metropolis, Ciudad de Panamá",
    },
    {
        id: 4,
        name: "Juan Martínez",
        idNumber: "E-345-6789",
        lastVisit: "08/09/2023",
        nextAppointment: "22/10/2023",
        birthDate: "12/12/1985",
        gender: "Masculino",
        phone: "+507 6000-6789",
        email: "juan.martinez@email.com",
        address: "Via España, Edificio Centenario, Ciudad de Panamá",
    },
    {
        id: 5,
        name: "Laura Sánchez",
        idNumber: "6-345-6789",
        lastVisit: "14/09/2023",
        nextAppointment: "25/10/2023",
        birthDate: "09/07/1988",
        gender: "Femenino",
        phone: "+507 6000-3456",
        email: "laura.sanchez@email.com",
        address: "Calle 50, Edificio Elite, Ciudad de Panamá",
    },
];
interface Seguro {
    nombre: string
    poliza: string
    certificado: string
    paisAtencion: string
    lugarEmpleo: string
    ocupacion: string
}

interface Tratamiento {
    id: number
    paciente: string
    fechaInicio: string
    tipo: string
    idNumber: string
    estado: 'En progreso' | 'Completado' | 'Programado'
    fechaNacimiento: string
    genero: 'Masculino' | 'Femenino'
    seguro: Seguro
    historialMedico: string[]
}

// Static data with the correct type
export const tratamientos: Tratamiento[] = [
    {
        id: 1,
        idNumber: '4-3-13-322',
        paciente: "Juan Pérez",
        fechaInicio: "2023-11-01",
        tipo: "Fisioterapia",
        estado: "En progreso",
        fechaNacimiento: "1990-07-30",
        genero: "Femenino",
        seguro: {
            nombre: "Seguros Bienestar",
            poliza: "POL-002-2023",
            certificado: "CERT-789012",
            paisAtencion: "Panamá",
            lugarEmpleo: "Corporación XYZ",
            ocupacion: "Contador"
        },
        historialMedico: ["2023-02-14 Tratamiento para hipertensión"]
    },
    {
        id: 2,
        idNumber: '3-23-423-112',
        paciente: "María García",
        fechaInicio: "2023-10-15",
        tipo: "Quimioterapia",
        estado: "Completado",
        fechaNacimiento: "1982-03-18",
        genero: "Femenino",
        seguro: {
            nombre: "Seguros Bienestar",
            poliza: "POL-002-2023",
            certificado: "CERT-789012",
            paisAtencion: "Panamá",
            lugarEmpleo: "Corporación XYZ",
            ocupacion: "Contador"
        },
        historialMedico: ["2023-02-14 Tratamiento para hipertensión"]
    },
    {
        id: 3,
        idNumber: '5-23-2342-52',
        paciente: "Carlos Rodríguez",
        fechaInicio: "2023-11-10",
        tipo: "Rehabilitación",
        estado: "En progreso",
        fechaNacimiento: "1990-07-30",
        genero: "Femenino",
        seguro: {
            nombre: "Seguros Bienestar",
            poliza: "POL-002-2023",
            certificado: "CERT-789012",
            paisAtencion: "Panamá",
            lugarEmpleo: "Corporación XYZ",
            ocupacion: "Contador"
        },
        historialMedico: ["2023-02-14 Tratamiento para hipertensión"]
    },
    {
        id: 4,
        idNumber: '6-523-6511-42',
        paciente: "Ana Martínez",
        fechaInicio: "2023-09-22",
        tipo: "Terapia ocupacional",
        estado: "En progreso",
        fechaNacimiento: "1982-03-18",
        genero: "Masculino",
        seguro: {
            nombre: "Seguros Bienestar",
            poliza: "POL-002-2023",
            certificado: "CERT-789012",
            paisAtencion: "Panamá",
            lugarEmpleo: "Corporación XYZ",
            ocupacion: "Contador"
        },
        historialMedico: ["2023-02-14 Tratamiento para hipertensión"]
    },
    {
        id: 5,
        idNumber: '7-42-323-32',
        paciente: "Luis Sánchez",
        fechaInicio: "2023-10-30",
        tipo: "Terapia del habla",
        estado: "Programado",
        fechaNacimiento: "1982-03-18",
        genero: "Femenino",
        seguro: {
            nombre: "Seguros Bienestar",
            poliza: "POL-002-2023",
            certificado: "CERT-789012",
            paisAtencion: "Panamá",
            lugarEmpleo: "Corporación XYZ",
            ocupacion: "Contador"
        },
        historialMedico: ["2023-02-14 Tratamiento para hipertensión"]
    }
]
