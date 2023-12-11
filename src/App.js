import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './views/dashboard';
import Content from './views/content';
import Events from './views/events';
import NavBar from './components/NavBar';
import User from './views/user';
import Login from './views/user/login';
import AllBlogs from './views/content/blogs/allBlogs';
import AddEditBlog from './views/content/blogs/addEditBlog';
import AllEvents from './views/events/allEvents';
import AllLandings from './views/landingpage/allEvents';
import AddEditEvent from './views/events/addEditEvent';
import AddEditLanding from './views/landingpage/addEditEvent';
import Landingpage from './views/landingpage';
function App() {
  const [login,setLogin]=useState(null);
  return (
    <>
    <NavBar login={login} setLogin={setLogin}/>
    <Routes>
        <Route path='/Swayam-Admin' element={<Login  setLogin={setLogin}/>} />
        <Route path='/user/*' element={<User />} />
        <Route path='/login' exact element={<Login setLogin={setLogin} />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path='/content' exact element={<Content />} />
        <Route path='/events' exact element={<Events />} />
        <Route path='/landingpage' exact element={<Landingpage />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/content/all-blogs' exact element={<AllBlogs/>} />
        <Route path='/content/add-edit-blog/:id' exact element={<AddEditBlog/>} />
        <Route path='/events/add-edit-event/:id' exact element={<AddEditEvent/>} />
        <Route path='/landingpage/add-edit-landing/:id' exact element={<AddEditLanding/>} />
        <Route path='/events/all-events' exact element={<AllEvents/>} />
        <Route path='/landingpage/all-landings' exact element={<AllLandings/>} />
        <Route
          path="/"
          exact
          element={ <Navigate to="/user" replace={true}/> }
        />
        </Routes>
        </>
  );
}

export default App;
