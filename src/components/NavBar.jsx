import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import queryString from 'query-string';


export const NavBar = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const word = "Desaparecidos"

  const navigate = useNavigate();
  const { q = '' } = queryString.parse(location.search);
  const [values, handleInputChange] = useForm({ searchText: q });
  const { searchText } = values;

  const { dataa, setFiltered } = useContext(UserContext)

  const handleOver = e => {
    let iterations = 0

    const interval = setInterval(() => {
      e.target.innerText = e.target.innerText.split("").
        map((letter, index) => {
          if (index < iterations) {
            return word[index]
          }
          return letters[Math.floor(Math.random() * 26)]
        })
        .join("");
      (iterations >= word.length) && clearInterval(interval);
      iterations += 1 / 3
    }, 30)
  }
  
  const handleSearch = e => {
    e.preventDefault()
    const search = dataa.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
    
    if(searchText.trim() === "" ){  
      setFiltered([])
    }else{
      setFiltered(search);
    }

    navigate(`?q=` + searchText);
  }

  return (
    <div className="flex flex-row items-center justify-between w-full p-5 shadow-xs">
      <Link to={"/"} className="ml-4 text-xl text-white md:flex titulo" onMouseOver={handleOver}>
        {word}
      </Link>
      <form onSubmit={handleSearch} className="flex justify-center w-full h-10 text-sm border border-gray-300 rounded-full cursor-pointer md:w-1/3 ml-6">
        <input type="search" value={searchText} onChange={handleInputChange} name="searchText" placeholder="Search" autoComplete='off' className="flex-grow px-4 text-sm rounded-l-full rounded-r-full focus:outline-none" />
      </form>
    </div>
  )
}
