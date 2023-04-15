import { useMemo, useContext, useState } from 'react'
import { getItemById } from '../Helpers/getItemById'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

export const Edit = () => {
  const { dataa } = useContext(UserContext)
  const navigate = useNavigate()
  const { id } = useParams()
  const item = useMemo(() => getItemById(dataa, id), [id])
  const [edited, setEdited] = useState(item)
  const handleChange = (e) => {
    setEdited({
      ...edited,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    if (item.name.length > 2 && item.contactNumber.length > 4 && item.description.length > 4) {
      Object.assign(item, edited)
      // console.log(item)
      axios.put(`http://localhost:3001/desaparecidos/${id}`, item).then(console.log('edited')).catch(err => console.log(err))
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
                Edit
              </span>
            </div>
          </div>
          <div className='mt-6'>
            <div className='w-full space-y-3'>
              <div className='w-full'>
                <div className=' relative '>
                  <input onChange={handleChange} type='text' name='name' placeholder='Name' value={edited.name} className='input w-full ' />
                </div>
              </div>
              <div className='w-full'>
                <div className=' relative '>
                  <input type='text' onChange={handleChange} name='reward' placeholder='Reward' value={edited.reward} className='input w-full ' />
                </div>
              </div>
              <div className='w-full'>
                  <div className=' relative '>
                    <input type='text' onChange={handleChange} name='lastSeenLocation' value={edited.lastSeenLocation} placeholder='Last Location' className='input w-full ' />
                  </div>
                </div>
              <div className='w-full'>
                <div className=' relative '>
                  <input type='text' onChange={handleChange} name='contactNumber' value={edited.contactNumber} placeholder='Phone' className='input w-full ' />
                </div>
              </div>
              <div className='w-full'>
                <div className=' relative '>
                  <textarea onChange={handleChange} name='description' value={edited.description} placeholder='Description' className='textarea textarea-bordered  textarea-sm w-full' />
                </div>
              </div>
              <div>
                <span className='block w-full rounded-md shadow-sm'>
                  <button type='submit' className='py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
                    Edit
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

export default Edit
