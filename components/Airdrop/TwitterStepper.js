import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepIcon from '@mui/material/StepIcon';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { Check } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import TwitterIcon from '@mui/icons-material/Twitter';
import ReplyIcon from '@mui/icons-material/Reply';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import { useTheme, } from '@mui/material/styles';
import TextMobileStepper from "./TextMobileStepper";
import { Avatar, Badge } from '@mui/material';

//import 'twitter-status';
//import Tweet from 'react-tweet';

const Twitter = require('twitter-v2');

//import {TwitterStepFollow} from './TwitterStepper/TwitterStepFollow';

const steps = [
  {
    label: 'Connect with your twitter account BIS',
    description: `To authenticate your are the twitter user.`,
  },
  {
    label: 'Connect with your twitter account',
    description: `To authenticate your are the twitter user.`,
  },
  {
    label: 'Follow the WinnoBearzNFT on twitter',
    description:
      'You will be able to go on the next step.',
  },
  {
    label: 'Fill out the actions',
    description: `Like, reply and retweet the tweet under.`,
  },
];



/*
<TwitterFollowButton
    screenName={'WinnoBearz'} options={{size:'large', showCount:false,}}
  />

<TwitterTweetEmbed tweetId="1528427591333462016" options={{align:'center', width:"200", maxWidth:'550px', 'conversation':'none', 'cards':'hidden' }} />
*/

