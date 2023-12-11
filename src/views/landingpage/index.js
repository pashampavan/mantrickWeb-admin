import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Landingpage = () => {
  return (
    <Routes>
        {/* <Route path='/login' exact element={<Login />} /> */}
        <Route
          path="/"
          element={ <Navigate to="/landingpage/all-landings"  replace={false}/> }
        />
       
    </Routes>
  )
}

export default Landingpage;

