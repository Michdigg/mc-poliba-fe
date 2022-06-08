import Box from "@mui/material/Box";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Step, StepLabel, Stepper} from "@mui/material";
import Navbar from "./Navbar";

const steps = [
    'In accettazione',
    'In preparazione',
    'Completato',
];


const Orders= () =>
{
    return(
        <div>
            <Navbar />
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Primo ordine" />
                        <Stepper alternativeLabel style={{width: "100%"}}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Secondo ordine" />
                        <Stepper alternativeLabel style={{width: "100%"}}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </ListItem>
                </List>
            </Box>
        </div>
    )

}

export default Orders;