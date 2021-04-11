import React, { useState } from 'react';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import useStyles from './styles';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';

const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  
  const classes = useStyles();  
  const dispatch = useDispatch();
  const history = useHistory();
    
    
    const [formData, setFormData] = useState(initialState);

    const handleSubmit=(e)=>{
        e.preventDefault();
        //console.log(formData);
        if(isSignUp){
          dispatch(signup(formData,history));
        }else{
            dispatch(signin(formData,history));
        }
    }

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleShowPassword = () => setShowPassword( (prevShowPassword) => !prevShowPassword )


    const switchMode = () => {
        setFormData(initialState);
        setIsSignUp((prevIsSignUp)=>!prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId; 
                            //?. this is type of operator which is not trown error if it access the res object
        try {
          dispatch({ type: AUTH, data: { result, token }});
          
          history.push('/');
        } catch (error) {
          console.log(error);
        }
      };
      
      const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign In was unsuccessfull.Try Again Later");
      };





    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>

                <Avatar className={classes.avatar}>
                    <VpnKeyRoundedIcon/>
                </Avatar>

                <Typography className={classes.text} component="h1" variant="h5">{isSignUp?'SignUp': 'SignIn' }</Typography>

                <form className={classes.form} onSubmit={handleSubmit}>

                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                        <>
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                        <Input name="lastName" label="LastName" handleChange={handleChange} half/>
                        </>
                        )}
                        <Input name="email" label="Email Address" type="email" handleChange={handleChange}/>
                        <Input name="password" label="Password" handleChange={handleChange} type={ showPassword ? "text" : "password" } handleShowPassword={handleShowPassword}/>
                        {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignUp ? 'Sign Up' : 'Sign In' }
                    </Button>

                    <GoogleLogin
                        clientId="681162978567-2dom9ir94tibi7d32vur0amip8ut7eb6.apps.googleusercontent.com"
                        render={(renderProps) => (
                          <Button 
                          className={classes.googleButton} 
                          color="primary" 
                          fullWidth 
                          onClick={renderProps.onClick} 
                          disabled={renderProps.disabled} 
                          startIcon={<Icon />} 
                          variant="contained">
                            Google Sign In
                          </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />  

                 

                <Grid container justify="flex-end">
                    <Grid item>      
                      <Button onClick={switchMode}>
                        { isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                      </Button>
                    </Grid>
                </Grid>
             

                </form>
            </Paper>
        </Container>
    )
}

export default Auth
