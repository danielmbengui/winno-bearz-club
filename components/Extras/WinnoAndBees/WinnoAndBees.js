import React, { useEffect, useRef, useState } from 'react';
import styleWinnoAndBees from "./WinnoAndBees.module.css";
import Description from './components/Description/Description';
import Game from './classes/GameClass';
import Error from './components/Error/Error';
import Restart from './components/Restart/Restart';
import Start from './components/Start/Start';
import { isMobile, readPlayerJson, readPlayerStorage, updatePlayerJsonByTwitterUid, updatePlayerStorage } from './lib/functions';
import { DEFAULT_PLAYER } from './lib/constants';
import InfoPlayer from './components/InfoPlayer/InfoPlayer';
import SavePlayer from './components/SavePlayer/SavePlayer';
import PlayGround from './components/PlayGround/PlayGround';

const WinnoAndBees = () => {
    const refDivDescription = useRef();
    const refPlayground = useRef();
    const refDivError = useRef();
    const refDivStartGame = useRef();
    const refDivRestartGame = useRef();
    const refDivInfoPlayer = useRef();
    const refDivSavePlayer = useRef();

    const [game, setGame] = useState(null);
    const [player, setPlayer] = useState(DEFAULT_PLAYER);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(async () => {
        initComponentState();
        const playerStorage = await readPlayerStorage();
        if (playerStorage) {
            setPlayer(playerStorage);
        }
    }, []);

    const handlePlayer = (_player) => {
        setPlayer(_player);
    }

    const handleShowRestartButton = (_show) => {
        if (_show) {
            refDivRestartGame.current.style.display = 'flex';
        } else {
            refDivRestartGame.current.style.display = 'none';
        }
    }

    const initComponentState = () => {
        refDivDescription.current.style.display = 'flex';
        refPlayground.current.style.display = 'flex';
        refDivError.current.style.display = 'flex';
        refDivStartGame.current.style.display = 'flex';
        refDivInfoPlayer.current.style.display = 'flex';
        refDivSavePlayer.current.style.display = 'flex';
        refDivRestartGame.current.style.display = 'flex';
    }

    const showComponentGame = () => {
        refDivDescription.current.style.display = 'none';
        refDivError.current.style.display = 'none';
        refDivStartGame.current.style.display = 'none';
        refDivInfoPlayer.current.style.display = 'none';
        refDivSavePlayer.current.style.display = 'none';
        refDivRestartGame.current.style.display = 'none';
        refPlayground.current.style.display = 'flex';
    }

    const showComponentGameFinish = () => {
        refDivDescription.current.style.display = 'none';
        refDivError.current.style.display = 'none';
        refDivStartGame.current.style.display = 'none';
        refDivInfoPlayer.current.style.display = 'flex';
        refDivSavePlayer.current.style.display = 'none';
        refDivRestartGame.current.style.display = 'flex';
        refPlayground.current.style.display = 'flex';
    }


    const showComponentError = () => {
        refDivDescription.current.style.display = 'none';
        refDivError.current.style.display = 'flex';
        refDivStartGame.current.style.display = 'none';
        refDivRestartGame.current.style.display = 'flex';
        refPlayground.current.style.display = 'none';
        refDivInfoPlayer.current.style.display = 'none';
        refDivSavePlayer.current.style.display = 'none';
    }

    const showComponentSavePlayer = () => {
        refDivDescription.current.style.display = 'none';
        refDivError.current.style.display = 'none';
        refDivStartGame.current.style.display = 'none';
        refDivRestartGame.current.style.display = 'none';
        refPlayground.current.style.display = 'flex';
        refDivInfoPlayer.current.style.display = 'none';
        refDivSavePlayer.current.style.display = 'flex';
    }

    function openFullscreen() {

        const fullscreenEnabled = document.fullscreenEnabled
            || document.mozFullscreenEnabled
            || document.webkitFullscreenEnabled;

        if (fullscreenEnabled) {
            const canvas = refPlayground;
            const requestFullscreen =
                canvas.current.requestFullscreen ||
                canvas.current.mozRequestFullscreen ||
                canvas.current.webkitRequestFullScreen;
            requestFullscreen()
                .then(() => {
                    setIsFullScreen(true);
                    screen.orientation.lock("landscape-primary").then(function () {
                        // _LOCK_BUTTON.style.display = 'none';
                        // _UNLOCK_BUTTON.style.display = 'block';
                        //game.stopped = false;
                    })
                        .catch(function (error) {
                            //game.stopped = true;
                            alert(error);
                        });
                })
                .catch(() => console.error("Can't go full T_T"));
        }
    }

    function closeFullscreen() {
        const fullscreenEnabled = document.fullscreenEnabled
            || document.mozFullscreenEnabled
            || document.webkitFullscreenEnabled;

        if (fullscreenEnabled) {
            if (isFullScreen) {
                const exitFullscreen = document.exitFullscreen
                    || document.mozExitFullscreen
                    || document.webkitExitFullscreen;

                exitFullscreen()
                    .then(() => {
                        screen.orientation.unlock();
                        setIsFullScreen(false);
                    })
                    .catch((error) => {
                        alert(error);
                    });
            }

        }
    }

    const startGame = () => {
        showComponentGame();

        if (isMobile()) {
            openFullscreen(refPlayground, setIsFullScreen);
        }

        const canvas = refPlayground.current;
        const ctx = canvas.getContext('2d');
        canvas.width = isMobile() ? Game.IDEAL_MOBILE_WIDTH : Game.IDEAL_DESKTOP_WIDTH;
        canvas.height = isMobile() ? Game.IDEAL_MOBILE_HEIGHT : Game.IDEAL_DESKTOP_HEIGHT;
        let canvasPosition = canvas.getBoundingClientRect();
        const mouse = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            click: false,
        }

        let ratioDevice = 1;
        if (isMobile()) {
            ratioDevice = 2;

            canvas.addEventListener('touchmove', (event) => {
                let touchObj = event.changedTouches[0];
                mouse.click = true;
                mouse.x = parseInt(touchObj.clientX) - canvasPosition.left;
                mouse.y = parseInt(touchObj.clientY) - canvasPosition.top;
                event.preventDefault();
            });

            canvas.addEventListener('touchcancel', (event) => {
                mouse.click = true;
                mouse.x = canvasPosition.left;
                mouse.y = canvasPosition.top;
                event.preventDefault();
            });
        } else {
            canvas.addEventListener('mousemove', (event) => {
                mouse.click = true;
                mouse.x = event.x - canvasPosition.left;
                mouse.y = event.y - canvasPosition.top;
            });
            window.scrollTo(0, 0);
        }
        const game = new Game(canvas, mouse, ratioDevice, animate, player.unlimitedGame);
        game.startGame();
        setGame(game);

        async function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.gameFrame++;
            game.updateGameFrameElements();

            game.handleBackground();
            game.handleLife();
            game.playerUpdate();
            game.handleEnnemies();
            game.playerDraw();
            game.handleBees();
            game.handleSalmons();

            if (!game.paused && !game.stopped && !game.finished) {
                requestAnimationFrame(animate);
            }

            if (game.stopped) {
                game.musicSound.stop();
                showComponentError();
            }

            if (game.finished) {
                if (isMobile()) {
                    closeFullscreen();
                }
                game.finishGame();

                const _player_copy = JSON.parse(JSON.stringify(player));
                if (game.gameOver) {
                    _player_copy.nLooses += 1;
                    showComponentGameFinish();
                } else if (game.winner) {
                    _player_copy.nWins += 1;
                    if (!player.whitelisted && game.winnerWhitelist)
                        _player_copy.whitelisted = true;
                    if (!player.airdropped && game.winnerAirdrop) {
                        _player_copy.airdropped = true;
                        _player_copy.unlimitedGame = true;
                    }
                }
                _player_copy.nGames += 1;
                const playerJSON = await readPlayerJson(_player_copy);
                if (playerJSON) {
                    let _playerJSON_copy = JSON.parse(JSON.stringify(playerJSON));
                    if (game.score > _playerJSON_copy.bestScore)
                        _playerJSON_copy.bestScore = game.score;
                    if (game.winnerWhitelist)
                        _playerJSON_copy.whitelisted = true;
                    if (game.winnerAirdrop) {
                        _playerJSON_copy.airdropped = true;
                        _playerJSON_copy.unlimitedGame = true;
                    }
                    if (game.winner)
                        _playerJSON_copy.nWins += 1;
                    else
                        _playerJSON_copy.nLooses += 1;
                    _playerJSON_copy.nGames += 1;
                    await updatePlayerJsonByTwitterUid(_playerJSON_copy);
                    _player_copy.bestScore = _playerJSON_copy.bestScore;
                    _player_copy.whitelisted = _playerJSON_copy.whitelisted;
                    _player_copy.airdropped = _playerJSON_copy.airdropped;
                    _player_copy.whitelistSent = _playerJSON_copy.whitelistSent;
                    _player_copy.airdropSent = _playerJSON_copy.airdropSent;
                    _player_copy.nWins = _playerJSON_copy.nWins;
                    _player_copy.nLooses = _playerJSON_copy.nLooses;
                    _player_copy.nGames = _playerJSON_copy.nGames;
                    showComponentGameFinish();
                } else {
                    if (game.winner)
                        showComponentSavePlayer();
                }
                setPlayer(_player_copy);
                updatePlayerStorage(_player_copy);
            }
        }

        animate();

        window.addEventListener('resize', () => {
            canvasPosition = canvas.getBoundingClientRect();
        });

        window.addEventListener('scroll', () => {
            canvasPosition = canvas.getBoundingClientRect();
        });

        if (isMobile()) {
            canvas.addEventListener('fullscreenchange', () => {
                if (canvas.exitFullscreen || canvas.webkitExitFullscreen || canvas.msExitFullscreen) {
                    game.stopped = true;
                }
                canvasPosition = canvas.getBoundingClientRect();
            });

            canvas.addEventListener('webkitfullscreenchange', () => {
                if (canvas.exitFullscreen || canvas.webkitExitFullscreen || canvas.msExitFullscreen) {
                    game.stopped = true;
                }
                canvasPosition = canvas.getBoundingClientRect();
            });

            canvas.addEventListener('msfullscreenchange', () => {
                if (canvas.exitFullscreen || canvas.webkitExitFullscreen || canvas.msExitFullscreen) {
                    game.stopped = true;
                }
                canvasPosition = canvas.getBoundingClientRect();
            });

            canvas.addEventListener('mozfullscreenchange', () => {
                if (canvas.current.mozExitFullScreen || canvas.exitFullscreen || canvas.webkitExitFullscreen || canvas.msExitFullscreen) {
                    game.stopped = true;
                }
                canvasPosition = canvas.getBoundingClientRect();
            });

            screen.orientation.addEventListener('change', function () {
                if (screen.orientation.type === 'portrait-primary' || screen.orientation.type === 'portrait-secondary') {
                    if (!game.finished) {
                        game.stopped = true;
                    }
                }
                canvasPosition = canvas.getBoundingClientRect();
            });
        }
    }

    const restartGame = () => {
        setGame(null);
        initComponentState();
    }

    return (
        <div className={`page-component__bg_image_box`}>
            <div className="page-component__wrapper" style={{
                zIndex: 18,
                paddingTop: '5vh',
                paddingBottom: '5vh',
            }}>
                <div className={'container'}>
                    <div ref={refDivDescription} className={`${styleWinnoAndBees['flex-vertical']}`} >
                        <Description scoreToWhitelist={Game.SCORE_TO_WHITELIST} scoreToAirdrop={Game.SCORE_TO_AIRDROP} />
                    </div>
                    <div className={`${styleWinnoAndBees['flex-vertical']}`} >
                        <canvas ref={refPlayground} className={`${styleWinnoAndBees['canvas']}`}>
                            <PlayGround />
                        </canvas>
                    </div>

                    <div ref={refDivError} className={`${styleWinnoAndBees['flex-vertical']}`} >
                        <Error />
                    </div>
                    <div ref={refDivStartGame} className={`${styleWinnoAndBees['flex-vertical']}`} >
                        <Start startGame={async () => {
                            startGame();
                        }} />
                    </div>
                    <div ref={refDivInfoPlayer} className={`${styleWinnoAndBees['flex-vertical']}`} >
                        <InfoPlayer player={player} game={game} />
                    </div>
                    <div ref={refDivSavePlayer} className={`${styleWinnoAndBees['flex-vertical']}`} >
                        <SavePlayer player={player} handlePlayer={handlePlayer} handleShowRestartButton={handleShowRestartButton} />
                    </div>
                    <div ref={refDivRestartGame} className={`${styleWinnoAndBees['flex-vertical']}`}>
                        <Restart restartGame={restartGame} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WinnoAndBees;