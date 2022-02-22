import React from "react";
import {connect} from "react-redux"
import {createUseStyles} from 'react-jss';

import InsightInfluenceStyle from './../../jss/components/InsightInfluenceStyle.js';

const useStyles = createUseStyles(InsightInfluenceStyle)


const InsightInfluence = (props) => {
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

export default connect(mapStateToProps)(InsightInfluence)