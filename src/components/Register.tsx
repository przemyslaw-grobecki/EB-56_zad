import {AppBar, Toolbar, Box, IconButton, TextField} from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Typography from "@mui/material/Typography";
import Order from "../types/Order";
import config from "./config.json";

type RegisterProps = {
};

const Register: React.FC<RegisterProps> = (props : RegisterProps) => {
    const openBasketHandler = () => {
    };

    return (
        <div>
            <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="Hello World"
            />
            <TextField
            disabled
            id="outlined-disabled"
            label="Disabled"
            defaultValue="Hello World"
            />
            <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            />
            <TextField
            id="outlined-read-only-input"
            label="Read Only"
            defaultValue="Hello World"
            InputProps={{
                readOnly: true,
            }}
            />
            <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            />
            <TextField id="outlined-search" label="Search field" type="search" />
            <TextField
            id="outlined-helperText"
            label="Helper text"
            defaultValue="Default Value"
            helperText="Some important text"
            />
        </div>
    )
};

export default Register;