import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, Button } from "@mui/material";

function Score() {
    const navigate = useNavigate();
    const location = useLocation();
    const score = location.state.latestScore;
    const userEmail = location.state.userEmail;

    const handleLogOut = () => {
        const saveData = {
            "Email": userEmail,
            "LastQuestion": 1,
            "LastScore": 0
        }

        try {
            const response = axios.post('https://ar4gv7c0cb.execute-api.us-east-1.amazonaws.com/prod', saveData);
        } catch (error) {
            console.error(error);
        }
        navigate('/login');
    }

    return (
        <div className="score">
            <Typography variant="h4">Your final score is {score}</Typography>
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={handleLogOut}>Log Out</Button>
        </div>
    )
}

export default Score;