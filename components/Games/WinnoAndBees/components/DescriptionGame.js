import styleWinnoAndBees from "../WinnoAndBees.module.css";

const DescriptionGame = ({show, scoreToWin}) => {

    return(
        <div className={`${styleWinnoAndBees['div-main']}`} style={{display: show ? 'flex' : 'none'}}>
            <img id="logo" src={"/assets/img/logo.png"} alt="logo" width={'10%'} />

            <p className={`${styleWinnoAndBees['description-game']}`}>
                Help Winno to avoid the BelzeBearzs. <br/>
                EAT {scoreToWin} BEES TO WIN AN AIRDROP !!!
            </p>
        </div>
    )
}

export default DescriptionGame;