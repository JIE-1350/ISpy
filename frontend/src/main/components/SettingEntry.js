import React, {useEffect} from "react";
import {connect} from "react-redux"
import {createUseStyles} from 'react-jss';

import SettingEntryStyle from './../../jss/components/SettingEntryStyle.js';
import TextField from "@mui/material/TextField";
import {key} from "wait-on/exampleConfig";

const useStyles = createUseStyles(SettingEntryStyle)


const SettingEntry = (props) => {
    const classes = useStyles()
    const {setting} = props
    const [value, setValue] = React.useState(props.settings[setting]);

    useEffect(() => {
        setValue(props.settings[key]);
    }, [props.settings[key]]);

    return (
        <div className={classes.TextFieldContainer}>
            <TextField
                className={classes.textField}
                label={setting}
                value={value}
                variant="outlined"
                onChange={e => {
                    props.settings[setting] = e.target.value;
                }}
                size={'small'}
            />
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(SettingEntry)