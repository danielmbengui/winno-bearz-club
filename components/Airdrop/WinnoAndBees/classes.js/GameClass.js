import { SCORE_AIRDROP, SCORE_WHITELIST } from "../constants/numbers";

class Game {
    /*
    static SPEED = 5;
    static MAX_LIFE = 3;

    
    static scoreSecondEnemy = 3;
    static scoreThirdEnemy = 7;

    static SCORE_BACKGROUND_1 = 3;
    static SCORE_BACKGROUND_2 = 5;
    static SCORE_BACKGROUND_3 = 7;
    */
    static IDEAL_CANVAS_WIDTH = 1024;
    static IDEAL_CANVAS_HEIGHT = 512;

    static IDEAL_MOBILE_WIDTH = 700;
    static IDEAL_MOBILE_HEIGHT = 250;

    static SCORE_WHITELIST = SCORE_WHITELIST;
    static SCORE_AIRDROP = SCORE_AIRDROP;

    constructor() {
        this.started = true;
        this.finished = false;
    }

}

export default Game;