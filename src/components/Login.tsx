import {TextField, Stack, Card, ButtonGroup, Button} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import config from "../config.json";
import { useNavigate } from "react-router-dom";

type LoginProps = {
    setIsAuthenticated: () => void
};

const Login: React.FC<LoginProps> = (props : LoginProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const loginHandler = async () => {
        if(email.length < 6){
            return;
        }
        if(password.length < 6){
            return;
        }
        const response = await axios.post(`${config.serverURL}/users/login`, 
            {Password: password, Email: email});
        if(response.status == 200){
            props.setIsAuthenticated()
            navigate("/");
        }
    } 

    const registerHandler = async () => {
        if(email.length < 6){
            return;
        }
        if(password.length < 6){
            return;
        }
        const response = await axios.post(`${config.serverURL}/users/register`, 
            {Password: password, Email: email});
        if(response.status == 200){
            props.setIsAuthenticated();
            navigate("/");
        }
    }

    const onEmailChangedHandler = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChangedHandler = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div>
            <Card >
                <Stack 
                padding={4}
                spacing={4}>
                    <TextField
                    value={email}
                    onChange={onEmailChangedHandler}
                    required
                    id="outlined-required"
                    label="E-mail"
                    color="primary"
                    />
                    <TextField
                    value={password}
                    onChange={onPasswordChangedHandler}
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    />
                    <ButtonGroup aria-label="outlined primary button group">
                        <Button onClick={loginHandler}>Login</Button>
                        <Button onClick={registerHandler}>Register</Button>
                    </ButtonGroup>
                </Stack>
            </Card>
        </div>
    )
};

export default Login;