const StepConnect = ({signInTwitter, signOutTwitter, handleBack, handleNext, userTwitter, isFollowerTwitter}) => {
  const theme = useTheme();
  return(
    <>
    <StepLabel optional={<Typography variant="caption" style={{color:theme.palette.text.primary}}>Connect your twitter account</Typography>}>
      <label style={{color:theme.palette.text.primary}}>Link to the website</label>
    </StepLabel>
    <StepContent color='brownbear' style={{color:theme.palette.text.primary}}>
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center', padding:'1vw'}}>
    <Badge
    overlap="circular"
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    badgeContent={
      <Avatar sx={{ width: 24, height: 24, background:theme.palette.bluetwitter.main, display:userTwitter ? 'block' : 'none' }}><TwitterIcon fontSize='small' /></Avatar>
    }
    >
    <Avatar src={userTwitter ? userTwitter.photoUrl : '/assets/img/others/pic-no-profile.png'} alt="pic profile user" sx={{ width: 56, height: 56, padding:'0.4vw',background:userTwitter ? theme.palette.white.main : theme.palette.grey.main, border:`1px solid ${theme.palette.bluetwitter.main}` }} />
    </Badge>

    <p>{userTwitter ? userTwitter.screenName : 'Not connected'}</p>
    <div>
    <Button
      startIcon={<TwitterIcon />}
      variant="outlined"
      color="primary"
      sx={{borderRadius:"2vw",margin: '0.3vw', fontWeight:'bold'}}
      //href={`https://twitter.com/intent/follow?user_id=${'1528402934538584064'}`}
      onClick={signInTwitter}
    >
           Login with Twitter
    </Button>
    <Button
      //startIcon={<TwitterIcon />}
      color="bluetwitter"
      sx={{fontWeight:'bold'}}
      //href={`https://twitter.com/intent/follow?user_id=${'1528402934538584064'}`}
      onClick={signOutTwitter}
    >
           Log out
    </Button>
    </div>
    </div>
    
              <Box sx={{ mb: 2, mt:3 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    color='brownbear'
                  >
                    Continue
                  </Button>
                  <Button
                    disabled={true}
                    //onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                    color='brownbear'
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
    
    </>
  )
}

const StepFollow = ({handleBack, handleNext, userTwitter, userFirestore, updateUserFirestore, isFollowerTwitter}) => {
  const theme = useTheme();
  const [allIsOkay, setAllIsOkay] = useState(userTwitter ? userTwitter.isFollower : false);

    const ButtonFollow = () => {
        var content = <div></div>;
        if( userTwitter!==null && !isFollowerTwitter ){
            content = <TwitterFollowButton screenName={'WinnoBearz'} options={{size:'large', showCount:false,}} />;
        }

        return(
            content
        )   
    }

    const TextStepFollow = () => {
      let content = <></>;
      if( userTwitter.isFollower ){
        content = <div style={{display:'flex', direction:'row', justifyContent:'start', alignContent:'center', alignItems:'center', justifyItems:'start'}}>
                <p style={{textAlign:'left', verticalAlign:'middle'}}>Following the <a href="https://twitter.com/WinnoBearz" target="_blank">@WinnoBearz Club</a> twitter account!
                <Check style={{verticalAlign:'text-bottom', display: userTwitter.isFollower ? 'inline-flex' : 'none'}} color="success" />
                </p>
            </div>;
      }else{
        content = <>
        <div style={{display:'flex', direction:'row', justifyContent:'start', alignContent:'center', alignItems:'center', justifyItems:'start'}}>
        <p style={{textAlign:'left', verticalAlign:'middle'}}>Click on the Follow button to join the <a href="https://twitter.com/WinnoBearz" target="_blank">@WinnoBearz Club</a> twitter account.
        <CancelIcon style={{verticalAlign:'text-bottom', display: !userTwitter.isFollower ? 'inline-flex' : 'none'}} color="error" /></p>
        </div>
        <ButtonFollow />
        </>;
      }

      return(
        content
      )

    }

    const ButtonMention = () => {
        var content = <div></div>;
        if( userTwitter!==null ){
            content =  <TwitterShareButton
    url={'https://bearzclub.io/airdrop'}
    options={{ size:'large', text: 'I now joined the BearzCoast! An amazing BearzDrop is going on for the 20th June 2022 !!!', via: userTwitter.screenName }}
    />
        }

        return(
            content
        )   
    }

    const TextStepMention = () => {
      let content = <></>;
      if( userTwitter.isFollower ){
        content = <div style={{display:'flex', direction:'row', justifyContent:'start', alignContent:'center', alignItems:'center', justifyItems:'start'}}>
                <p style={{textAlign:'left', verticalAlign:'middle'}}>Shared something about <a href="https://twitter.com/WinnoBearz" target="_blank">@WinnoBearz Club</a>!
                <Check style={{verticalAlign:'text-bottom', display: userTwitter.isRet ? 'inline-flex' : 'none'}} color="success" />
                </p>
            </div>;
      }else{
        content = <>
        <div style={{display:'flex', direction:'row', justifyContent:'start', alignContent:'center', alignItems:'center', justifyItems:'start'}}>
        <p style={{textAlign:'left', verticalAlign:'middle'}}>Click on the Tweet button to share something about <a href="https://twitter.com/WinnoBearz" target="_blank">@WinnoBearz Club</a>. Maybe kind ?
        <CancelIcon style={{verticalAlign:'text-bottom', display: !userTwitter.isFollower ? 'inline-flex' : 'none'}} color="error" /></p>
        </div>
        <ButtonMention />
        </>;
      }

      return(
        content
      )
    }

    const TextError = (error, message='') => {
      let content = <></>;
      if( error ){
        content = <></>
      }
      return(
        content
      )
    }

    const onClickVerify = async () => {
      let user = await updateUserFirestore(userFirestore, userTwitter.token, userTwitter.secret);
      console.log('click verify', user)
      
      if( user && user.isFollower ){
        setAllIsOkay(true);
      }else{
        setAllIsOkay(false);
      }
    }

    const onClickContinue = async () => {
      let user = await updateUserFirestore(userFirestore, userTwitter.token, userTwitter.secret);
      console.log('click conitnue', user)
      
      if( user && user.isFollower ){
        setAllIsOkay(true);
        handleNext();
      }else{
        setAllIsOkay(false);
      }
    }


    
    return(
            <>
            <StepLabel optional={<Typography variant="caption" style={{color:theme.palette.text.primary}}>Follow</Typography>}>
              <label style={{color:theme.palette.text.primary}}>Join us</label>
            </StepLabel>
            <StepContent color='brownbear' p={2} style={{color:theme.palette.text.primary}}>
            
           
            <div style={{display:'flex', direction:'row', justifyContent:'start', alignContent:'center', alignItems:'center', justifyItems:'start'}}>
        <p style={{textAlign:'left', verticalAlign:'middle'}}>
          Click on the Follow button to join the <a href="https://twitter.com/WinnoBearz" target="_blank">@WinnoBearz Club</a> twitter account.
        </p>
        </div>
        <ButtonFollow />

              <Box sx={{ mb: 2, mt:3 }}>
                <div>
                
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    //disabled={!allIsOkay}
                    sx={{ mt: 1, mr: 1 }}
                    //color='brownbear'
                  >
                    Continue
                  </Button>
                </div>
              </Box>
            </StepContent>
            </>
    )
}

const StepTweet = ({handleBack, handleNext, userTwitter, isFollowerTwitter}) => {
  const theme = useTheme();
  const tweetId = "1536357854579412992";
    return(
        <>
            <StepLabel optional={<Typography variant="caption" style={{color:theme.palette.text.primary}}>Like + Quote + Retweet</Typography>}>
              <label style={{color:theme.palette.text.primary}}>Share us on Twitter</label>
            </StepLabel>
            <StepContent color='brownbear' p={2} style={{margin: '1vh', }}>
            

            <div style={{display:theme.palette.mode === 'light' ? 'block' : 'none'}} >
          <TwitterTweetEmbed tweetId={tweetId} options={{align:'center', width:"550px", 'conversation':'none', 'theme':'light'}} />
          </div>
          <div style={{display:theme.palette.mode !== 'light' ? 'block' : 'none'}} >
          <TwitterTweetEmbed tweetId={tweetId} options={{align:'center', width:"550px", 'conversation':'none', 'theme':'dark'}} />
          </div>


          <div style={{display:'flex', direction:'row', justifyContent:'start', alignContent:'center', alignItems:'center', justifyItems:'start'}}>
        <p style={{textAlign:'left', verticalAlign:'middle'}}>
          Like + Quote + Retweet <a href={`https://twitter.com/WinnoBearz/status/${tweetId}`} target="_blank">the tweet above</a>. please {"\nHLM rezidanbt"}
        </p>
        </div>

            <div style={{margin: '1vh', display:'flex', direction:'row', justifyContent:'center', alignContent:'center', justifyItems:'center', alignItems:'center'}}>
            <Button
              startIcon={<ReplyAllIcon />}
              variant="contained"
              color="bluetwitter"
              sx={{borderRadius:"20px"}}
              href={`https://twitter.com/intent/retweet?tweet_id=1529570709386809345`}
            >
                   Retweet the tweet
            </Button>
            </div>
              <Box sx={{ mb: 2, mt:3 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    color='brownbear'
                  >
                    Continue
                  </Button>
                  <Button
                    //disabled={true}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                    color='brownbear'
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
        </>
    )
}



const StepVerify = ({handleBack, handleNext, userTwitter, isFollowerTwitter}) => {
  const theme = useTheme();
    return(
        <>
            <StepLabel optional={<Typography variant="caption" style={{color:theme.palette.text.primary}}>Just to be sure 🐻</Typography>}>
              <label style={{color:theme.palette.text.primary}}>Verify your informations</label>
            </StepLabel>
            
            <StepContent color='brownbear' p={2} style={{margin:'1vh', color:theme.palette.text.primary}}>
            <div style={{display:'flex', direction:'row', justifyContent:'center', alignContent:'center', alignItems:'center', justifyItems:'center'}}>
                <span style={{marginRight:'0.5vw'}}>Follow us</span><Check color="success" /><CancelIcon color="error" />
            </div>
            <div style={{display:'flex', direction:'row', justifyContent:'center', alignContent:'center', alignItems:'center', justifyItems:'center'}}>
                <span style={{marginRight:'0.5vw'}}>Mention</span><Check color="success" /><CancelIcon color="error" />
            </div>
            <div style={{display:'flex', direction:'row', justifyContent:'center', alignContent:'center', alignItems:'center', justifyItems:'center'}}>
                <span style={{marginRight:'0.5vw'}}>Like</span><Check color="success" /><CancelIcon color="error" />
            </div>
            <div style={{display:'flex', direction:'row', justifyContent:'center', alignContent:'center', alignItems:'center', justifyItems:'center'}}>
                <span style={{marginRight:'0.5vw'}}>Reply to</span><Check color="success" /><CancelIcon color="error" />
            </div>
            <div style={{display:'flex', direction:'row', justifyContent:'center', alignContent:'center', alignItems:'center', justifyItems:'center'}}>
                <span style={{marginRight:'0.5vw'}}>Retweet</span><Check color="success" /><CancelIcon color="error" />
            </div>

              <Box sx={{ mb: 2, mt:3 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    color='brownbear'
                  >
                    Verify
                  </Button>
                  <Button
                    //disabled={true}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                    color='brownbear'
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
        </>
    )
}

const StepGetDrop = ({handleBack, handleNext, userTwitter, isFollowerTwitter}) => {
  const theme = useTheme();
    return(
        <>
            <StepLabel optional={<Typography variant="caption" style={{color:theme.palette.text.primary}}>A free WinnoBearz NFT available 🐻</Typography>}>
              <label style={{color:theme.palette.text.primary}}>Get your airdrop</label>
            </StepLabel>
            <StepContent color='brownbear' p={2}>
                <div ><input style={{border:'1px solid black', borderRadius:'5vh', width:'80%', margin:'0.5vw'}} placeholder='enter your username or/and name on twitter' value={''} readOnly required /></div>
                <div><input style={{border:'1px solid black', borderRadius:'5vh', width:'80%', margin:'0.5vw'}} placeholder='enter your wallet public address' value={''} readOnly required /></div>
                <div><input style={{border:'1px solid black', borderRadius:'5vh', width:'80%',}} placeholder='enter your adress email' value={''} readOnly /></div>
              <Box sx={{ mb: 2, mt:3 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    color='brownbear'
                  >
                    Continue
                  </Button>
                  <Button
                    disabled={true}
                    //onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                    color='brownbear'
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
        </>
    )
}

const StepRecieved = ({handleBack, handleNext, userTwitter, isFollowerTwitter}) => {
  const theme = useTheme();
    return(
        <>
            <StepLabel optional={<Typography variant="caption" style={{color:theme.palette.text.primary}}>Last step</Typography>}>
              <label style={{color:theme.palette.text.primary}}>Notification</label>
            </StepLabel>
            <StepContent color='brownbear' p={2}>
                <div><input style={{border:'1px solid black', borderRadius:'5vh', width:'80%', margin:'0.5vw'}} placeholder='enter your wallet public address' value={''} readOnly required /></div>
                <div style={{display:'flex', direction:'row', justifyContent:'center', alignContent:'center', alignItems:'center', justifyItems:'center'}}>
                <span style={{marginRight:'0.5vw'}}>Recieve</span><Check color="success" /><CancelIcon color="error" />
                
                 </div>
                 <span>Explications avec image Opensea pour enlever de hidden</span>
              <Box sx={{ mb: 2, mt:3 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    color='brownbear'
                  >
                    Continue
                  </Button>
                </div>
              </Box>
            </StepContent>
        </>
    )
}

export default function TwitterStepper({signInTwitter, signOutTwitter, userTwitter, isFollowerTwitter, userFirestore, updateUserFirestore}) {
  const theme = useTheme();
  console.log('useeeeeer', userTwitter)
  const styleStepIcon = {
    '& .MuiStepLabel-root .Mui-completed': {
        color: 'bluetwitter.main', // circle color (COMPLETED)
    },
    '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
        {
        color: theme.palette.text.primary, // Just text label (COMPLETED)
        },
    '& .MuiStepLabel-root .Mui-active': {
        //color: 'red', // circle color (ACTIVE)
        //background:'red'
    },
    '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
        {
        color: 'blue', // Just text label (ACTIVE)
        },

    '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
        fill: theme.palette.black.main, // circle's number (ACTIVE)
    },
};
  const [activeStep, setActiveStep] = useState(0);
  //userTwitter={userTwitter} isFollowerTwitter={isFollowerTwitter}
    console.log({FOLLLLLOW: isFollowerTwitter})
    useEffect( () => {
        //setActiveStep(isFollowerTwitter ? 1 : 0);
    }, [isFollowerTwitter]);


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: {xs:350, sm:550}, maxWidth: {xs:400, sm:700},}}>

  <div style={{display:'flex', direction:'row', justifyContent:'center',}}>
  <TextMobileStepper updateUserFirestore={updateUserFirestore} signInTwitter={signInTwitter} signOutTwitter={signOutTwitter} userTwitter={userTwitter} isFollowerTwitter={isFollowerTwitter} />                              
  </div>   

  <twitter-status status={'1536357854579412992'}></twitter-status>

    <Stepper activeStep={activeStep} orientation="vertical" sx={{display:{xs:'none', sm:'block'},}}>

    
        {
          /*
          <Step key={'connect'} sx={styleStepIcon}>
            <StepConnect signInTwitter={signInTwitter} signOutTwitter={signOutTwitter} handleNext={handleNext} userTwitter={userTwitter} isFollowerTwitter={isFollowerTwitter} />
          </Step>
          */
        }
        
        <Step key={'follow'} sx={styleStepIcon}>
          <StepFollow handleBack={handleBack} handleNext={handleNext} userTwitter={userTwitter} userFirestore={userFirestore} updateUserFirestore={updateUserFirestore} isFollowerTwitter={isFollowerTwitter} />
        </Step>

        <Step key={'tweet'} sx={styleStepIcon}>
          <StepTweet handleBack={handleBack} handleNext={handleNext} userTwitter={userTwitter} isFollowerTwitter={isFollowerTwitter} />
        </Step>

        <Step key={'verify'} sx={styleStepIcon}>
          <StepVerify handleBack={handleBack} handleNext={handleNext} userTwitter={userTwitter} isFollowerTwitter={isFollowerTwitter} />
        </Step>

        <Step key={'get-airdrop'} sx={styleStepIcon}>
          <StepGetDrop handleBack={handleBack} handleNext={handleNext} userTwitter={userTwitter} isFollowerTwitter={isFollowerTwitter} />
        </Step>

        <Step key={'recieve'} sx={styleStepIcon}>
          <StepRecieved handleBack={handleBack} handleNext={handleNext} userTwitter={userTwitter} isFollowerTwitter={isFollowerTwitter} />
        </Step>
      </Stepper>
<div style={{display:'flex', direction:'row', justifyContent:'center', }}>


      </div> 
      {/*
      activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )
      */}


    </Box>
  );
}
