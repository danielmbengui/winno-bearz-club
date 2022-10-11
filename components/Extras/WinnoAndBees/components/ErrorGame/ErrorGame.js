import React from 'react';
import { ERROR_GAME_STOPPED } from './constants';
import styleError from "./ErrorGame.module.css";

const ErrorGame = () => {
    return (
        <div className={`${styleError['error-game']}`}>
            <p>{'ERROR'}<br />{ERROR_GAME_STOPPED}</p>
        </div>
    )
}

export default ErrorGame;