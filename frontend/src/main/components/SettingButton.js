import React from "react";
import {connect} from "react-redux"
import {createUseStyles} from 'react-jss';

import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import {IconButton} from "@mui/material";

import SettingButtonStyle from './../../jss/components/SettingButtonStyle.js';

const useStyles = createUseStyles(SettingButtonStyle)


const SettingButton = (props) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <IconButton
                startIcon={<SettingsIcon />}
                onClick={handleClick}
                aria-label="setting"
            >
                <SettingsIcon/>
            </IconButton>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div className={classes.popover}>
                    {JSON.stringify(props.settings)}
                </div>
            </Popover>

        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(SettingButton)