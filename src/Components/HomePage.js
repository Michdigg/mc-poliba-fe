import {Card, CardActions, CardContent, CardMedia, List, ListItem} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import * as React from 'react';
import Navbar from "./Navbar";
import './HomePage.css';
import {useEffect} from "react";
import Grid from '@mui/material/Grid';

const  HomePage= () =>
{
    const burgerResourceImg = "https://i0.wp.com/www.fruitbookmagazine.it/wp-content/uploads/2020/11/A-McDonald-s-PLT-burger-with-a-Beyond-Meat-plantbased-patty.jpg?ssl=1"

    const [count, setCount] = React.useState(1);
    const [products, setProducts] = React.useState([]);
    const [cart, setCart] = React.useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/getProducts")
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

    let order = (product) => {
        return () => {
            setCart([...cart, product])
            console.log(cart)
        }
    }

    return(
        <div>
            <Navbar cart={cart}/>
            <div className={"homePageContainer"}>
                <Grid container spacing={2} style={{margin: "2px"}}>
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
                                            {product.price}
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
                                        <Button size="small" color="primary" onClick={order(product)}>
                                            Ordina
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