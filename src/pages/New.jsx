import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm } from '../hooks/useForm'

export const New = () => {
  const navigate = useNavigate()
  const [tipo, setTipo] = useState('')
  const [values, handleInputChange] = useForm({})
  const [loc, setLoc] = useState([])

  const urlPersona = 'https://localhost:7286/api/People'
  const urlAnimal = 'https://localhost:7286/api/Pet'
  const urlCosa = 'https://localhost:7286/api/Other'
  
  navigator.geolocation.getCurrentPosition(function (position) {
    const latitud = position.coords.latitude;
    const longitud = position.coords.longitude;
    setLoc([...loc, latitud, longitud])
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    
    values['missingDate'] = new Date()
    values.latitude = loc[0]
    values['length'] = loc[1]

    const dtapost = {
      name: values.name,
      reward: values.reward,
      missingDate: values.missingDate,
      latitude: values.latitude,
      length: values.length,
      description: values.description,
      contactNumber: values.contactNumber,
      file: values.file
    }

    if (values.name.length > 2 && values.contactNumber.length > 6 && values.description.length > 4) {
      if (tipo === 'Persona') {
        axios.post(urlPersona, dtapost, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }).then(console.log('Posted')).catch(err => console.log(err))
      } else if (tipo === 'Animal') {
        axios.post(urlAnimal, dtapost, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }).then(console.log('Posted')).catch(err => console.log(err))
      } else if (tipo === 'Cosa') {
        axios.post(urlCosa, dtapost, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }).then(console.log('Posted')).catch(err => console.log(err))
      } else {
        alert('Debe seleccionar el tipo!')
      } 
    } else {
      alert('Verifique los campos!')
    }
    
    return navigate('/')
  }

  return ( 
    <>
        <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden relative top-10'>
          <div className='px-4 py-8 sm:px-10'>
            <div className='relative mt-6'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300' />
              </div>
              <div className='relative flex justify-center text-sm leading-5'>
                <span className='px-2 text-gray-500 bg-white'>
                  Information
                </span>
              </div>
            </div>
            <div className='mt-6'>
              <div className='w-full space-y-3'>
                <div className='w-full'>
                  <div className=' relative '>
                    <input onChange={handleInputChange} type='text' name='name' placeholder='Name' className='input w-full ' />
                  </div>
                </div>
                <div className='w-full'>
                  <div className=' relative '>
                    <input type='text' onChange={handleInputChange} name='reward' placeholder='Reward' className='input w-full ' />
                  </div>
                </div>
                {/* <div className='w-full'>
                  <div className=' relative '>
                    <input type='text' onChange={handleInputChange} name='loc' placeholder='Last Location' className='input w-full ' />
                  </div>
                </div> */}
                <div className='w-full'>
                  <div className=' relative '>
                    <input type='text' onChange={handleInputChange} name='contactNumber' placeholder='Phone' className='input w-full ' />
                  </div>
                </div>
                <div className='w-full'>
                  <div className=' relative '>
                    <textarea onChange={handleInputChange} name='description' placeholder='Description' className='textarea textarea-bordered  textarea-sm w-full' />
                  </div>
                </div>
                <div className='w-full'>
                  <div className=' relative '>
                    <input type="file" name="file" onChange={handleInputChange} className='file-input w-full max-w-xs' />
                    {/* <textarea onChange={handleInputChange} name='imageUrl' placeholder='Image' className='textarea textarea-bordered  textarea-sm w-full' /> */}
                  </div>
                </div>
                <div className='w-full'>
                  <div className=' relative text-black flex justify-between' onChange={e => setTipo(e.target.value)}>
                    <input type="radio" name="tipo" value='Persona' /> Persona
                    <input type="radio" name="tipo" value='Animal' /> Animal
                    <input type="radio" name="tipo" value='Cosa' /> Cosa
                  </div>
                </div>
                <div>
                  <span className='block w-full rounded-md shadow-sm'>
                    <button type='submit' className='py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
                      Add
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form> 
    </>
  )
}
