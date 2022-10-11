import React from 'react';
import Bee from '../../Classes/BeeClass';
import Enemy from '../../Classes/EnemyClass';
import Game from '../../Classes/GameClass';
import Player from '../../Classes/PlayerClass';
import Salmon from '../../Classes/SalmonClass';

import { PATH_IMG_BACKGROUND, PATH_IMG_BACKGROUND1, PATH_IMG_BACKGROUND2, 
    PATH_IMG_BACKGROUND3, PATH_IMG_BEE, PATH_IMG_ENEMY1, PATH_IMG_ENEMY2, PATH_IMG_ENEMY3, 
    PATH_IMG_GAME_OVER, PATH_IMG_LIFE0, PATH_IMG_LIFE1, PATH_IMG_LIFE2, PATH_IMG_LIFE3, PATH_IMG_PLAYER, 
    PATH_IMG_PLAYER_TOUCH, PATH_IMG_SALMON, PATH_IMG_SCORE, PATH_IMG_WINNER,PATH_MUSIC_GAME, 
    PATH_MUSIC_GAME_OVER, PATH_MUSIC_TOUCH_BEE, PATH_MUSIC_TOUCH_ENEMY, PATH_MUSIC_WINNER} from './constants';

const Playground = () => {
    return (
        <>
            <img id={Game.IMG_BACKGROUND} src={PATH_IMG_BACKGROUND} alt={Game.IMG_BACKGROUND} />
            <img id={Game.IMG_BACKGROUND1} src={PATH_IMG_BACKGROUND1} alt={Game.IMG_BACKGROUND1} />
            <img id={Game.IMG_BACKGROUND2} src={PATH_IMG_BACKGROUND2} alt={Game.IMG_BACKGROUND2}/>
            <img id={Game.IMG_BACKGROUND3} src={PATH_IMG_BACKGROUND3} alt={Game.IMG_BACKGROUND3} />

            <img id={Game.IMG_LIFE0} src={PATH_IMG_LIFE0} alt={Game.IMG_LIFE0} />
            <img id={Game.IMG_LIFE1}  src={PATH_IMG_LIFE1} alt={Game.IMG_LIFE1} />
            <img id={Game.IMG_LIFE2} src={PATH_IMG_LIFE2} alt={Game.IMG_LIFE2} />
            <img id={Game.IMG_LIFE3}  src={PATH_IMG_LIFE3} alt={Game.IMG_LIFE3} />
            <img id={Game.IMG_SCORE}  src={PATH_IMG_SCORE} alt={Game.IMG_SCORE} />

            <img id={Game.IMG_WINNER}  src={PATH_IMG_WINNER} alt={Game.IMG_WINNER} />
            <img id={Game.IMG_GAME_OVER}  src={PATH_IMG_GAME_OVER} alt={Game.IMG_GAME_OVER} />

            <img id={Player.IMG_PLAYER} src={PATH_IMG_PLAYER} alt={Player.IMG_PLAYER} />
            <img id={Player.IMG_PLAYER_TOUCH} src={PATH_IMG_PLAYER_TOUCH} alt={Player.IMG_PLAYER_TOUCH} />

            <img id={Enemy.IMG_ENEMY1} src={PATH_IMG_ENEMY1} alt={Enemy.IMG_ENEMY1} />
            <img id={Enemy.IMG_ENEMY2} src={PATH_IMG_ENEMY2} alt={Enemy.IMG_ENEMY2} />
            <img id={Enemy.IMG_ENEMY3} src={PATH_IMG_ENEMY3} alt={Enemy.IMG_ENEMY3} />

            <img id={Bee.IMG_BEE} src={PATH_IMG_BEE} alt={Bee.IMG_BEE} />
            <img id={Salmon.IMG_SALMON} src={PATH_IMG_SALMON} alt={Salmon.IMG_SALMON} />

            <audio id={Game.MUSIC_GAME} loop="loop">
                <source src={PATH_MUSIC_GAME} type="audio/mp3" />
            </audio>

            <audio id={Game.MUSIC_TOUCH_BEE}>
                <source src={PATH_MUSIC_TOUCH_BEE} type="audio/mp3" />
            </audio>

            <audio id={Game.MUSIC_TOUCH_ENEMY}>
                <source src={PATH_MUSIC_TOUCH_ENEMY} type="audio/mp3" />
            </audio>

            <audio id={Game.MUSIC_WINNER}>
                <source src={PATH_MUSIC_WINNER} type="audio/mp3" />
            </audio>

            <audio id={Game.MUSIC_GAME_OVER}>
                <source src={PATH_MUSIC_GAME_OVER} type="audio/mp3" />
            </audio>
        </>
    )
}

export default Playground;