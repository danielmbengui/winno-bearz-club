import React from 'react';

import { PATH_IMG_BACKGROUND, PATH_IMG_BACKGROUND1, PATH_IMG_BACKGROUND2, 
    PATH_IMG_BACKGROUND3, PATH_IMG_BEE, PATH_IMG_ENEMY1, PATH_IMG_ENEMY2, PATH_IMG_ENEMY3, 
    PATH_IMG_GAME_OVER, PATH_IMG_LIFE0, PATH_IMG_LIFE1, PATH_IMG_LIFE2, PATH_IMG_LIFE3, PATH_IMG_PLAYER, 
    PATH_IMG_PLAYER_TOUCH, PATH_IMG_SALMON, PATH_IMG_SCORE, PATH_IMG_WINNER,PATH_MUSIC_GAME, 
    PATH_MUSIC_GAME_OVER, PATH_MUSIC_TOUCH_BEE, PATH_MUSIC_TOUCH_ENEMY, PATH_MUSIC_WINNER} from './constants';

const Playground = () => {
    return (
        <>
            <img id={'imgBackground'} src={PATH_IMG_BACKGROUND} alt={'imgBackground'} />
            <img id={'imgBackground1'} src={PATH_IMG_BACKGROUND1} alt={'imgBackground1'} />
            <img id={'imgBackground2'} src={PATH_IMG_BACKGROUND2} alt={'imgBackground1'}/>
            <img id={'imgBackground3'} src={PATH_IMG_BACKGROUND3} alt={'imgBackground1'} />

            <img id={'imgLife0'} src={PATH_IMG_LIFE0} alt={'imgLife0'} />
            <img id={'imgLife1'}  src={PATH_IMG_LIFE1} alt={'imgLife1'} />
            <img id={'imgLife2'} src={PATH_IMG_LIFE2} alt={'imgLife2'} />
            <img id={'imgLife3'}  src={PATH_IMG_LIFE3} alt={'imgLife3'} />
            <img id={'imgScore'}  src={PATH_IMG_SCORE} alt={'imgScore'} />

            <img id={'imgWinner'}  src={PATH_IMG_WINNER} alt={'imgWinner'} />
            <img id={'imgGameOver'}  src={PATH_IMG_GAME_OVER} alt={'imgGameOver'} />

            <img id={'imgPlayer'} src={PATH_IMG_PLAYER} alt={'imgPlayer'} />
            <img id={'imgPlayerReverse'} src={PATH_IMG_PLAYER_TOUCH} alt={'imgPlayerReverse'} />

            <img id={'imgEnemy1'} src={PATH_IMG_ENEMY1} alt={'imgEnemy1'} />
            <img id={'imgEnemy2'} src={PATH_IMG_ENEMY2} alt={'imgEnemy2'} />
            <img id={'imgEnemy3'} src={PATH_IMG_ENEMY3} alt={'imgEnemy3'} />

            <img id={'imgBee'} src={PATH_IMG_BEE} alt={'imgBee'} />
            <img id={'imgSalmon'} src={PATH_IMG_SALMON} alt={'imgSalmon'} />

            <audio id={'musicGame'} loop="loop">
                <source src={PATH_MUSIC_GAME} type="audio/mp3" />
            </audio>

            <audio id={'musicTouchBee'}>
                <source src={PATH_MUSIC_TOUCH_BEE} type="audio/mp3" />
            </audio>

            <audio id={'musicTouchEnemy'}>
                <source src={PATH_MUSIC_TOUCH_ENEMY} type="audio/mp3" />
            </audio>

            <audio id={'musicWinner'}>
                <source src={PATH_MUSIC_WINNER} type="audio/mp3" />
            </audio>

            <audio id={'musicGameOver'}>
                <source src={PATH_MUSIC_GAME_OVER} type="audio/mp3" />
            </audio>
        </>
    )
}

export default Playground;