import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import * as React from 'react';
import Navbar from "./Navbar";
import './HomePage.css';
import {useEffect} from "react";
import Grid from '@mui/material/Grid';
import {useLocation} from "react-router-dom";

const  HomePage= (props) =>
{
    const location = useLocation()
    const burgerResourceImg = "https://i0.wp.com/www.fruitbookmagazine.it/wp-content/uploads/2020/11/A-McDonald-s-PLT-burger-with-a-Beyond-Meat-plantbased-patty.jpg?ssl=1"

    const [products, setProducts] = React.useState([]);
    const [cart, setCart] = React.useState(location.state?.cart ? location.state.cart : []);

    useEffect(() => {
        fetch("http://localhost:8080/getProducts", {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin' : 'http://localhost:8080'
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setProducts(result);
                },
                (error) => {
                    console.log(error)
                }
            )
    }, [])

    let addToCart = (product) => {
        return () => {
            if (product.amount === undefined) {
                product.amount = 1;
            }
            const index = cart.findIndex((item) => item.name === product.name )
            if (index >= 0) {
                setCart(cart.map((item) => {
                    if (item.name === product.name)
                        item.amount++
                    return item
                }))
            }
            else {
                setCart ([...cart, product])
            }
            console.log(cart)
        }
    }

    return(
        <div>
            <Navbar cart={cart}/>
            <div className={"homePageContainer"}>
                <Grid container spacing={2} style={{padding: "10px"}}>
                        {
                            products.map((product) => (
                                <Grid item xs={3} key={product.name}>
                                <Card >
                                    <CardMedia
                                        component="img"
                                        src={burgerResourceImg}
                                    />
                                    <CardContent unselectable={"on"}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.price} $
                                        </Typography>
                                    </CardContent >
                                    <CardActions style={{float: "right"}}>
                                        <Box
                                            sx={{
                                                color: 'action.active',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                '& > *': {
                                                    marginBottom: 2,
                                                },
                                                '& .MuiBadge-root': {
                                                    marginRight: 4,
                                                },
                                            }}
                                        >
                                        </Box>
                                        <Button size="small" color="primary" onClick={addToCart(product)}>
                                            ADD TO CART
                                        </Button>
                                    </CardActions>
                                </Card>
                                </Grid>
                            ))
                        }
                </Grid>
            </div>
        </div>
    )



}

export default HomePage;