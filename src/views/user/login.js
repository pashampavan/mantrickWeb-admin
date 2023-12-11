import React, { useState,useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
const Login = ({setLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [admins,setAdmins]=useState(null);
  const navigate = useNavigate();
  const [ user, setUser ] = useState(null);
  const [ profile, setProfile ] = useState(null);

  var checkUser=null;
    const login=useGoogleLogin({
      onSuccess:async (codeResponse) => {
        console.log(codeResponse);
        setUser(codeResponse);
        console.log(codeResponse);
        if(user)
        {
          console.log("exist user");
          const logres=await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            method:"GET",
            headers: {
                              Authorization: `Bearer ${user.access_token}`,
                              Accept: 'application/json',
                            
          }
        }
          );
          const gUser=await logres.json();
          console.log(gUser);
          // setProfile(gUser);
          // console.log(profile);
                      const keys=Object.keys(admins);
                      // console.log(profile.email);
                keys.forEach((key)=>{
                  const temp=admins[key];
                  if(temp.email===gUser.email)
                  {
                    
                      setLogin(true);
                      localStorage.setItem('login',true);
                      navigate('/dashboard'); // Navigate to the other page
                      return;
                  }
                })
        }
        else
        {
          console.log("No User");
        }
        },
        onError: (error) => console.log('Login Failed:', error)
        // flow:"implicit",
        // flow:"auth-code",
    });

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    const keys=Object.keys(admins);
    keys.forEach((key)=>{
      const temp=admins[key];
      console.log(temp);
      if(temp.userName===username)
      {
        if(temp.password===password)
        {
          setLogin(true);
        localStorage.setItem('login',true);
        navigate('/dashboard'); // Navigate to the other page
        return;
        }
      }
    })
    console.log('Invalid credentials');
    // if (username.trim() !== '' && password.trim() !== '') {
    //     console.log('Login successful!');
    //     setLogin(true);
    //     localStorage.setItem('login',true);
    //     navigate('/dashboard'); // Navigate to the other page
    // } else {
    //     console.log('Invalid credentials');
    // }
  };
  useEffect(
  () => {
      axios
              .get(`https://mantrickweb-default-rtdb.firebaseio.com/admins.json`, {
                      headers: {
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                    setAdmins(res.data);
                  })
                  .catch((err) => console.log(err));
        // if (user) {
            // axios
            //     .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            //         headers: {
            //             Authorization: `Bearer ${user.access_token}`,
            //             Accept: 'application/json'
            //         }
            //     })
            //     .then((res) => {
            //         setProfile(res.data);
            //         setLogin(true);
            //         localStorage.setItem('login',true);
            //         navigate('/dashboard');
            //     })
            //     .catch((err) => console.log(err)); 
        // }
    },
    [ ]
);
const logOut = () => {
  googleLogout();
  setProfile(null);
};
  return (
    <Box elevation={3} sx={{ p: 2, maxWidth: '400px', margin: '0 auto', marginTop: '200px' }}>
      <Typography variant="h5" align="center" gutterBottom>
        MantrickWeb Admin Login
      </Typography>
      <Box my={2}>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Box>
      <Box my={2}>
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Box my={2}>
        <Button variant="contained" fullWidth onClick={handleLogin}>
          Login
        </Button>
      </Box>


      <div>
            {profile ? (
                <div>
                    {/* <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br/>
                    <button onClick={logOut}>Log out</button>  */}
                </div>
            ) : (
              <button onClick={() => login()} style={{margin:"2px auto",cursor:"pointer"}}><img src='https://blog.hubspot.com/hubfs/image8-2.jpg' style={{width:"40px",margin:"3px auto"}}/></button>
              )}
      </div>
    </Box>
  );
};

export default Login;
