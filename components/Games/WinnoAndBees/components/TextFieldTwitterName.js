import React, { useEffect, useRef, useState } from 'react';
import { InputAdornment, TextField } from "@mui/material"
import TwitterIcon from '@mui/icons-material/Twitter';


const TextFieldTwitterName = ({ player, handlePlayer, error }) => {
    //const [errorTwitter, setErrorTwitter] = useState(false);
    //const [messageTwitter, setMessageTwitter] = useState('');
    const errorTwitter = error.errorTwitter;
    const messageTwitter = error.messageTwitter;

    const onChangeTwitterName = (e) => {
        let _player = { ...player, twitterName: e.target.value, };
        handlePlayer({ ...player, twitterName: e.target.value, });
        console.log('player', _player);
        //setTwitterName(e.target.value);
        //console.log('twitter name', twitterName);
    }

    return (
        <TextField
            color='blue'
            onChange={onChangeTwitterName}
            //disabled={player ? true : false}
            value={player.twitterName}
            error={errorTwitter}
            helperText={messageTwitter}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <TwitterIcon color='blue' />
                    </InputAdornment>
                ),
            }}
            placeholder="twitter username"
            variant="outlined"
        />
    )
}

export default TextFieldTwitterName;