import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from './Logo';
const defaultTheme = createTheme();

const LogIn = (props) => {

  const [loginData, setLoginData] = useState({
    mobileNo: '',
    email: '',
    uuid: props.uuid,
  }, []);

  let history = useHistory();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = async (e) => {
    history.push('/NewConnection');

    // e.preventDefault();
    // if (loginData !== null) {
    //   try {
    //     const response = await fetch("http://localhost:5228/api/LoginPage", {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(loginData),

    //     });
    //     if (response.ok) {
    //       alert('Login Successfull');
    //       console.log('Login Data submitted successfully');

    //     } else {
    //       console.error('Error submitting data. Response Status: ' + response.status);
    //       const responseText = await response.text();
    //       console.error('Error Message: ' + responseText);
    //     }
    //   }
    //   catch (error) {
    //     console.error('Error:', error);
    //   }
    // }
    // else
    // {
    //   alert("Kindly fill the login details !!!");
    // }
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Logo />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SIGN IN
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              name="mobileNo"
              label="Mobile Number"
              type="text"
              id="mobileNo"
              value={loginData.mobileNo}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              value={loginData.email}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            {/* {loginError && <div>{loginError}</div>} */}
            <Grid container>

            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
};
export default LogIn;