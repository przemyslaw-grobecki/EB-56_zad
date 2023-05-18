import {AppBar, Toolbar, Box, IconButton} from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Typography from "@mui/material/Typography";
import Order from "../types/Order";

type HeaderProps = {
    openBasket : Function
};

const Header: React.FC<HeaderProps> = (props : HeaderProps) => {
    const openBasketHandler = () => {
        props.openBasket();
    };

    return (
            <AppBar style={{background:'#2E3B45'}}>
                <Toolbar>
                    <Typography>
                        Przemek Shop
                    </Typography>
                    <Box
                        m={1}
                        //margin
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end">
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={openBasketHandler}
                        >
                        <ShoppingBasketIcon/>
                    </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            )
};

export default Header;