import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button } from '@mui/material';

function SignUp() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const SignupData = {
            "Name": name,
            "Email": email,
            "Password": password
        }

        axios.post("https://lcr79rqbu1.execute-api.us-east-1.amazonaws.com/prod", SignupData)
        .then(response => {
            alert("Sign Up Successful. Please Log In with the created account.")
            navigate('/login')
        })
        .catch(err => {
            alert("Something went wrong during sign up")
            console.error(err)
        })
    }

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div className="SignUp">
            <form onSubmit={handleSubmit}>
                <Typography variant='h4'>SignUp</Typography>

                <br />
                <br />
                
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(input) => {
                        setName(input.target.value)
                    }}
                />

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

                <Button variant='contained' color='primary' type='submit'>Sign Up</Button>

                <br />
                <br />
            </form>
            <Typography variant='body'>Already have an account?</Typography>
            <br />
            <br />
            <Button variant='contained' color='secondary' onClick={handleLogin}>Log In</Button>
        </div>
    )
}

export default SignUp