import React from "react";
import {connect} from "react-redux"
import {createUseStyles} from 'react-jss';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import SaveBarStyle from './../../jss/components/SaveBarStyle.js';

const useStyles = createUseStyles(SaveBarStyle)


const SaveBar = (props) => {
    const classes = useStyles()
    const [fileType, setFileType] = React.useState('');

    const handlefileTypeChange = (event) => {
        setFileType(event.target.value);
    };

    const saveAs = () => {
        fetch('http://127.0.0.1:8000/save?fileType=' + fileType)
            .then((res) => {
                return res.json();
            }).then((obj) => {
            if (obj.status === 'success') {
                props.dispatch(
                    {
                        type: "SAVE_FILE",
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
        <div className={classes.saveBar}>
            <Button variant="contained" className={classes.saveAs} onClick={saveAs}>Save As</Button>
            <TextField select label="Save File Type:"
                       className={classes.textField}
                       onChange={handlefileTypeChange}
                       size={'small'}>
                <MenuItem value={".csv"}>.csv</MenuItem>
                <MenuItem value={".xlsx"}>.xlsx</MenuItem>
                <MenuItem value={".json"}>.json</MenuItem>
            </TextField>
        </div>

    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(SaveBar)