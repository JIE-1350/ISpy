import React from "react";
import { connect } from "react-redux"
import {createUseStyles} from 'react-jss';

import InsightListItemStyle from './../../jss/components/InsightListItemStyle.js';
const useStyles = createUseStyles(InsightListItemStyle)


const InsightListItem = (props) => {
    const classes = useStyles()
    const {item} = props

    let circle
    if (item.color === "red") {
        circle = <div className={classes.redCircle}></div>
    } else if (item.color === "green") {
        circle = <div className={classes.greenCircle}></div>
    } else if (item.color === "gray") {
        circle = <div className={classes.grayCircle}></div>
    } else if (item.color === "yellow") {
        circle = <div className={classes.yellowCircle}></div>
    }
    return (
        <div className={classes.item}>
            {circle} <div className={classes.text}>{item.string} </div>
        </div>
    );
}


export default InsightListItem