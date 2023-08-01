import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";

function Quiz() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [userAnswer, setUserAnswer] = useState("");
    const [questionNumber, setQuestionNumber] = useState(1);
    const [score, setScore] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();
    const userEmail = location.state.email;

    const getQuizData = async () => {
        try {
            const response = await axios.post('https://iiofwkaddk.execute-api.us-east-1.amazonaws.com/prod', {"QN": questionNumber});
            const data = response.data;
            setQuestion(data.Question)
            setAnswer(data.Answer)
        } catch(error) {
            console.error(error);
        }
    };

    const handleAnswer = () => {
        let latestQuestionNumber = questionNumber;
        let latestScore = score;
        if(userAnswer.toLowerCase() === answer.toLowerCase()) {
            alert("Correct Answer!");
            setQuestionNumber(questionNumber + 1);
            latestQuestionNumber = questionNumber + 1;
            setScore(score + 10);
            latestScore = score + 10;
            if(latestQuestionNumber > 10) {
                navigate("/score", { state: {latestScore, userEmail} });
            }
        } else {
            alert("Wrong Answer!");
            setScore(score - 10);
        }
        setUserAnswer("")
    }

    const handleLeave = () => {
        const saveData = {
            "Email": userEmail,
            "LastQuestion": questionNumber,
            "LastScore": score
        }

        try {
            const response = axios.post('https://8eluugtgc8.execute-api.us-east-1.amazonaws.com/prod', saveData);
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    }

    const fetchLastSave = async () => {
        try {
            const response = await axios.post('https://9mdg9775t0.execute-api.us-east-1.amazonaws.com/prod', {'Email': userEmail})
            setScore(response.data.LastScore);
            setQuestionNumber(response.data.LastQuestion);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getQuizData();
    }, [questionNumber]);

    useEffect(() => {
        fetchLastSave();
    }, [])

    return (
        <div className="quiz">
            <form>
                <Typography variant="h5">Question {questionNumber}/10</Typography>
                <br />
                <Typography variant="h4">{question}</Typography>
                <br />
                <br />
                <TextField
                    label="Answer"
                    variant="outlined"
                    value={userAnswer}
                    onChange={(input) => {
                        setUserAnswer(input.target.value)
                    }}
                />
                <br />
                <br />
                <Button variant="contained" color="primary" onClick={handleAnswer}>Send Answer</Button>
            </form>
            <br />
            <br />
            <br />
            <Typography variant="body">Want to take a break?</Typography>
            <br />
            <br />
            <Button variant="contained" color="secondary" onClick={handleLeave}>Leave</Button>
        </div>
    )
}

export default Quiz