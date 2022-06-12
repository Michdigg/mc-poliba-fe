import * as React from 'react';
import {ButtonGroup, Step, StepLabel, Stepper} from "@mui/material";
import Button from "@mui/material/Button";
import Navbar from "./Navbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {green} from "@mui/material/colors";

const ChefPanel= () =>
{
    const location = useLocation();
    const [orders, setOrders] = React.useState([]);
    const [acceptButtonDisable, setAcceptButtonDisable] = React.useState('false');
    const [uploadButtonColor, setUploadButtonColor] = React.useState();

    const uploadButtonClicked = (e) => {
        setAcceptButtonDisable('true')
        setUploadButtonColor("gray")
        e.target.disabled = acceptButtonDisable
    }



    useEffect(() => {
        fetch("http://localhost:8080/orders")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(location.state)
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
            {
                orders.map((order) => (
                    <Grid container spacing={2} style={{padding: "30px"}} key={order._id}>
                        <Grid item xs={2}>
                            <Typography variant="h6" component="div" style={{fontFamily: "Secular One, sans-serif"}}>
                                ID Ordine : {order._id}
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <ButtonGroup  variant="contained" aria-label="outlined primary button group" >
                                <Button  onClick={uploadButtonClicked} style={{backgroundColor: uploadButtonColor}}>Accetta</Button>
                                <Button>In preparazione</Button>
                                <Button>Completato</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                ))
            }

            </div>
    );

}

export default ChefPanel;