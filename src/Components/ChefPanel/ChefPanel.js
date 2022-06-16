import * as React from 'react';
import {ButtonGroup, Step, StepLabel, Stepper} from "@mui/material";
import Button from "@mui/material/Button";
import Navbar from "../Navbar/Navbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import "./ChefPanel.css";

const ChefPanel= () =>
{
    const location = useLocation();
    const [orders, setOrders] = React.useState([]);

    const acceptOrder = (order) => {
        return (e) => {
            fetch("http://localhost:8080/acceptOrder", {
                method: 'POST',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({_id: order._id})
            })
            setOrders(orders.map((item) => {
                if (item._id === order._id)
                    item.status = "accepted"
                return item
            }))
        }
    }

    const completeOrder = (order) => {
        return (e) => {
            fetch("http://localhost:8080/completeOrder", {
                method: 'POST',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({_id: order._id})
            })
            setOrders(orders.map((item) => {
                if (item._id === order._id)
                    item.status = "completed"
                return item
            }))
        }
    }

    useEffect(() => {
        fetch("http://localhost:8080/orders")
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

    return (
        <div>
            <Navbar />
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
                                <Grid item xs={10} style={{display: "flex", justifyContent: "center"}}>
                                    <ButtonGroup  variant="contained" aria-label="outlined primary button group">
                                        <Button onClick={acceptOrder(order)} disabled={order.status !== "pending"}>Accetta</Button>
                                        <Button onClick={completeOrder(order)} disabled={order.status !== "accepted"}>Completato</Button>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                        ))
                    }
                </div>
            </div>
        </div>
    );

}

export default ChefPanel;