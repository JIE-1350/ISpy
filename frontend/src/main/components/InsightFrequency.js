import React from "react";
import {connect} from "react-redux"
import {createUseStyles} from 'react-jss';

import moment from 'moment'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import InsightFrequencyStyle from './../../jss/components/InsightFrequencyStyle.js';

const useStyles = createUseStyles(InsightFrequencyStyle)


const InsightFrequency = (props) => {
    const classes = useStyles()
    const {data} = props

    const timeFormatter = (time) => ' ' + moment(time * 1000).format('l') + ''

    return (
        <div className={classes.insightContainer}>
            <ResponsiveContainer width="95%" height="95%">
                <AreaChart data={data.graph}
                    margin={{top: 10, right: 35, left: 0, bottom: 0}}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="time"
                        tickFormatter = {timeFormatter}
                    />
                    <YAxis />
                    <Tooltip labelFormatter={timeFormatter} />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(InsightFrequency)