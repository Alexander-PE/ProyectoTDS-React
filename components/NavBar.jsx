import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export const NavBar = () => {
    return (
        <div className="flex flex-row items-center justify-between w-full p-5 shadow-xs">
            <Link className="ml-8 text-xl text-white md:flex">
                Desaparecidos
            </Link>
            <span className="flex justify-center w-full h-10 text-sm border border-gray-300 rounded-full cursor-pointer md:w-1/3">
                <input type="search" name="serch" placeholder="Search" className="flex-grow px-4 text-sm rounded-l-full rounded-r-full focus:outline-none" />
            </span>
        </div>
    )
}
