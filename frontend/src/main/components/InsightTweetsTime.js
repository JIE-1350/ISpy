import React from "react";
import {connect} from "react-redux"
import {createUseStyles} from 'react-jss';

import InsightTweetsTimeStyle from './../../jss/components/InsightTweetsTimeStyle.js';

const useStyles = createUseStyles(InsightTweetsTimeStyle)


const InsightTweetsTime = (props) => {
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

export default connect(mapStateToProps)(InsightTweetsTime)