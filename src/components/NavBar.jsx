import React, { useContext } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import { UserContext } from '../UserContext'
import { useForm } from '../hooks/useForm'
import queryString from 'query-string'
import axios from 'axios'

export const NavBar = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const word = 'Desaparecidos'

  const navigate = useNavigate()
  const { q = '' } = queryString.parse(location.search)
  const [values, handleInputChange] = useForm({ searchText: q })
  const { searchText } = values
  const { dataa, setFiltered } = useContext(UserContext)

  const handleOver = e => {
    let iterations = 0

    const interval = setInterval(() => {
      e.target.innerText = e.target.innerText.split('')
        .map((letter, index) => {
          if (index < iterations) {
            return word[index]
          }
          return letters[Math.floor(Math.random() * 26)]
        })
        .join('');
      (iterations >= word.length) && clearInterval(interval)
      iterations += 1 / 3
    }, 30)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  // const handleNew = e => {
  //   Swal.fire({
  //     title: 'Multiple inputs',
  //     html:
  //       '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
  //       '<input id="swal-input2" class="swal2-input" placeholder="Last Location">' +
  //       '<input id="swal-input3" class="swal2-input" placeholder="Phone">' +
  //       '<input id="swal-input4" class="swal2-input" placeholder="Reward">' +
  //       '<input type="file" id="swal-input6" class="file-input file-input-ghost w-full max-w-xs" />' +
  //       '<textarea id="swal-input5" class="swal2-textarea" placeholder="Description">',
  //     focusConfirm: false,
  //     preConfirm: () => {
  //       console.log(JSON.stringify({
  //         name: document.getElementById('swal-input1').value,
  //         reward: document.getElementById('swal-input2').value,
  //         phone: document.getElementById('swal-input3').value,
  //         loc: document.getElementById('swal-input4').value,
  //         desc: document.getElementById('swal-input5').value,
  //         img: document.getElementById('swal-input6').value
  //       }))
  //     }
  //   })
  // }

  const handleSearch = e => {
    e.preventDefault()
    const search = dataa.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))

    if (searchText.trim() === '') {
      setFiltered([])
    } else {
      setFiltered(search)
    }

    navigate('/?q=' + searchText)
  }

  return (
    <div className='flex flex-row items-center justify-between w-full p-5 shadow-xs'>
      <Link to='/' className='ml-4 text-xl text-white md:flex titulo' onMouseOver={handleOver}>
        {word}
      </Link>
      <form onSubmit={handleSearch} className='flex justify-end w-full h-10 text-sm border border-gray-300 rounded-full cursor-pointer md:w-1/3 ml-6'>
        <input type='search' value={searchText} onChange={handleInputChange} name='searchText' placeholder='Search' autoComplete='off' className='flex-grow px-4 text-sm rounded-l-full rounded-r-full focus:outline-none' />
      </form>
      <div>
        <Link className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500' to='/new'>
          Add
        </Link>
        {
          localStorage.getItem('token') !== null && <button onClick={handleLogout} className='ml-4 btn btn-outline btn-error'>Logout</button>
        }
      </div>
    </div>
  )
}
