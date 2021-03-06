import React from "react";
import {connect} from "react-redux"
import {createUseStyles} from 'react-jss';

import Button from '@mui/material/Button';


import FilesBarStyle from './../../jss/components/FilesBarStyle.js';

const useStyles = createUseStyles(FilesBarStyle)


const FilesBar = (props) => {
    const classes = useStyles()

    const fileSelect = (file, index) => {
        fetch('http://127.0.0.1:8000/file/select?filename=' + file)
            .then((res) => {
                return res.json();
            }).then((obj) => {
            if (obj.status === 'success') {
                props.dispatch({type: "FILE_SELECTED", payload: obj})
                props.dispatch({type: "CHANGE_FILE_INDEX", payload: index})
            } else {
                throw(JSON.stringify(obj))
            }
        }).catch(e => {
            console.log(e);
        })
    }

    return (
        <div className={classes.filesBar}>
            {(props.files === undefined ? '' : props.files.map((file, index) => (
                index === props.fileIndex
                    ? <div className={classes.row}>
                        <Button
                            className={classes.fileButton}
                            variant="outlined"
                            size="small"
                            onClick={(e) => {fileSelect(file, index)}}>
                            <div className={classes.buttonTextSelected}>{file}</div>
                        </Button>
                    </div>
                    : <div className={classes.row}>
                        <Button
                            className={classes.fileButton}
                            size="small"
                            onClick={(e) => {fileSelect(file, index)}}>
                            <div className={classes.buttonTextRegular}>{file}</div>
                        </Button>
                    </div>
            )))}
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(FilesBar)