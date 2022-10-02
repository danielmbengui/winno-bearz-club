import React, {useState, useEffect} from "react";
import { useTheme, } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Stack } from "@mui/material";

function ConfirmationDialogRaw(props) {
  const theme = useTheme();
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.checked);
  };

  return (
    <Dialog
      fullScreen
      
      sx={{ '& .MuiDialog-paper': { background: theme.palette.background.default},  }}
      open={open}
      {...other}
    >
      <DialogContent style={{display:"flex", direction:"column", justifyContent:"center", alignContent:"center", padding:"5vh"}}>
        <>
        <div style={{display:'inline-block'}}>
        <img src="/assets/advertise.gif" width={"100%"} height={"100%"} />
        </div>
        </>
      </DialogContent>
      <DialogActions style={{display:"flex", direction:"column", justifyContent:"center", alignContent:"center", paddingBottom:"2.5vh",}}>
        <Stack direction={{xs:"column", sm:"row"}} justifyContent="center" alignItems={"center"} spacing={1} width={"100%"} height={"100%"}>
        <Button color={theme.palette.mode === 'light' ? 'brownbeardark' : 'primary'} variant="contained" style={{fontWeight:"bold"}} onClick={handleOk}>
          Enter
        </Button>
        {/* <Button onClick={handleCancel}>Ok</Button> */}
        <FormControlLabel control={<Switch color={theme.palette.mode === 'light' ? 'brownbeardark' : 'primary'} checked={value} onChange={handleChange}  />} label="Never show again" />
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.bool.isRequired,
};

export default function DialogAdvertise({showAdvertise, updateStorageAdvertise, showAdvertiseSession, updateStorageAdvertiseSession}) {
  const [open, setOpen] = useState(!showAdvertise ? false : (!showAdvertiseSession ? false : true));
  const [value, setValue] = useState(false);

  const handleClose = (newValue) => {
    setOpen(false);
    setValue(newValue);
    updateStorageAdvertise(!newValue)
    updateStorageAdvertiseSession(false);
  };

  useEffect(() => {
    setOpen(!showAdvertise ? false : (!showAdvertiseSession ? false : true));    
  }, [showAdvertiseSession, showAdvertise]);

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ConfirmationDialogRaw
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
    </Box>
  );
}