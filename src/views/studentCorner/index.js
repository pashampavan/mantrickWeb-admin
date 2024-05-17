import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AllBlogs from './blogs/allBlogs'

const Studentcorner = () => {
  return (
    <Routes>
        <Route
          path="/"
          element={ <Navigate to="/studentcorner/all-blogs"  replace={false}/> }
        />
    </Routes>
  )
}

export default Studentcorner