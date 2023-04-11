import React, { useMemo, useContext } from 'react'
import { getItemById } from '../Helpers/getItemById'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'

export const AnimalPage = () => {
  const { dataa } = useContext(UserContext)
  const navigate = useNavigate()
  const { animalId } = useParams()
  const animal = useMemo(() => getItemById(dataa, animalId), [animalId])

  if (!animal) {
    return <Navigate to='/' />
  }

  const handleDelete = (e) => {
    e.preventDefault()
    axios.delete(`http://localhost:3001/desaparecidos/${animalId}`)
    navigate(-1)
  }

  console.log(animal)

  return (
    <div className='flex justify-evenly mt-5'>
      <div className='w-4/12'> 
        <img src={animal.imageLink} alt='imagen de desaparecido' className='w-full h-full object-cover' />
      </div>
      <div className='justify-start'>
        <h1 className='text-4xl mb-3'>Nombre: {animal.name}</h1>
        {!!animal.reward && <h1 className='text-4xl mb-3'>Recompensa: {animal.reward} RD$</h1>}
        <h1 className='text-4xl mb-3'>Contacto: {animal.contactNumber}</h1>
        <h1 className='text-4xl mb-3'>Fecha de publicacion: {fechaa}</h1>
        <p className='text-2xl mb-3'>Descripcion: {animal.description}</p>
        {
          (animal.latitude !== null && animal.longitude !== null) 
            ?
            <div id='map'>
              <MapContainer center={[animal.latitude, animal.longitude]} zoom={13} style={{height: '200px'}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[animal.latitude, animal.longitude]}>
                  <Popup>Ultima vez visto aca!!</Popup>
                </Marker>
              </MapContainer>
            </div>
          :
          <h2>El usuario no ha proporcionado una localizacion, Llame al numero de telefono en caso de alguna informacion</h2>
        }
        {
          animal.createdBy === localStorage.getItem('user') && <button onClick={handleDelete} className="btn btn-outline btn-error mt-6">Delete</button>
        }
      </div>
    </div>
  )
}
