import React from "react";
import { connect } from "react-redux"
import {createUseStyles} from 'react-jss';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import InsightSentimentStyle from './../../jss/components/InsightSentimentStyle.js';
const useStyles = createUseStyles(InsightSentimentStyle)


const InsightSentiment = (props) => {
    const classes = useStyles()
    const {data} = props

    return (
        <div>
            <BarChart
                width={450}
                height={300}
                data={data.graph}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Negative Count" stackId="a" fill="#E74C3C" />
                <Bar dataKey="Neutral Count" stackId="a" fill="#27AE60" />
                <Bar dataKey="Positive Count" stackId="a" fill="#3498DB" />

            </BarChart>
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(InsightSentiment)