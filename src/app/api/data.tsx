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