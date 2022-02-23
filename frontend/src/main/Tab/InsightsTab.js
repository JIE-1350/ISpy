import React from "react";
import {createUseStyles} from 'react-jss';
import {connect} from "react-redux"

import FilesBar from "./../components/FilesBar";
import InsightSelectBar from "./../components/InsightSelectBar";
import InsightPanel from "./../components/InsightPanel";

import InsightsTabStyle from './../../jss/Tab/InsightsTabStyle.js';

const useStyles = createUseStyles(InsightsTabStyle)


const InsightsTab = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.insightsTab}>
            <div className={classes.directoryWindow}><FilesBar/></div>
            <div className={classes.mainWindow}>
                <InsightSelectBar/>
                <div className={classes.insightsWindow}>
                    {props.insights === undefined ? '' : props.insights.map((insight, index) => (
                        <InsightPanel index={index}/>))
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(InsightsTab)