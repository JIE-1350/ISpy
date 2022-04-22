import React from "react";
import { connect } from "react-redux"
import {createUseStyles} from 'react-jss';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

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
            console.log(e);
        })
    };
    let insightComponent = ''
    let insightDescription = ''
    if (props.insights[index].type === 'Sentiment Analysis') {
        insightComponent = <InsightSentiment data={props.insights[index]}/>
        insightDescription =
        'Each Tweet\'s sentiment is calculated using NLTK VADER Sentiment Intensity Analyzer. Scores range from -1' +
        '.0 (completely negative) to 1.0 (complete positive sentiment). The numbers of negative, neutral, and ' +
        ' positive tweets and averaged sentiment score are shown'
    } else if (props.insights[index].type === 'Influence Score') {
        insightComponent = <InsightInfluence data={props.insights[index]}/>
        insightDescription =
        'Provides average replies, retweets, and likes count for tweets in dataset, as well as averaged composite ' +
        '\'influence\' score. This gives a quick feel in absolute numbers of the reach of the subject or user'
    } else if (props.insights[index].type === 'Tweets Frequency') {
        insightComponent = <InsightFrequency data={props.insights[index]}/>
        insightDescription =
        'Graphs the count of relevant tweets (on subject, by user, etc.) made over the given period of time.'
    } else if (props.insights[index].type === 'Top Hashtags') {
        insightComponent = <InsightTopHashtags data={props.insights[index]}/>
        insightDescription =
        'Most common Hashtags in the dataset are counted and both listed and graphed to see relative popularity'
    } else if (props.insights[index].type === 'Time of Tweets') {
        insightComponent = <InsightTweetsTime data={props.insights[index]}/>
        insightDescription = 'Maps tweet times to hours of a day and graphs count of tweets for each hour'
    }

    return (
        <div className={classes.insightPanel}>
            <div className={classes.insightPanelHeader}>
                <Tooltip title={insightDescription}>
                    <Typography variant="h5">{props.insights[index].type}</Typography>
                </Tooltip>
                <Button variant="text" onClick={removeInsight}>X</Button>
            </div>
            <div className={classes.insightPanelBody}>
                {insightComponent}
            </div>
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(InsightPanel)