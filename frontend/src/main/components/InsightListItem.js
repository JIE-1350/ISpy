import React from "react";
import {createUseStyles} from 'react-jss';

import InsightListItemStyle from './../../jss/components/InsightListItemStyle.js';
const useStyles = createUseStyles(InsightListItemStyle)


const InsightListItem = (props) => {
    const classes = useStyles()
    const {item} = props

    let circle
    if (item.color === "red") {
        circle = <div className={classes.redCircle}/>
    } else if (item.color === "green") {
        circle = <div className={classes.greenCircle}/>
    } else if (item.color === "gray") {
        circle = <div className={classes.grayCircle}/>
    } else if (item.color === "yellow") {
        circle = <div className={classes.yellowCircle}/>
    }
    return (
        <div className={classes.item}>
            {circle} <div className={classes.text}>{item.string} </div>
        </div>
    );
}


export default InsightListItem