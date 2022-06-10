import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {green} from "@mui/material/colors";
import {useState} from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {Link, Outlet} from "react-router-dom";
import "./Navbar.css";
import Badge from "@mui/material/Badge";

const pages = ['Shopping Cart', 'My orders'];
const settings = ["login", "logout"];

const Navbar = (props) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [isLogged, setLogin] = React.useState(false);
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
                <Typography textAlign="center">login</Typography>
            </MenuItem>
        );
    }

    return (
        <AppBar position="static" style={ {background: '#239e5a'} }>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        href="/"
                        sx={ {
                            textDecoration: 'none',
                            fontFamily: "Lobster, cursive"
                        } }
                        style={ {color: '#F9D923'} }
                    >
                        McPoliba
                    </Typography>
                    <Box sx={ {flexGrow: 1, display: {xs: 'none', md: 'flex'}} } style={{paddingLeft: "5%", paddingTop: "7px"}}>
                            <Button
                                key={"orders"}
                                sx={ { color: 'white', display: 'block', fontFamily: "Secular One, sans-serif", fontSize: "18px"} }
                                href={"/orders"}
                            >
                                MY ORDERS
                            </Button>
                    </Box>
                    <div className="iconDiv">
                        <Badge color="secondary" badgeContent={props.cart?.length}>
                            <Button href={"/shoppingCart"} style={ {color: 'white'} }>
                                <ShoppingCartIcon style={{cursor: "pointer"}} />
                            </Button>
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