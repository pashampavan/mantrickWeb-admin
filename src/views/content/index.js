import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AllBlogs from './blogs/allBlogs'

const Content = () => {
  return (
    <Routes>
        <Route
          path="/"
          element={ <Navigate to="/content/all-blogs"  replace={false}/> }
        />
    </Routes>
  )
}

export default Content