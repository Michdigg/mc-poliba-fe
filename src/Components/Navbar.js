import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {Link, Outlet} from "react-router-dom";
import "./Navbar.css";
import Badge from "@mui/material/Badge";

const pages = ['Shopping Cart', 'My orders'];
const settings = ["login", "logout"];

const Navbar = (props) => {

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [isLogged, setLogin] = React.useState(true);
    const [cart, setCart] = React.useState(props.cart);
    const handleOpenUserMenu = ( event ) => {
        setAnchorElUser(event.currentTarget);
        console.log(props.cart)
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const login = () => {
        setAnchorElUser(null);
        setLogin(true)
        console.log(isLogged)
    };


    const logout = () => {
            fetch("http://localhost:8080/logout", {
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin' : 'http://localhost:8080'
                }
            })
        setAnchorElUser(null);
        setLogin(false)
        console.log(isLogged)
    };



    function LoginSettings ( props ) {
        if ( props.isLogged ) {
            return (
                <MenuItem key="logout" onClick={logout}>
                        <Typography textAlign="center">logout</Typography>
                </MenuItem>);
        }
        return (
            <MenuItem key="login" onClick={login}>
                <Link to="/login">
                <Typography textAlign="center">login</Typography>
                </Link>
            </MenuItem>
        );
    }

    return (
        <AppBar position="static" style={ {background: '#239e5a'} }>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/" state={{ cart: props.cart }} style={ { color: 'white', display: 'block', fontFamily: "Secular One, sans-serif", fontSize: "18px", textDecoration: "none"} }>
                    <Typography
                        variant="h4"
                        noWrap
                        sx={ {
                            textDecoration: 'none',
                            fontFamily: "Lobster, cursive"
                        } }
                        style={ {color: '#F9D923'} }
                    >
                        McPoliba
                    </Typography>
                    </Link>
                    <Box sx={ {flexGrow: 1, display: {xs: 'none', md: 'flex'}} } style={{paddingLeft: "5%", paddingTop: "7px"}}>
                        <Link to="/orders" state={{ cart: props.cart }} style={ { color: 'white', display: 'block', fontFamily: "Secular One, sans-serif", fontSize: "18px", textDecoration: "none"} }>
                            MY ORDERS
                        </Link>
                    </Box>
                    <div className="iconDiv">
                        <Badge color="secondary" badgeContent={props.cart?.length}>
                            <Link to="/shoppingCart" state={{ cart: props.cart }} style={ { color: 'white', display: 'block', fontFamily: "Secular One, sans-serif", fontSize: "18px", textDecoration: "none"} }>
                                <ShoppingCartIcon style={{cursor: "pointer"}} />
                            </Link>
                        </Badge>
                        <Box sx={ {flexGrow: 0} }>
                                <IconButton onClick={ handleOpenUserMenu }>
                                    <Avatar alt="Mc Poliba"/>
                                </IconButton>
                            <Menu
                                sx={ {mt: '45px'} }
                                id="menu-appbar"
                                anchorEl={ anchorElUser }
                                anchorOrigin={ {
                                    vertical: 'top',
                                    horizontal: 'right',
                                } }
                                keepMounted
                                transformOrigin={ {
                                    vertical: 'top',
                                    horizontal: 'right',
                                } }
                                open={ Boolean(anchorElUser) }
                                onClose={ handleCloseUserMenu }
                            >
                                <LoginSettings isLogged={isLogged}/>
                            </Menu>
                        </Box>
                    </div>
                </Toolbar>
            </Container>

            <Outlet />
        </AppBar>

    );

};

export default Navbar;