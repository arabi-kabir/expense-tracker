import React, { Fragment } from 'react'
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';

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
                // open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CancelIcon onClick={() => props.closeModal()} />
                    {props.children}
                </Box>
            </Modal>
        </Fragment>
    )
}

export default MyModal