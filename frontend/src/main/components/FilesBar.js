import React from "react";
import { connect } from "react-redux"
import {createUseStyles} from 'react-jss';

import Typography from '@mui/material/Typography';


import FilesBarStyle from './../../jss/components/FilesBarStyle.js';
const useStyles = createUseStyles(FilesBarStyle)


const FilesBar = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            {(props.state === undefined ? '' : props.state.files).map((file) => (
                <Typography>{file}</Typography>
            ))}
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(FilesBar)