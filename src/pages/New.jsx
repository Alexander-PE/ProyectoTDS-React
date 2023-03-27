import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm } from '../hooks/useForm'

export const New = () => {
  const [values, handleInputChange] = useForm({})

  const urlPersona = ''
  const urlAnimal = ''
  const urlCosa = ''

  const urls = {
    Persona: urlPersona,
    Animal: urlAnimal,
    Cosa: urlCosa
  }
  
  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // const formdata = new FormData();
    // formdata.append('name', values.name)
    // formdata.append('reward', values.reward)
    // formdata.append('phone', values.phone)
    // formdata.append('loc', values.loc)
    // formdata.append('desc', values.desc)
    // formdata.append('img', values.img)
    // axios.post('', formdata)
    if(values.tipo === "Persona"){
      axios.post(urlPersona, values).then(console.log('Posted'))
    } else if(values.tipo === "Animal"){
      axios.post(urlAnimal, values).then(console.log('Posted'))
    } else if(values.tipo === "Cosa"){
      axios.post(urlCosa, values).then(console.log('Posted'))
    }
    
    return navigate('/')
  }

  return (
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
            <div className='w-full'>
              <div className=' relative '>
                <input type='text' onChange={handleInputChange} name='loc' placeholder='Last Location' className='input w-full ' />
              </div>
            </div>
            <div className='w-full'>
              <div className=' relative '>
                <input type='text' onChange={handleInputChange} name='phone' placeholder='Phone' className='input w-full ' />
              </div>
            </div>
            <div className='w-full'>
              <div className=' relative '>
                <textarea onChange={handleInputChange} name='desc' placeholder='Bio' className='textarea textarea-bordered  textarea-sm w-full' />
              </div>
            </div>
            <div className='w-full'>
              <div className=' relative '>
                <input type="file" onChange={handleInputChange} name='img' className="file-input w-full max-w-xs" />
              </div>
            </div>
            <div className='w-full'>
              <div className=' relative text-black flex justify-between' onChange={handleInputChange}>
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

  )
}
