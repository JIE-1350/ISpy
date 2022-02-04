import React from "react";
import { connect } from "react-redux"
import {createUseStyles} from 'react-jss';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import InsightSelectBarStyle from './../../jss/components/InsightSelectBarStyle.js';

const useStyles = createUseStyles(InsightSelectBarStyle)

const TextFieldStyle = {paddingRight: '5px'}

const InsightSelectBar = (props) => {
    const classes = useStyles()

    const [insightType, setInsightType] = React.useState('Keyword');

    const insightList = [
        {value: 'Sentiment', label: 'Sentiment'},
        {value: 'Influence', label: 'Influence'},
        {value: 'Frequency', label: 'Frequency'},
        {value: 'Top', label: 'Top'},
        {value: 'Statistic', label: 'Statistic'},
    ]

    const generate = () => {
        fetch('http://127.0.0.1:8000/generate-insight?type=' + insightType)
        .then((res)=>{
            return res.json();
        }).then((obj)=>{
            if (obj.status === 'success') {
                props.dispatch(
                    {
                        type: "SEARCH_COMPLETED",
                        payload: obj
                    }
                )
            }
            else {
                throw(JSON.stringify(obj))
            }
        }).catch(e=>{
            props.dispatch({type: "SEARCHING", payload: false})
            alert(e);
        })
        console.log('searching')
        props.dispatch({type: "SEARCHING", payload: true})
    }

    const handleInsightChange = (event) => {
        setInsightType(event.target.value);
    };

    return (
        <div className={classes.InsightSelectBar}>
            <TextField select
                className={classes.textField}
                defaultValue="Sentiment"
                label="Insight Type:"
                onChange={handleInsightChange}
                size={'small'}
                sx={TextFieldStyle}>
                {insightList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <Button variant="contained" disabled = {false} onClick={generate}>Generate</Button>
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(InsightSelectBar)