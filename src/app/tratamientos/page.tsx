import TratamientoMedicoMejorado from '@/components/TratamientoMedico'
import ListaTratamientos from '@/components/Tratamientos'
import React from 'react'

const pageTratamiento = () => {
    return (
        <div className='p-6'>
            <ListaTratamientos />
            {/* <TratamientoMedicoMejorado /> */}
        </div>
    )
}

export default pageTratamiento