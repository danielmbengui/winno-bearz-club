import React, { useEffect, useRef, useState } from 'react';
import { ERROR_GAME_STOPPED } from '../lib/constants';
import styleWinnoAndBees from "../WinnoAndBees.module.css";


const ErrorGame = ({restartGameComponent}) => {
    return(
        <div className={`${styleWinnoAndBees['div-error-game']}`}>
            <p >{ERROR_GAME_STOPPED}</p>
            {restartGameComponent}
        </div>
    )
}

export default ErrorGame;