import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { useForm } from './hooks/useForm'
import { UserContext } from './UserContext'
import "../styles/globals.css"
import { AppRouter } from './routers/AppRouter'

function App() {
  const [dataa, setData] = useState([])
  const [values, handleInputChange] = useForm({});
  const { searchText } = values;


  useEffect(async () => {
    await fetch('https://localhost:7286/api/people')
      .then(res => res.json()).then(data => { setData(...dataa, data) })
    await fetch('https://localhost:7286/api/other')
      .then(res => res.json()).then(data => { setData(...dataa, data) })
    await fetch('https://localhost:7286/api/pet')
      .then(res => res.json()).then(data => { setData(...dataa, data) })
  }, [])

  const handleSearch = () => {

  }

  return (
    <>
      <UserContext.Provider value={{ dataa, setData, handleInputChange, searchText, handleSearch }}>
        <AppRouter />
      </UserContext.Provider>
    </>
  )
}

export default App


// return gente.map(per => (
//   <article key={per.id}>
//       <Link href={`/desaparecidos/[id]`} as={`/desaparecidos/${per.id}`}>
//           <h2 style={{ color: '#09f' }}>{per.Name}</h2>
//       </Link>
//   </article> 
// ))  