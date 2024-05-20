import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText,Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './NavBar.css';
import Logo from './../images/logo.png';
import { useNavigate } from 'react-router-dom';

function NavBar({login,setLogin}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate=useNavigate();
  const handleLogout=()=>{
      setLogin(null);
      localStorage.removeItem('login');
      navigate('/login');
  }
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const appBarStyles = {
    backgroundColor: 'transparent', // Transparent background when the sidebar is open
    padding: '0px', // More padding when the sidebar is open
  };

  return (
    <>
      <AppBar position="static" style={appBarStyles}>
        <Toolbar style={{justifyContent:"space-between"}}>
          <div style={{display:"flex"}}>
            {
              localStorage.getItem('login')?
              (
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} aria-label="menu">
            <MenuIcon fontSize="large" style={{ color: '#335061' }} />
          </IconButton>
              ):
              (<div></div>)
              }
          <Link>
            <img src="https://mantrickstudios.com/static/media/mantrickstudios_logo.3ff4c2049d64bdbfcef7.webp" alt="mantrick Logo" id="logo" className="logo" />
          </Link>
          </div>
          {
          localStorage.getItem('login')?
          (
          <Button variant="contained"  onClick={handleLogout} style={{marginRight:"0px"}}>
         Logout
          </Button>
          ):
          (<div></div>)
          }
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)} className='customDrawer'>
            <List style={{marginTop:"15%"}}>
                <ListItem button component={Link} to="/content">
                    <ListItemText primary="Training Videos" style={{padding:"20px 50px"}}/>
                </ListItem>
                <ListItem button component={Link} to="/events">
                    <ListItemText primary="Photos" style={{padding:"20px 50px"}}/>
                </ListItem>
                <ListItem button component={Link} to="/landingpage">
                    <ListItemText primary="landingpage" style={{padding:"20px 50px"}}/>
                </ListItem>
                <ListItem button component={Link} to="/blogs">
                    <ListItemText primary="blogs" style={{padding:"20px 50px"}}/>
                </ListItem>
                <ListItem button component={Link} to="/gallary">
                    <ListItemText primary="gallary" style={{padding:"20px 50px"}}/>
                </ListItem>
                <ListItem button component={Link} to="/studentcorner">
                    <ListItemText primary="studentcorner" style={{padding:"20px 50px"}}/>
                </ListItem>
            </List>
      </Drawer>

    </>
  );
}

export default NavBar;
