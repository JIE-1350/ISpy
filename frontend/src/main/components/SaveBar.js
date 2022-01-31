import React from "react";
import { connect } from "react-redux"
import {createUseStyles} from 'react-jss';

import Button from '@mui/material/Button';

import SaveBarStyle from './../../jss/components/SaveBarStyle.js';
const useStyles = createUseStyles(SaveBarStyle)


const SaveBar = (props) => {
    const classes = useStyles()

    const saveAs = () => {
        fetch('http://127.0.0.1:8000/save')
        .then((res)=>{
            return res.json();
        }).then((obj)=>{
            if (obj.status === 'success') {
                props.dispatch(
                    {
                        type: "SAVE_FILE",
                        payload: obj
                    }
                )
            }
            else {
                throw(JSON.stringify(obj))
            }
        }).catch(e=>{
            alert(e);
        })
    }

    return (
        <div className={classes.ButtonContainer}>
            <Button variant="contained" onClick={saveAs}>Save As</Button>
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(SaveBar)