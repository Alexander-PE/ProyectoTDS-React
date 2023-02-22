import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'



export const NavBar = () => { 

  const { handleInputChange, searchText, handleSearch } = useContext(UserContext)
  return (
    <div className="flex flex-row items-center justify-between w-full p-5 shadow-xs">
      <Link className="ml-8 text-xl text-white md:flex">
        Desaparecidos
      </Link>
        <form onSubmit={handleSearch} className="flex justify-center w-full h-10 text-sm border border-gray-300 rounded-full cursor-pointer md:w-1/3 ml-6">
          <input type="search" value={searchText} onChange={handleInputChange} name="searchText" placeholder="Search" autoComplete='off' className="flex-grow px-4 text-sm rounded-l-full rounded-r-full focus:outline-none" />
        </form>
    </div>
  )
}
