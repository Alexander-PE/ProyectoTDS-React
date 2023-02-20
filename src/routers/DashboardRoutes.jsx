import { NavBar } from "../components/ui/NavBar"
import {Routes, Route } from 'react-router-dom'

import { MarvelScreen } from '../components/Marvel/MarvelScreen'
import { DcScreen } from '../components/dc/DcScreen'
import { Hero } from '../components/Hero/Hero'
import { Search } from '../components/Search/Search'


export const DashboardRoutes = () => {
  return (
    <>
        <NavBar />
        <div className="container">
            <Routes>
                    <Route path="marvel" element={<MarvelScreen />} /> 
                    <Route path="dc" element={<DcScreen />} />
                    <Route path="search" element={<Search />} />
                    <Route path="hero/:heroeId" element={<Hero />} /> 
                    <Route path="/" element={<MarvelScreen />} />
            </Routes>

        </div>
    </>
  )
}
