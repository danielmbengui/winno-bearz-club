import { Button } from "@mui/material";
import styleWinnoAndBees from "../WinnoAndBees.module.css";

const StartGame = ({onClickEvent}) => {
    return(
        <Button
            className={`${styleWinnoAndBees['button-start-game']}`}
                //variant='contained'
                onClick={onClickEvent}
        >
            Start game
        </Button>
    )
}

export default StartGame;