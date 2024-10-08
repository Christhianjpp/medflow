import VistaTratamientoActual from '@/components/DetalleTratamient'
import React from 'react'

const pageVer = ({ params }: { params: { cedula: string } }) => {
    const cedula = params.cedula
    return (
        <div>
            <VistaTratamientoActual idNumber={cedula} />
        </div>
    )
}

export default pageVer