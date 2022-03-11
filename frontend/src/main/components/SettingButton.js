import React from "react";
import {connect} from "react-redux"
import {createUseStyles} from 'react-jss';

import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import {IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";

import SettingEntry from "./../components/SettingEntry";

import SettingButtonStyle from './../../jss/components/SettingButtonStyle.js';
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";

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

    function save() {
        fetch('http://127.0.0.1:8000/insight/update-settings', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(props.settings),
        })
            .then(response => response.json())
            .then(obj => {
                if (obj.status === 'success') {
                    props.dispatch(
                        {
                            type: "LOAD_SEARCH_TAB",
                            payload: obj
                        }
                    )
                } else {
                    throw(JSON.stringify(obj))
                }
            }).catch(error => {
                console.error('Error:', error);
            })
    }

    function reset() {
        fetch('http://127.0.0.1:8000/reset-settings')
            .then((res) => {
                return res.json();
            }).then((obj) => {
            if (obj.status === 'success') {
                props.dispatch(
                    {
                        type: "LOAD_SEARCH_TAB",
                        payload: obj
                    }
                )
            } else {
                throw(JSON.stringify(obj))
            }
        }).catch(e => {
            alert(e);
        })
    }

    return (
        <div>
            <IconButton
                startIcon={<SettingsIcon/>}
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
                    <Typography sx={{fontWeight: 'bold', textAlign: 'center'}}>Settings</Typography>
                    {Object.entries(props.settings).map(([key, value]) => (
                        <SettingEntry setting={key}/>
                    ))}
                    <Button
                        variant="contained"
                        onClick={save}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        onClick={reset}
                    >
                        Reset
                    </Button>
                </div>
            </Popover>

        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(SettingButton)