import React from "react";
import {connect} from "react-redux"
import {createUseStyles} from 'react-jss';

import InsightTopHashtagsStyle from './../../jss/components/InsightTopHashtagsStyle.js';

const useStyles = createUseStyles(InsightTopHashtagsStyle)


const InsightTopHashtags = (props) => {
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

export default connect(mapStateToProps)(InsightTopHashtags)