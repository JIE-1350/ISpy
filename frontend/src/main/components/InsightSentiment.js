import React from "react";
import { connect } from "react-redux"
import {createUseStyles} from 'react-jss';

import InsightSentimentStyle from './../../jss/components/InsightSentimentStyle.js';
const useStyles = createUseStyles(InsightSentimentStyle)


const InsightSentiment = (props) => {
    const classes = useStyles()
    const {data} = props
    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(InsightSentiment)