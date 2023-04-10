import React, { useMemo, useContext } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getItemById } from '../Helpers/getItemById'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

export const PersonaPage = () => {
  const { dataa } = useContext(UserContext)
  const navigate = useNavigate()
  const { personaId } = useParams()
  const persona = useMemo(() => getItemById(dataa, personaId), [personaId])

  if (!persona) {
    return <Navigate to='/' />
  }

  const handleReturn = () => {
    navigate(-1) // el -1 es para que vuelva a la pagina que estaba antes
  }


  const handleDelete = (e) => {
    e.preventDefault()
    axios.delete(`http://localhost:3001/desaparecidos/${personaId}`)
    handleReturn()
  }

  console.log(persona)

  const fecha = new Date(persona.missingDate)
  const fechaa = fecha.toLocaleDateString()

  return (
    <div className='flex justify-evenly mt-5'>
      <div className='w-4/12'> 
        <img src={persona.imageLink} alt='imagen de desaparecido' className='w-full h-full object-cover' />
      </div>
      <div className='justify-start'>
        <h1 className='text-4xl mb-6'>Nombre: {persona.name}</h1>
        {!!persona.reward && <h1 className='text-4xl mb-6'>Recompensa: {persona.reward} RD$</h1>}
        <h1 className='text-4xl mb-6'>Contacto: {persona.contactNumber}</h1>
        <h1 className='text-4xl mb-6'>Fecha de publicacion: {fechaa}</h1>
        <p className='text-2xl'>Descripcion: {persona.description}</p>
        {
          (persona.latitude !== null && persona.longitude !== null) 
            ?
            <div id='map'>
              <MapContainer center={[persona.latitude, persona.longitude]} zoom={13} style={{height: '200px'}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[persona.latitude, persona.longitude]}>
                  <Popup>Ultima vez visto aca!!</Popup>
                </Marker>
              </MapContainer>
            </div>
          :
          <h2>El usuario no ha proporcionado una localizacion, Llame al numero de telefono en caso de alguna informacion</h2>
        }
        {
          persona.createdBy === localStorage.getItem('user') && <button onClick={handleDelete} className="btn btn-outline btn-error mt-6">Delete</button>
        }
      </div>
    </div>
  )
}
