import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm } from '../hooks/useForm'

export const New = () => {
  const navigate = useNavigate()
  const [tipo, setTipo] = useState('')
  const [values, handleInputChange] = useForm({})


  const urlPersona = 'https://localhost:7286/api/People'
  const urlAnimal = 'https://localhost:7286/api/Pet'
  const urlCosa = 'https://localhost:7286/api/Other'

  const changeLocation = () => {
    window.location.href = '/login'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // const formdata = new FormData()
    // formdata.append('Name', values.Name)
    // formdata.append('Reward', values.Reward)
    // formdata.append('ContactNumber', values.ContactNumber)
    // formdata.append('Latitude', values.Latitude)
    // formdata.append('Longitude', values.Longitude)
    // formdata.append('Description', values.Description)
    // formdata.append('FileUri', values.FileUri)

    values['MissingDate'] = new Date()

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var latitud = position.coords.latitude;
        var longitud = position.coords.longitude;
        values.Latitude = latitud
        values['Length'] = longitud
      });
    }

    const filename = values.FileUri.split("\\").reverse()[0]


    const inputvals = {
      "Name": values.Name,
      "ContactNumber": values.ContactNumber,
      "MissingDate": values.MissingDate,
      "Latitude": values.Latitude,
      "Longitude": values.Longitude,
      "Description": values.Description,
      "Reward": values.Reward,
      "FileUri": {
        "contentType": "image/png",
        "contentDisposition": `form-data; name=\"FileUri\"; filename=\"${filename}\"`,
        "headers": {
          "Content-Disposition": [
            `form-data; name=\"FileUri\"; filename=\"${filename}\"`
          ],
          "Content-Type": [
            "image/png"
          ]
        },
        "length": 152025,
        "name": "FileUri",
        "fileName": `${filename}`
      }
    }
    

    if (values.Name.length > 2 && values.ContactNumber.length > 6 && values.Description.length > 4 && values.FileUri !== null) {
      if (tipo === 'Persona') {
        axios.post(urlPersona, inputvals, {
          headers:{
            'Content-Type': 'multipart/form-data',
            'Accept': '*/*'
          }
        }).then(console.log('Posted'))
      } else if (tipo === 'Animal') {
        axios.post(urlAnimal, values).then(console.log('Posted'))
      } else if (tipo === 'Cosa') {
        axios.post(urlCosa, values).then(console.log('Posted'))
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
      {localStorage.getItem('token') !== null ?
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
                    <input onChange={handleInputChange} type='text' name='Name' placeholder='Name' className='input w-full ' />
                  </div>
                </div>
                <div className='w-full'>
                  <div className=' relative '>
                    <input type='text' onChange={handleInputChange} name='Reward' placeholder='Reward' className='input w-full ' />
                  </div>
                </div>
                {/* <div className='w-full'>
                  <div className=' relative '>
                    <input type='text' onChange={handleInputChange} name='loc' placeholder='Last Location' className='input w-full ' />
                  </div>
                </div> */}
                <div className='w-full'>
                  <div className=' relative '>
                    <input type='text' onChange={handleInputChange} name='ContactNumber' placeholder='Phone' className='input w-full ' />
                  </div>
                </div>
                <div className='w-full'>
                  <div className=' relative '>
                    <textarea onChange={handleInputChange} name='Description' placeholder='Description' className='textarea textarea-bordered  textarea-sm w-full' />
                  </div>
                </div>
                <div className='w-full'>
                  <div className=' relative '>
                    <input type="file" onChange={handleInputChange} name='FileUri' className="file-input w-full" />
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
        </form> : changeLocation()}
    </>
  )
}
