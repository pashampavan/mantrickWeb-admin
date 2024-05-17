import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AllBlogs from './blogs/allBlogs'

const Gallary = () => {
  return (
    <Routes>
        <Route
          path="/"
          element={ <Navigate to="/gallary/all-blogs"  replace={false}/> }
        />
    </Routes>
  )
}

export default Gallary