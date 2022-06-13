import React, {useState, useEffect} from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepIcon from '@mui/material/StepIcon';
import StepContent from '@mui/material/StepContent';
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

import Box from '@mui/material/Box';
import { useTheme, } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const StepConnect = ({handleBack, handleNext, userTwitter, isFollowerTwitter}) => {
  const theme = useTheme();
  return(
    <>
<div style={{margin: '1vh'}}>
    <Button
      startIcon={<TwitterIcon />}
      variant="contained"
      color="bluetwitter"
      sx={{borderRadius:"20px"}}
      href={`https://twitter.com/intent/follow?user_id=${'1528402934538584064'}`}
    >
           Follow @WinnoBearz
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
                    disabled={true}
                    //onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                    color='brownbear'
                  >
                    Back
                  </Button>
                </div>
              </Box>    
    </>
  )
}

const StepFollow = ({handleNext, userTwitter, isFollowerTwitter}) => {
  const ButtonFollow = () => {
    var content = <div></div>;
    if( userTwitter!==null && !isFollowerTwitter ){
        content = <TwitterFollowButton screenName={'WinnoBearz'} options={{size:'large', showCount:false,}} />;
    }

    return(
        content
    )   
  }
  const ButtonMention = () => {
      var content = <div></div>;
      if( userTwitter!==null ){
          content =  <TwitterShareButton
  url={'https://bearzclub.io/mint'}
  options={{ size:'large', text: 'I now joined the Bearz Coast! An amazing place where we can buy @WinnoBearz NFT!', via: userTwitter.screenName }}
  />
      }

      return(
          content
      )   
  }

  return(
    <>
        <ButtonFollow />
        <ButtonMention />
      <Box sx={{ mb: 2, mt:3 }}>
        <div>
          
        </div>
      </Box>
    </>
  )
}

const StepTweet = ({handleBack, handleNext, userTwitter, isFollowerTwitter}) => {
  const theme = useTheme();
  const [mode, setMode] = useState(theme.palette.mode);
  useEffect( () => {
    let _mode = theme.palette.mode;
    setMode(_mode);
  }, [theme.palette.mode])
  return(
      <>
          <div style={{display:mode === 'light' ? 'block' : 'none'}} >
          <TwitterTweetEmbed tweetId="1529570709386809345" options={{align:'center', width:"550px", 'conversation':'none', 'cards':'hidden', 'theme':'light'}} />
          </div>
          <div style={{display:mode !== 'light' ? 'block' : 'none'}} >
          <TwitterTweetEmbed tweetId="1529570709386809345" options={{align:'center', width:"550px", 'conversation':'none', 'cards':'hidden', 'theme':'dark'}} />
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
                
              </div>
            </Box>
      </>
  )
}

const StepVerify = ({handleBack, handleNext, userTwitter, isFollowerTwitter}) => {
  return(
      <>
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
                
              </div>
            </Box>
      </>
  )
}

const StepGetDrop = ({handleBack, handleNext, userTwitter, isFollowerTwitter}) => {

  return(
      <>
<div ><input style={{border:'1px solid black', borderRadius:'5vh', width:'80%', margin:'0.5vw'}} placeholder='enter your username or/and name on twitter' value={''} readOnly required /></div>
              <div><input style={{border:'1px solid black', borderRadius:'5vh', width:'80%', margin:'0.5vw'}} placeholder='enter your wallet public address' value={''} readOnly required /></div>
              <div><input style={{border:'1px solid black', borderRadius:'5vh', width:'80%',}} placeholder='enter your adress email' value={''} readOnly /></div>
            <Box sx={{ mb: 2, mt:3 }}>
              <div>
              </div>
            </Box>
      </>
  )
}

const StepRecieved = ({handleBack, handleNext, userTwitter, isFollowerTwitter}) => {

  return(
      <>
            <div><input style={{border:'1px solid black', borderRadius:'5vh', width:'80%', margin:'0.5vw'}} placeholder='enter your wallet public address' value={''} readOnly required /></div>
              <div style={{display:'flex', direction:'row', justifyContent:'center', alignContent:'center', alignItems:'center', justifyItems:'center'}}>
              <span style={{marginRight:'0.5vw'}}>Recieve</span><Check color="success" /><CancelIcon color="error" />
              
               </div>
               <span>Explications avec image Opensea pour enlever de hidden</span>
            <Box sx={{ mb: 2, mt:3 }}>
              <div>
              </div>
            </Box>
      </>
  )
}





export default function TextMobileStepper({userTwitter, isFollowerTwitter}) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const steps = [
    /*
    {
      label: 'Connect to the website',
      caption: 'Twitter',
      description: <StepConnect handleNext={handleNext} userTwitter={userTwitter} isFollowerTwitter={isFollowerTwitter} />,
    },
    */
    {
      label: 'Join us',
      caption: 'Folllow + mention',
      description: <StepFollow handleNext={handleNext} userTwitter={userTwitter} isFollowerTwitter={isFollowerTwitter} />,
    },
    {
      label: 'Share us',
      caption: 'Like + Reply + Retweet',
      description: <StepTweet handleBack={handleBack} handleNext={handleNext} />,
    },
    {
      label: 'Verify',
      caption:'Just to be sure 🐻',
      description: <StepVerify />,
    },
    {
      label: 'Airdrop',
      caption:'Free NFT available 🐻',
      description: <StepGetDrop />,
    },
    {
      label: 'Notification',
      caption:'Last step',
      description: <StepRecieved />,
    },
  ];
  const maxSteps = steps.length;



  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1, display:{xs:'block', }, }} >
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          //direction:'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
          border: `1px solid ${theme.palette.background.border}`,
        }}
      >
        
        <Typography paragraph={true} sx={{fontWeight:'bold', marginRight:{xs:'3vw', sm:'0.2vw'}}}>{steps[activeStep].label + " ->"}</Typography>
        <Typography paragraph={true} variant='caption'>{steps[activeStep].caption}</Typography>
      </Paper>
      <Box sx={{ 
        maxWidth: 400, 
        width: '100%', 
        padding: 2,
        borderLeft: `1px solid ${theme.palette.background.border}`,
        borderRight: `1px solid ${theme.palette.background.border}`,
     }}>
        {steps[activeStep].description}
      </Box>
      <MobileStepper
        variant="dots" //text, progress, dots
        steps={maxSteps}
        position="static"
        color='bluewinno'
        activeStep={activeStep}
        sx={{
          border: `1px solid ${theme.palette.background.border}`,
          color:'red'
        }}
        nextButton={
          <Button
            size="small"
            color='primary'
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            style={{fontWeight:'bold'}}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" color='primary' onClick={handleBack} disabled={activeStep === 0} style={{fontWeight:'bold'}}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}
