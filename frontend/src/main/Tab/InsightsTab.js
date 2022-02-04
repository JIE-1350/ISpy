import React from "react";
import {createUseStyles} from 'react-jss';
import { connect } from "react-redux"

import FilesBar from "./../components/FilesBar";
import InsightSelectBar from "./../components/InsightSelectBar";

import InsightsTabStyle from './../../jss/Tab/InsightsTabStyle.js';

const useStyles = createUseStyles(InsightsTabStyle)



const SearchTab = (props) => {
    const classes = useStyles()

    return (
    <div className={classes.insightsTab}>
        <div className={classes.directoryWindow}> <FilesBar/> </div>
        <div className={classes.mainWindow}>
            <InsightSelectBar/>
        </div>
    </div>
    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(SearchTab)