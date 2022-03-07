import React from "react";
import {connect} from "react-redux"
import {createUseStyles} from 'react-jss';

import InsightFrequencyStyle from './../../jss/components/InsightFrequencyStyle.js';

const useStyles = createUseStyles(InsightFrequencyStyle)


const InsightFrequency = (props) => {
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

export default connect(mapStateToProps)(InsightFrequency)