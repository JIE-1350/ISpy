import React from "react";
import {connect} from "react-redux"
import {createUseStyles} from 'react-jss';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

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
            <ResponsiveContainer width="75%" height="100%">
                <BarChart
                    data={data.graph}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="CountA" stackId="a" fill="#27AE60" />
                    <Bar dataKey="CountB" stackId="a" fill="#27AE60" /> 
                    <Bar dataKey="CountC" stackId="a" fill="#27AE60" /> 
                    <Bar dataKey="CountD" stackId="a" fill="#27AE60" /> 
                    <Bar dataKey="CountE" stackId="a" fill="#27AE60" /> 
                    <Bar dataKey="CountF" stackId="a" fill="#27AE60" /> 
                </BarChart>
            </ResponsiveContainer>

        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(InsightTopHashtags)