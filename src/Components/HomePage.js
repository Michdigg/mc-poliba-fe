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

const  HomePage= () =>
{
    const [count, setCount] = React.useState(1);


    return(
        <div>
            <List>
                <ListItem disablePadding>
                    <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                src="data:image/png;base64,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"
                            />
                            <CardContent unselectable={"on"}>
                                <Typography gutterBottom variant="h5" component="div">
                                    McRuta
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Prezzo 2 euro
                                </Typography>
                            </CardContent >
                        <CardActions>
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
                                <div>
                                    <Badge color="secondary" badgeContent={count}>
                                        <ShoppingCartIcon  />
                                    </Badge>
                                    <ButtonGroup>
                                        <Button
                                            aria-label="reduce"
                                            onClick={() => {
                                                setCount(Math.max(count - 1, 0));
                                            }}
                                        >
                                            <RemoveIcon fontSize="small" />
                                        </Button>
                                        <Button
                                            aria-label="increase"
                                            onClick={() => {
                                                setCount(count + 1);
                                            }}
                                        >
                                            <AddIcon fontSize="small" />
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </Box>
                            <Button size="small" color="primary">
                                Ordina
                            </Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                src="data:image/png;base64,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"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    McDiNoia
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Prezzo 3 euro
                                </Typography>
                            </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">
                                Ordina
                            </Button>
                        </CardActions>
                    </Card>
                </ListItem>
            </List>
        </div>
    )



}

export default HomePage;