import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepIcon from '@mui/material/StepIcon';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const styleStepIcon = {
  '& .MuiStepLabel-root .Mui-completed': {
      color: 'bluetwitter.main', // circle color (COMPLETED)
  },
  '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
      {
      color: 'black', // Just text label (COMPLETED)
      },
  '& .MuiStepLabel-root .Mui-active': {
      color: 'black', // circle color (ACTIVE)
      //background:'red'
  },
  '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
      {
      color: 'white', // Just text label (ACTIVE)
      },

  '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
      fill: 'white', // circle's number (ACTIVE)
  },
};

export const TwitterStepFollow = () => {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return(
    <Step key={'yes'}
          sx={styleStepIcon}>
            <StepLabel 
                style={{color:'black'}}
                optional={
                    <Typography variant="caption">Last step</Typography>
                  }
            >
              <label>{'follow'}</label>
            </StepLabel>
            <StepContent color='brownbear'>
            {'follow us'}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    color='brownbear'
                  >
                    Finish
                  </Button>
                  <Button
                    //disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                    color='brownbear'
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
  )
}

//export default TwitterStepFollow;