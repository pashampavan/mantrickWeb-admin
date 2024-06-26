import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './views/dashboard';
import Content from './views/content';
import Blogs from './views/blogs';
import Events from './views/events';
import NavBar from './components/NavBar';
import User from './views/user';
import Login from './views/user/login';
import Studentcorner from './views/studentCorner';
import AllBlogs from './views/content/blogs/allBlogs';
import RealAllBlogs from './views/blogs/blogs/allBlogs';
import GallaryAllBlogs from './views/gallary/blogs/allBlogs';
import ClientsAllBlogs from './views/clients/blogs/allBlogs';
import StudentcornerAllBlogs from './views/studentCorner/blogs/allBlogs';
import Gallary from './views/gallary';
import Clients from './views/clients';
import AddEditBlog from './views/content/blogs/addEditBlog';
import AddRealEditBlog from './views/blogs/blogs/addEditBlog';
import AddEditGallary from './views/gallary/blogs/addEditBlog';
import AddEditClients from './views/clients/blogs/addEditBlog';
import AddEditStudentcorner from './views/studentCorner/blogs/addEditBlog';
import AllEvents from './views/events/allEvents';
import AllLandings from './views/landingpage/allEvents';
import AllTestimonials from './views/testimonials/allEvents';
import AddEditEvent from './views/events/addEditEvent';
import AddEditLanding from './views/landingpage/addEditEvent';
import AddEditTestimonials from './views/testimonials/addEditEvent';
import Landingpage from './views/landingpage';
import Testimonials from './views/testimonials';
function App() {
  const [login,setLogin]=useState(null);
  return (
    <>
    <NavBar login={login} setLogin={setLogin}/>
    <Routes>
        <Route path='/mantrickweb-admin' element={<Login  setLogin={setLogin}/>} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/admin' element={<Login  setLogin={setLogin}/>} />
        <Route path='/' element={<Login  setLogin={setLogin}/>} />
        <Route path='/user/*' element={<User />} />
        <Route path='/login' exact element={<Login setLogin={setLogin} />} />
        <Route path="/dashboard" exact element={<Dashboard />} />

        <Route path='/events' exact element={<Events />} />
        <Route path='/events/all-events' exact element={<AllEvents/>} />
        <Route path='/events/add-edit-event/:id' exact element={<AddEditEvent/>} />

        <Route path='/landingpage' exact element={<Landingpage />} />
        <Route path='/landingpage/all-landings' exact element={<AllLandings/>} />
        <Route path='/landingpage/add-edit-landing/:id' exact element={<AddEditLanding/>} />

        <Route path='/content' exact element={<Content />} />
        <Route path='/content/all-blogs' exact element={<AllBlogs/>} />
        <Route path='/content/add-edit-blog/:id' exact element={<AddEditBlog/>} />

        <Route path='/testimonials' exact element={<Testimonials />} />
        <Route path='/testimonials/add-edit-landing/:id' exact element={<AddEditTestimonials/>} />
        <Route path='/testimonials/all-landings' exact element={<AllTestimonials/>} />
        <Route
          path="/"
          exact
          element={ <Navigate to="/user" replace={true}/> }
        />
        {/* blogs */}
        <Route path='/blogs/all-blogs' exact element={<RealAllBlogs/>} />
        <Route path='/blogs/add-edit-blog/:id' exact element={<AddRealEditBlog/>} />
        <Route path='/blogs' exact element={<Blogs />} />
        {/* gallary */}
        <Route path='/gallary/all-blogs' exact element={<GallaryAllBlogs/>} />
        <Route path='/gallary/add-edit-blog/:id' exact element={<AddEditGallary/>} />
        <Route path='/gallary' exact element={<Gallary />} />

        <Route path='/clients/all-blogs' exact element={<ClientsAllBlogs/>} />
        <Route path='/clients/add-edit-blog/:id' exact element={<AddEditClients/>} />
        <Route path='/clients' exact element={<Clients />} />

        {/* studentcorner */}
        <Route path='/studentcorner' exact element={<Studentcorner />} />
        <Route path='/studentcorner/all-blogs' exact element={<StudentcornerAllBlogs/>} />
        <Route path='/studentcorner/add-edit-blog/:id' exact element={<AddEditStudentcorner/>} />
      
        </Routes>
        </>
  );
}

export default App;
