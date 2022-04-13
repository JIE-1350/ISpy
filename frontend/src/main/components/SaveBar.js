import React from "react";
import {connect} from "react-redux"
import {createUseStyles} from 'react-jss';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';

import SaveBarStyle from './../../jss/components/SaveBarStyle.js';

const useStyles = createUseStyles(SaveBarStyle)


const SaveBar = (props) => {
    const classes = useStyles()
    const [fileType, setFileType] = React.useState('.csv');

    const handlefileTypeChange = (event) => {
        setFileType(event.target.value);
    };

    const saveAs = () => {
        fetch('http://127.0.0.1:8000/file/save?fileType=' + fileType)
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
            console.log(e);
        })
    }

    const removeFile = () => {
        fetch('http://127.0.0.1:8000/file/remove?index=' + props.fileIndex)
            .then((res) => {
                return res.json();
            }).then((obj) => {
            if (obj.status === 'success') {
                props.dispatch(
                    {
                        type: "REMOVE_FILE",
                        payload: obj
                    }
                )
            } else {
                throw(JSON.stringify(obj))
            }
        }).catch(e => {
            console.log(e);
        })
    }

    return (
        <div className={classes.saveBar}>
            <Button
                startIcon={<SaveIcon />}
                variant="contained"
                className={classes.saveAs}
                onClick={saveAs}
                disabled={props.files.length === 0}
            >
                Save
            </Button>
            <TextField
                select label="Save File Type:"
                className={classes.textField}
                onChange={handlefileTypeChange}
                size={'small'}
                defaultValue={'.csv'}
            >
                <MenuItem value={".csv"}>.csv</MenuItem>
                <MenuItem value={".xlsx"}>.xlsx</MenuItem>
                <MenuItem value={".json"}>.json</MenuItem>
            </TextField>
            <div className={classes.deleteButtonContainer}>
                <Button
                    startIcon={<DeleteIcon />}
                    variant="contained"
                    onClick={removeFile}
                    disabled={props.files.length === 0}
                >
                    DELETE
                </Button>
            </div>
        </div>

    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(SaveBar)