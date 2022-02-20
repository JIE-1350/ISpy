import React, {useState} from "react";
import {connect} from "react-redux"
import {createUseStyles} from 'react-jss';

import Button from '@mui/material/Button';


import FilesBarStyle from './../../jss/components/FilesBarStyle.js';

const useStyles = createUseStyles(FilesBarStyle)


const FilesBar = (props) => {
    const classes = useStyles()

    const fileSelect = (file) => {
        fetch('http://127.0.0.1:8000/select-file?filename=' + file)
            .then((res) => {
                return res.json();
            }).then((obj) => {
            if (obj.status === 'success') {
                props.dispatch(
                    {
                        type: "FILE_SELECTED",
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
    const [selectedButton, setSelectedButton] = useState(0);

    return (
        <div className={classes.filesBar}>
            {(props.files === undefined ? '' : props.files.map((file, index) => (
                index === selectedButton
                    ? <div className={classes.row}>
                        <Button
                            className={classes.fileButton}
                            variant="outlined"
                            size="small"
                            onClick={(e) => {
                                fileSelect(file);
                                setSelectedButton(index);
                            }}>
                            <div className={classes.buttonTextSelected}>{file}</div>
                        </Button>
                    </div>
                    : <div className={classes.row}>
                        <Button
                            className={classes.fileButton}
                            size="small"
                            onClick={(e) => {
                                fileSelect(file);
                                setSelectedButton(index);
                            }}>
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