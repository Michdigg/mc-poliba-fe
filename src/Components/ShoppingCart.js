
import * as React from 'react';
import Navbar from "./Navbar";
import {
    Backdrop,
    Fade,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Modal,
    TextField
} from "@mui/material";
import CartItem from "./CartItem";
import './ShoppingCart.css';
import {useLocation} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const  ShoppingCart= (props) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: 10,
        p: 4,
        width: "50%",
        height: "30%"
    };

    const location = useLocation()
    const [cart, setCart] = React.useState(location.state?.cart ? location.state.cart : [])
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const pull_cart = (cartItem) => {
        const index = cart.findIndex(item => item === cartItem)
        setCart(cart.filter(item => item !== cartItem))
    }

    const addOne = (cartItem) => {
        setCart(cart.map((item)=> {
            if (item === cartItem)
                item.amount++
            return item
        }))
        console.log(cart)
    }

    const removeOne = (cartItem) => {
        setCart(cart.map((item)=> {
            if (item === cartItem && item.amount > 0)
                item.amount--
            return item
        }))
        console.log(cart)
    }

    const getTotalAmount = () => {
        let totalAmount = 0
        cart.forEach(el => totalAmount+= el.price*el.amount)
        return totalAmount
    }

    const completeOrder = () => {
        const data = {
            products: cart,
            amount: getTotalAmount()
        }
        fetch("http://192.168.1.139:8080/createOrder", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        })
        setCart([])
        handleClose()
    }

    return(
        <div>
            <Navbar cart={cart}/>
            <div className={"cartContainer"}>
                <div className={"cart"}>
                    <div className={"header"}>
                        <h3 className={ "heading" }>Shopping Cart</h3>
                        <h5 className={ "action" } onClick={() => setCart([])}>Remove all</h5>
                    </div>
                    {
                        cart.map((cartItem) => (
                            <CartItem cart={ cart } cartItem={cartItem} key={cartItem.name} pull_cart={pull_cart} addOne={addOne} removeOne={removeOne}/>
                        ))
                    }
                    <hr style={{
                        width: "66%",
                        float: "right",
                        marginRight: "5%"}}/>
                    <div className={"checkout"}>
                        <div className={"total"}>
                            <div>
                                <div className={"subtotal"}>Subtotal</div>
                                <div className={"items"}>{cart.length}</div>
                            </div>
                            <div className={"totalAmount"}>{getTotalAmount()}</div>
                        </div>
                        <button className={"button"} onClick={handleOpen}>Checkout</button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={open}>
                                <Box
                                    style={{'& > :not(style)': { m: 1, width: '25ch'}}}
                                    component="form"
                                    sx={ style }
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="outlined-basic" label="PAN" variant="outlined" style={{width: "100%"}}/>
                                    <div style={{marginTop: "5px"}}>
                                        <TextField id="outlined-basic" label="MM/YY" variant="outlined" style={{width: "48%", marginRight: "2%"}}/>
                                        <TextField id="outlined-basic" label="CVV" variant="outlined" style={{width: "48%", marginLeft: "2%"}}/>
                                    </div>
                                    <Button size="small" color="primary" onClick={completeOrder} style={{float: "right", marginTop: "10px"}}>
                                        Complete Order
                                    </Button>
                                </Box>
                            </Fade>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )



}

export default ShoppingCart;