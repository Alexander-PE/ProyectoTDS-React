import axios from 'axios'
import React, { useState, useContext } from 'react'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useForm } from '../hooks/useForm'

export const New = () => {
  const { simpleFetch } = useContext(UserContext)
  const navigate = useNavigate()
  const [image, setImage] = useState("")
  const [values, handleInputChange] = useForm({})
  const [loc, setLoc] = useState([])
  const preset_key = 'apitds'
  const cloud_name = 'djeswamlh'
  const lettersRegExp = /[a-zA-Z]/;

  navigator.geolocation.getCurrentPosition(function (position) {
    const latitud = position.coords.latitude;
    const longitud = position.coords.longitude;
    setLoc([...loc, latitud, longitud])
  });


  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', preset_key)

    values.createdBy = localStorage.getItem('user')
    values.missingDate = new Date()
    values.latitude = loc[0] || null
    values.longitude = loc[1] || null

    if (values.name && values.contactNumber && values.description && !lettersRegExp.test(values.contactNumber)) {
      // console.log(values)
      await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, data)
        .then(res => {
          values.imageLink = res.data.url
          values.pubId = res.data.public_id
        }).catch(err => console.log(err))

      axios.post('http://localhost:3001/desaparecidos', values).then(simpleFetch()).catch(err => console.log(err))
      return navigate('/')

    } else {
      Swal.fire(
        'Something is wrong',
        'Some invalid inputs',
        'question'
      )
    }
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
                  <input onChange={handleInputChange} type='text' name='name' placeholder='Name' className='input w-full ' autoComplete='off' />
                </div>
              </div>
              <div className='w-full'>
                <div className=' relative '>
                  <input type='text' onChange={handleInputChange} name='reward' placeholder='Reward' className='input w-full ' autoComplete='off' />
                </div>
              </div>
              <div className='w-full'>
                <div className=' relative '>
                  <input type='text' onChange={handleInputChange} name='lastSeenLocation' placeholder='Last Location' className='input w-full ' autoComplete='off' />
                </div>
              </div>
              <div className='w-full'>
                <div className=' relative '>
                  <input type='text' onChange={handleInputChange} name='contactNumber' placeholder='Phone' className='input w-full ' autoComplete='off' />
                </div>
              </div>
              <div className='w-full'>
                <div className=' relative '>
                  <textarea onChange={handleInputChange} name='description' placeholder='Description' className='textarea textarea-bordered  textarea-sm w-full' autoComplete='off' />
                </div>
              </div>
              <div className='w-full'>
                <div className=' relative '>
                  <input type="file" name="image" onChange={e => setImage(e.target.files[0])} className='file-input w-full ' />
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
    </>
  )
}
