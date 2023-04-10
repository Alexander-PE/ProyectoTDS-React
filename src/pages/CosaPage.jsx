import React, { useMemo, useContext } from 'react'
import { getItemById } from '../Helpers/getItemById'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'

export const CosaPage = () => {
  const { dataa } = useContext(UserContext)
  const navigate = useNavigate()
  const { cosaId } = useParams()
  const cosa = useMemo(() => getItemById(dataa, cosaId), [cosaId])

  if (!cosa) {
    return <Navigate to='/' />
  }

  const handleReturn = () => {
    navigate(-1) // el -1 es para que vuelva a la pagina que estaba antes
  }

  const handleDelete = (e) => {
    e.preventDefault()
    axios.delete(`http://localhost:3001/desaparecidos/${cosaId}`)
    handleReturn()
  }

  console.log(cosa)

  return (
    <div className='flex justify-evenly mt-5'>
      <div className='w-4/12'> 
        <img src={cosa.imageLink} alt='imagen de desaparecido' className='w-full h-full object-cover' />
      </div>
      <div className='justify-start'>
        <h1 className='text-4xl mb-6'>Nombre: {cosa.name}</h1>
        {!!cosa.reward && <h1 className='text-4xl mb-6'>Recompensa: {cosa.reward} RD$</h1>}
        <h1 className='text-4xl mb-6'>Contacto: {cosa.contactNumber}</h1>
        <h1 className='text-4xl mb-6'>Fecha de publicacion: {fechaa}</h1>
        <p className='text-2xl'>Descripcion: {cosa.description}</p>
        {
          (cosa.latitude !== null && cosa.longitude !== null) 
            ?
            <div id='map'>
              <MapContainer center={[cosa.latitude, cosa.longitude]} zoom={13} style={{height: '200px'}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[cosa.latitude, cosa.longitude]}>
                  <Popup>Ultima vez visto aca!!</Popup>
                </Marker>
              </MapContainer>
            </div>
          :
          <h2>El usuario no ha proporcionado una localizacion, Llame al numero de telefono en caso de alguna informacion</h2>
        }
        {
          cosa.createdBy === localStorage.getItem('user') && <button onClick={handleDelete} className="btn btn-outline btn-error mt-6">Delete</button>
        }
      </div>
    </div>
  )
}
