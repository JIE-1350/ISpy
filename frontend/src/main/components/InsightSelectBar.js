import React from "react";
import { connect } from "react-redux"
import {createUseStyles} from 'react-jss';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import InsightSelectBarStyle from './../../jss/components/InsightSelectBarStyle.js';
import AddIcon from '@mui/icons-material/Add';

const useStyles = createUseStyles(InsightSelectBarStyle)

const TextFieldStyle = {paddingRight: '5px'}

const InsightSelectBar = (props) => {
    const classes = useStyles()

    const [insightType, setInsightType] = React.useState('Sentiment Analysis');

    const insightList = [
        {value: 'Sentiment Analysis', label: 'Sentiment Analysis'},
        {value: 'Influence Score', label: 'Influence Score'},
        {value: 'Tweets Frequency', label: 'Tweets Frequency'},
        {value: 'Top Hashtags', label: 'Top Hashtags'},
        {value: 'Time of Tweets', label: 'Time of Tweets'}
    ]

    const generate = () => {
        fetch('http://127.0.0.1:8000/insight/generate?type=' + insightType)
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
            console.log(e);
        })
        console.log('Generating Insight')
    }

    const handleInsightChange = (event) => {
        setInsightType(event.target.value);
    };

    return (
        <div className={classes.InsightSelectBar}>
            <TextField select
                className={classes.textField}
                defaultValue="Sentiment Analysis"
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
            <Button
                startIcon={<AddIcon />}
                variant="contained"
                onClick={generate}
                disabled={props.files.length === 0}
            >
                Generate
            </Button>
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(InsightSelectBar)