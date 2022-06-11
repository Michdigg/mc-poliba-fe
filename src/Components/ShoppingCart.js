
import * as React from 'react';
import Navbar from "./Navbar";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import CartItem from "./CartItem";
import './ShoppingCart.css';
import {useLocation} from "react-router-dom";

const  ShoppingCart= (props) => {
    const location = useLocation()
    const [cart, setCart] = React.useState(location.state?.cart ? location.state.cart : [])

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
                        <button className={"button"}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )



}

export default ShoppingCart;