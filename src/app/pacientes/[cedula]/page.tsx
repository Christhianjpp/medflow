import { patients } from '@/app/api/data'
import PatientDetails from '@/components/DetalleDelPaciente'
import React from 'react'

const PacienteCedula = ({ params }: { params: { cedula: string } }) => {
    const cedula = params.cedula





    const paciente = patients.find(patient => patient.idNumber === cedula)

    if (!paciente) {
        return <div>Paciente no encontrado</div>
    }
    return (
        <div>
            <PatientDetails idNumber={cedula} />
        </div>
    )
}

export default PacienteCedula