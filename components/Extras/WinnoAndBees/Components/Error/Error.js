import React from 'react';
import { ERROR_GAME_STOPPED } from './constants';
import styleError from "./Error.module.css";

const Error = () => {
    return (
        <div className={`${styleError['error-game']}`}>
            <p>{'ERROR'}<br />{ERROR_GAME_STOPPED}</p>
        </div>
    )
}

export default Error;