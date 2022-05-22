import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Cuisine from './Cuisine'
import Home from './Home'
import Recipe from './Recipe'
import Searched from './Searched'
import { AnimatePresence } from 'framer-motion';
function Pages() {
  const location = useLocation()
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={1}>
        <Route path='/' element={<Home />}></Route>
        <Route path='/cuisine/:type' element={<Cuisine />}></Route>
        <Route path='/searched/:search' element={<Searched />}></Route>
        <Route path='/recipe/:name' element={<Recipe />}></Route>
      </Routes>
    </AnimatePresence>
  )
}

export default Pages
