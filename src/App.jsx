import {useEffect, useState} from "react"
import axios from "axios"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Jvalley
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {


  const [dataUser, setDataUser] = useState([])
  const handle_register = (e)=>{
    e.preventDefault()

    const fd = new FormData()

    fd.append("email", e.target.email.value)
    fd.append("password", e.target.password.value)
    // fd.append("avatar", e.target.avatar.files[0])
    
    axios("http://localhost:9000/api/user_register",{
      method : "POST",
      headers : {
        "content-type" : "multipart/form-data"
      },
      data : fd
    })
    .then(result=>{
      console.log(result.data.query);
      window.location.reload()
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  
  const registerRead = ()=>{
    axios("http://localhost:9000/api/user_read_all",{
      method : "GET"
    })
    .then((result)=>{
      console.log(result);
      setDataUser(prev => prev = result.data.query)
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    registerRead()
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://lh3.googleusercontent.com/-QBN_ctsPe5BTPw0k1M_EVhrksNJIEEz21yOF6iCtJxGq8o08WkvO_oW9K_FoqzRHsz1Mj6uLUH8yufuZQ=w768-h768-n-o-v1',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handle_register} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
         
      <div className="data_user">
      <h3 className="judul">Data User</h3>
      <table className="user">
         <thead className="formUser">
         <tr >
           <th>No.</th>
           <th>Email</th>
           <th>Password</th>
           {/* <th>Photo</th>
           <th>Action</th> */}
         </tr>
         </thead>

         <tbody >
           {dataUser.map((e)=>{
            return(
              <tr className="formUser">
                <td>{e.id}</td>
                <td>{e.email}</td>
                <td>{e.password}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
    </ThemeProvider>
  );
}