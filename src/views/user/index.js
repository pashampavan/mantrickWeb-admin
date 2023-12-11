import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './login'

const User = () => {
  return (
    <Routes>
        {/* <Route path='/login' exact element={<Login />} /> */}
        <Route
          path="/"
          element={ <Navigate to="/login"  replace={false}/> }
        />
       
    </Routes>
  )
}

export default User