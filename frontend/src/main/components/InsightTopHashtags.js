import React from "react";
import {connect} from "react-redux"
import {createUseStyles} from 'react-jss';

import InsightTopHashtagsStyle from './../../jss/components/InsightTopHashtagsStyle.js';
import InsightListItem from "./InsightListItem";

const useStyles = createUseStyles(InsightTopHashtagsStyle)


const InsightTopHashtags = (props) => {
    const classes = useStyles()
    const {data} = props

    return (
        <div className={classes.insightContainer}>
            <div className={classes.listContainer}>
                <div className={classes.list}>
                    {data.list.map((item) => (
                        <InsightListItem item={item}/>
                    ))}
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(InsightTopHashtags)