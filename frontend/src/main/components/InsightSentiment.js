import React from "react";
import { connect } from "react-redux"
import {createUseStyles} from 'react-jss';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

import InsightListItem from "./../components/InsightListItem";


import InsightSentimentStyle from './../../jss/components/InsightSentimentStyle.js';
const useStyles = createUseStyles(InsightSentimentStyle)


const InsightSentiment = (props) => {
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
            <ResponsiveContainer width="65%" height="100%">
                <BarChart
                    data={data.graph}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Negative Count" stackId="a" fill="#E74C3C" />
                    <Bar dataKey="Neutral Count" stackId="a" fill="#7F8C8D" />
                    <Bar dataKey="Positive Count" stackId="a" fill="#27AE60" />
                </BarChart>
            </ResponsiveContainer>

        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(InsightSentiment)