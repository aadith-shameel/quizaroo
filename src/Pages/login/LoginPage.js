import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button } from '@mui/material';

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const loginData = {
            "Email": email,
            "Password": password
        }

        axios.post("https://mlrz42awva.execute-api.us-east-1.amazonaws.com/prod", loginData)
        .then(response => {
            if(response.data.status === 'success') {
                alert("Login Successful! Good Luck on the Game!")
                navigate("/quiz", { state: {email} })
            } else if(response.data.status === 'Failed') {
                alert("Incorrect Username and/or Password!")
            }
        })
        .catch(err => {
            alert("Error occured during log in on the server side!")
            console.error(err);
        })
    }

    const handleSignUp = () => {
        navigate('/signup');
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <Typography variant='h4'>Login</Typography>

                <br />
                <br />
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(input) => {
                        setEmail(input.target.value)
                    }}
                />
                
                <br />
                <br />

                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(input) => {
                        setPassword(input.target.value)
                    }}
                />

                <br />
                <br />

                <Button variant='contained' color='primary' type='submit'>Log In</Button>

                <br />
                <br />
                <br />
            </form>
            <Typography variant='body'>Don't have an account?</Typography>
            <br />
            <br />
            <Button variant='contained' color='secondary' onClick={handleSignUp}>Sign up</Button>
        </div>
    )
}

export default Login