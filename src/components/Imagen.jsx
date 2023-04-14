import React from 'react'

export const Imagen = ({ imagen }) => {
  return (
    <div className='w-[500px] h-[500px]'>
      <img src={imagen} alt='imagen de desaparecido' className='w-full h-full object-contain' />
    </div>
  )
}

