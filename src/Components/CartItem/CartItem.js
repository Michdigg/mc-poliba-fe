import * as React from 'react';
import './CartItem.css';

const  CartItem= (props) => {
    const burgerResourceImg = "https://i0.wp.com/www.fruitbookmagazine.it/wp-content/uploads/2020/11/A-McDonald-s-PLT-burger-with-a-Beyond-Meat-plantbased-patty.jpg?ssl=1"
    const [cart, setCart] = React.useState(props.cart)
    const [cartItem, setCartItem] =React.useState(props.cartItem)

    const removeItem = (cartItem) => {
        return () => {
            props.pull_cart(cartItem)
        }
    }

    const addOne = (cartItem) => {
        return () => {
            props.addOne(cartItem)
        }
    }

    const removeOne = (cartItem) => {
        return () => {
            props.removeOne(cartItem)
        }
    }

    return(
        <div className={"cartItem"}>
            <div className={"imgBox"}>
                <img src={burgerResourceImg} style={{ height : "120px" }}/>
            </div>
            <div className={"about"}>
                <h1 className={"title"}>{ props.cartItem.name }</h1>
                <h3 className={"subtitle"}>{ props.cartItem.name }</h3>
            </div>
            <div className={"counter"}>
                <div className={"btn"} onClick={addOne(props.cartItem)}>+</div>
                <div className={"count"}>{props.cartItem.amount}</div>
                <div className={"btn"} onClick={removeOne(props.cartItem)}>-</div>
            </div>
            <div className={"price"}>
                <div className={"amount"} >{ props.cartItem.price }</div>
                <div className={"remove"} ><u onClick={removeItem(props.cartItem)}>Remove</u></div>
            </div>
        </div>
    )



}

export default CartItem;