import {Step, StepLabel, Stepper} from "@mui/material";
import Navbar from "../Navbar/Navbar";
import * as React from 'react';
import {useEffect} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useLocation} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";

const steps = [
    'In accettazione',
    'In preparazione',
    'Completato',
];


const Orders= () =>
{
    const location = useLocation()
    const [cart, setCart] = React.useState(location.state.cart)
    const [orders, setOrders] = React.useState([]);
    const [userContext, setUserContext] = useContext(UserContext);
    const [totalArticles, setTotalArticles] = React.useState(location.state?.totalArticles ? location.state.totalArticles : 0);


    useEffect(() => {
        fetch("http://localhost:8080/orders/".concat(userContext.details?.username))
            .then(res => res.json())
            .then(
                (result) => {
                    setOrders(result);
                },
                (error) => {
                    console.log(error)
                }
            )
    }, [])

    const returnStep = (step) => {
        switch (step) {
            case "pending":
                return 0;
            case "accepted":
                return 1;
            case "completed":
                return 2;
            default:
                return 0;
        }
    }

    return(
        <div>
            <Navbar cart={cart} totalArticles={totalArticles}/>
            <div className={"listContainer"}>
                <div className={"list"}>
                    {
                        orders.map((order) => (
                            <Grid container spacing={2} style={{padding: "30px"}} key={order._id}>
                                <Grid item xs={2}>
                                    <Typography variant="h6" component="div" style={{fontFamily: "Secular One, sans-serif"}}>
                                        ID Ordine : {order._id}
                                    </Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Stepper alternativeLabel style={{width: "100%"}} activeStep={returnStep(order.status)}>
                                        {steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Grid>
                            </Grid>
                        ))
                    }
                </div>
            </div>
        </div>
    )

}

export default Orders;