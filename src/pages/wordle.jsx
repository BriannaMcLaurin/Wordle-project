
import Button from '@mui/material/Button';
import {useNavigate } from "react-router-dom";

export const Wordle =() => {
    const navigate = useNavigate();

    function Start(){
        navigate("/startGame")
    }

    return(
        <>
            <Button variant="outlined" onClick={e => Start()}>Play</Button>
            
        </>
    )
}