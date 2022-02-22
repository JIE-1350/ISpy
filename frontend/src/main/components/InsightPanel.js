import React from "react";
import { connect } from "react-redux"
import {createUseStyles} from 'react-jss';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import InsightSentiment from "./../components/InsightSentiment";
import InsightInfluence from "./../components/InsightInfluence";
import InsightFrequency from "./../components/InsightFrequency";
import InsightTopHashtags from "./../components/InsightTopHashtags";
import InsightTweetsTime from "./../components/InsightTweetsTime";

import InsightPanelStyle from './../../jss/components/InsightPanelStyle.js';
const useStyles = createUseStyles(InsightPanelStyle)


const InsightPanel = (props) => {
    const classes = useStyles()
    const {index} = props

    const removeInsight = () => {
        fetch('http://127.0.0.1:8000/insight/remove?index=' + index)
        .then((res)=>{
            return res.json();
        }).then((obj)=>{
            if (obj.status === 'success') {
                props.dispatch(
                    {
                        type: "REMOVE_INSIGHT",
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
    };
    let insightComponent = ''
    if (props.insights[index].type === 'Sentiment Analysis') {
        insightComponent = <InsightSentiment data={props.insights[index]}/>
    } else if (props.insights[index].type === 'Influence Score') {
        insightComponent = <InsightInfluence data={props.insights[index]}/>
    } else if (props.insights[index].type === 'Tweets Frequency') {
        insightComponent = <InsightFrequency data={props.insights[index]}/>
    } else if (props.insights[index].type === 'Top Hashtags') {
        insightComponent = <InsightTopHashtags data={props.insights[index]}/>
    } else if (props.insights[index].type === 'Time of Tweets') {
        insightComponent = <InsightTweetsTime data={props.insights[index]}/>
    }

    return (
        <div className={classes.insightPanel}>
            <div className={classes.insightPanelHeader}>
                <Typography variant="h5">{props.insights[index].type}</Typography>
                <Button variant="text" onClick={removeInsight}>X</Button>
            </div>
            {insightComponent}
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(InsightPanel)