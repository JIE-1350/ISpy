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

    const [insightType, setInsightType] = React.useState('sentiment');
    const [feature, setFeature] = React.useState('replies_count');

    const insightList = [
        {value: 'sentiment', label: 'Sentiment Analysis'},
        {value: 'influence', label: 'Influence Score'},
        {value: 'frequency', label: 'Tweets Frequency'},
        {value: 'topHashtags', label: 'Top Hashtags'},
        {value: 'stats', label: 'Feature Stats'},
    ]

    const featureList = [
        {value: 'replies_count', label: 'Replies Count'},
        {value: 'retweets_count', label: 'Retweets Count'},
        {value: 'likes_count', label: 'Likes Count'},
        {value: 'video', label: 'Videos Count'}
    ]

    const generate = () => {
        fetch('http://127.0.0.1:8000/generate-insight?type=' + insightType + "&feature=" + feature)
        .then((res)=>{
            return res.json();
        }).then((obj)=>{
            if (obj.status === 'success') {
                props.dispatch(
                    {
                        type: "INSIGHT_GENERATED",
                        payload: obj
                    }
                )
            }
            else {
                throw(JSON.stringify(obj))
            }
        }).catch(e=>{
            alert(e);
        })
        console.log('Generating Insight')
    }

    const handleInsightChange = (event) => {
        setInsightType(event.target.value);
    };

    const handleFeatureChange = (event) => {
        setFeature(event.target.value);
    };

    return (
        <div className={classes.InsightSelectBar}>
            <TextField select
                className={classes.textField}
                defaultValue="sentiment"
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
            <TextField select
                className={classes.textField}
                defaultValue="replies_count"
                label="Feature:"
                onChange={handleFeatureChange}
                size={'small'}
                disabled={insightType!=='stats'}
                sx={TextFieldStyle}>
                {featureList.map((option) => (
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