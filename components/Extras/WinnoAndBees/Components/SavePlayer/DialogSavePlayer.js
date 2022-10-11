import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Check } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function DialogSavePlayer({ open, setOpen, player, onClickAction }) {
    const handleClose = () => {
        setOpen(false);
    };

    const savePlayer = async () => {
        setOpen(false);
        await onClickAction(player);
    }

    return (
        <div>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} style={{ fontFamily: 'var(--text-style-title)', fontSize: 'small', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                    Save your data ?
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        twitter name : @{player.twitter.displayName}
                    </Typography>
                    <Typography gutterBottom>
                        wallet address : {player.walletAddress.slice(0, 8) + "..." + player.walletAddress.slice(-8)}
                    </Typography>
                    <Typography gutterBottom>
                        following WinnoBearz : {
                            player.twitter.isFollower ?
                                <Check style={{ verticalAlign: 'text-bottom', }} color="success" /> :
                                <CancelIcon style={{ verticalAlign: 'text-bottom', }} color="error" />
                        }
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={savePlayer}
                        style={{ fontFamily: 'var(--text-style-general)', fontSize: 'x-large', fontWeight: 'bold' }}
                    >
                        Save
                    </Button>
                    <Button
                        autoFocus
                        onClick={handleClose}
                        style={{ fontFamily: 'var(--text-style-general)', fontSize: 'x-large', color: 'red' }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}