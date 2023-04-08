import React, { useMemo, useContext } from 'react'
import { getAnimalById } from '../Helpers/getAnimalById'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'

export const AnimalPage = () => {
  const { dataa } = useContext(UserContext)

  const navigate = useNavigate()

  const { animalId } = useParams()

  const animal = useMemo(() => getAnimalById(dataa, animalId), [animalId])

  if (!animal) {
    return <Navigate to='/' />
  }

  const handleReturn = () => {
    navigate(-1) // el -1 es para que vuelva a la pagina que estaba antes
  }

  const handleDelete = (e) => {
    e.preventDefault()
    axios.delete(`https://localhost:7286/api/Pet/${animalId}`)
    handleReturn()
  }

  console.log(animal)

  return (
    <div className='flex justify-evenly mt-5'>
      <img src={animal.imageUrl} alt='imagen de desaparecido' />
      <div className='justify-start'>
        <h1 className='text-4xl mb-6'>Nombre: {animal.name}</h1>
        {!!animal.reward && <h1 className='text-4xl mb-6'>Recompensa: {animal.reward} RD$</h1>}
        <h1 className='text-4xl mb-6'>Contacto: {animal.contactNumber}</h1>
        <h1 className='text-4xl mb-6'>Fecha de publicacion: {fechaa}</h1>
        <p className='text-2xl mb-6'>Descripcion: {animal.description}</p>
        {
          (animal.latitude !== null && animal.length !== null)
            ?
            <div>

              <MapContainer center={[Number(animal.latitude), Number(animal.length)]} zoom={13} style={{ height: '200px' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[Number(animal.latitude), Number(animal.length)]}>
                  <Popup>Ultima vez visto aca!!</Popup>
                </Marker>
              </MapContainer>
            </div>
            :
            <h2>El usuario no ha proporcionado una localizacion, Llame al numero de telefono en caso de alguna informacion</h2>
        }
        <button onClick={handleDelete} className="btn btn-outline btn-error mt-6">Delete</button>

      </div>
    </div>
  )
}
