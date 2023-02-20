import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { useForm } from './hooks/useForm'
import "../styles/globals.css"

function App() {
  const [dataa, setData] = useState()
  const [values, handleInputChange] = useForm({ searchText: q });
  const {searchText} = values;


  useEffect(() => {
    fetch('https://localhost:7286/api/people')
      .then(res => res.json()).then(data => setData(data))
  }, [])

  return (
    <>
      <div className="flex flex-row items-center justify-between w-full p-5 shadow-xs">
        <Link className="ml-8 text-xl text-white md:flex">
          Desaparecidos
        </Link>
        <span className="flex justify-center w-full h-10 text-sm border border-gray-300 rounded-full cursor-pointer md:w-1/3">
          <form onSubmit={handleSearch}>
            <input type="search" value={searchText} onChange={handleInputChange} name="serch" placeholder="Search" autoComplete='off' className="flex-grow px-4 text-sm rounded-l-full rounded-r-full focus:outline-none" />
          </form>
        </span>
      </div>

      <div className='contaier'>
        <h1>personas</h1>
      </div>
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