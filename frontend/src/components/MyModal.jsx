import React, { Fragment } from 'react'
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';

function MyModal(props) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Fragment>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
            >
                <Fade in={props.open}>
                    <Box sx={style}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <label style={{ fontWeight: 'bold' }}>{props.heading}</label>
                            </Grid>

                            <Grid item xs={4}>
                                <CancelIcon onClick={() => props.closeModal()} style={{ float: 'right', cursor: 'pointer' }} />
                            </Grid>
                        </Grid>

                        <Divider sx={ {mt: 1, mb: 2} } />

                        {/* Main Content */}
                        {props.children}
                    </Box>
                </Fade>
            </Modal>
        </Fragment>
    )
}

export default MyModal