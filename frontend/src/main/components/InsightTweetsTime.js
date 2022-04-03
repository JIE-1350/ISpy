import React from "react";
import {connect} from "react-redux"
import {createUseStyles} from 'react-jss';

import InsightTweetsTimeStyle from './../../jss/components/InsightTweetsTimeStyle.js';
import moment from "moment";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const useStyles = createUseStyles(InsightTweetsTimeStyle)


const InsightTweetsTime = (props) => {
    const classes = useStyles()
    const {data} = props

    return (
        <div className={classes.insightContainer}>
            <ResponsiveContainer width="95%" height="95%">
                <AreaChart data={data.graph}
                           margin={{top: 10, right: 35, left: 0, bottom: 0}}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="time"/>
                    <YAxis/>
                    <Tooltip/>
                    <Area type="monotone" dataKey="value" fill="#ADD8E6"/>
                </AreaChart>
            </ResponsiveContainer>
        </div>

    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(InsightTweetsTime)