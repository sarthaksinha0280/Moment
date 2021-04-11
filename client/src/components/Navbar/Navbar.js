import React,{useState,useEffect} from 'react';
import { AppBar,Avatar,Button,Toolbar,Typography } from '@material-ui/core';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from '../../images/moment.jpg';
import useStyles from './styles';
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';



const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        history.push('/auth');
        setUser(null);
    };


    useEffect(() => {
        const token = user?.token;
        if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) {
            logout();
          }
        }
        //JWT
        setUser(JSON.parse(localStorage.getItem('profile')));
    
    }, [location]);   //here if location change useEffect automatically run

    
    
    return (
        <AppBar className={classes.appBar} position="static">

            <div className={classes.brandContainer}>
                <img className={classes.image} src={moment} alt="icon" height="100"></img>
                <Typography className={classes.name}>By Sarthak Sinha</Typography>
            </div>


            <Toolbar className={classes.toolbar}>
                {user ? (
                <div className={classes.profile}>
                    <Avatar component={Link} to="/" className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h5">{user.result.name}</Typography>
                    <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
                </div>
                ):(
                     <Button component={Link} to="/auth" variant="contained" color="success">SignIn</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;
