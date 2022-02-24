import React from "react";
import {connect} from "react-redux"
import {createUseStyles} from 'react-jss';

import InsightInfluenceStyle from './../../jss/components/InsightInfluenceStyle.js';
import InsightListItem from "./InsightListItem";

const useStyles = createUseStyles(InsightInfluenceStyle)


const InsightInfluence = (props) => {
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

export default connect(mapStateToProps)(InsightInfluence)