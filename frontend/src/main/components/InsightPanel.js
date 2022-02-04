import React from "react";
import { connect } from "react-redux"
import {createUseStyles} from 'react-jss';

import InsightPanelStyle from './../../jss/components/InsightPanelStyle.js';
const useStyles = createUseStyles(InsightPanelStyle)


const InsightPanel = (props) => {
    const classes = useStyles()
    const {index} = props

    return (
        <div className={classes.insightPanel}>
            {props.insights[index]}
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(InsightPanel)