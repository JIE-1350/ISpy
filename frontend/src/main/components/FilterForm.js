import React from "react";
import {createUseStyles} from 'react-jss';
import {connect} from "react-redux"

import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import FilterFormStyle from './../../jss/components/FilterFormStyle.js';

const useStyles = createUseStyles(FilterFormStyle)

const FilterForm = (props) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [type, setType] = React.useState('')
    const [feature, setFeature] = React.useState('')
    const [value, setValue] = React.useState('')

    const handleChange = (event) => {
        setFeature(event.target.value);
    };
    const handleChangeType = (event) => {
        setType(event.target.value);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const addFilter = (event) => {
        fetch('http://127.0.0.1:8000/filter/add?type=' + type + '&feature=' + feature + '&value=' + value)
            .then((res) => {
                return res.json();
            }).then((obj) => {
            if (obj.status === 'success') {
                props.dispatch(
                    {
                        type: "ADD_FILTER",
                        payload: obj
                    }
                )
            } else {
                throw(JSON.stringify(obj))
            }
        }).catch(e => {
            console.log(e);
        })
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className={classes.addButtonContainer}>
            <Button
                className={classes.addButton}
                variant="contained"
                onClick={handleClick}
                disabled={props.files.length === 0}
            > + </Button>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div className={classes.popover}>
                    <div className={classes.TextFieldContainer}>
                        <TextField select
                                   defaultValue="equal"
                                   label="Search Type"
                                   onChange={handleChangeType}
                                   size={'small'}
                                   className={classes.textField}
                        >
                            <MenuItem value='equal'>Equal To</MenuItem>
                            <MenuItem value="less">Less Than</MenuItem>
                            <MenuItem value="greater">Greater Than</MenuItem>
                            <MenuItem value="null">Is Null</MenuItem>
                            <MenuItem value="not_null">Is Not Null</MenuItem>
                        </TextField>
                    </div>
                    <div className={classes.TextFieldContainer}>
                        <TextField select
                                   label="Feature"
                                   onChange={handleChange}
                                   size={'small'}
                                   className={classes.textField}
                        >
                            <MenuItem value="id">ID</MenuItem>
                            <MenuItem value="conversation_id">Conversation ID</MenuItem>
                            <MenuItem value="created_at">Created At</MenuItem>
                            <MenuItem value="date">Date</MenuItem>
                            <MenuItem value="time">Time</MenuItem>
                            <MenuItem value="timezone">Timezone</MenuItem>
                            <MenuItem value="user_id">User ID</MenuItem>
                            <MenuItem value="username">Username</MenuItem>
                            <MenuItem value="name">Name</MenuItem>
                            <MenuItem value="replies_count">Replies Count</MenuItem>
                            <MenuItem value="retweets_count">Retweets Count</MenuItem>
                            <MenuItem value="likes_count">Likes Count</MenuItem>
                            <MenuItem value="hashtags">Hashtags</MenuItem>
                            <MenuItem value="place">Place</MenuItem>
                            <MenuItem value="language">Language</MenuItem>
                            <MenuItem value="mentions">Mentions</MenuItem>
                            <MenuItem value="tweet">Tweet</MenuItem>
                            <MenuItem value="urls">URLs</MenuItem>
                            <MenuItem value="photos">Photos</MenuItem>
                            <MenuItem value="cashtags">Cashtags</MenuItem>
                            <MenuItem value="link">Link</MenuItem>
                            <MenuItem value="retweet">Retweet</MenuItem>
                            <MenuItem value="quote_url">Quote URL</MenuItem>
                            <MenuItem value="video">Video</MenuItem>
                            <MenuItem value="thumbnail">Thumbnail</MenuItem>
                            <MenuItem value="near">Near</MenuItem>
                            <MenuItem value="geo">Geo</MenuItem>
                            <MenuItem value="source">Source</MenuItem>
                            <MenuItem value="user_rt_id">User Retweet ID</MenuItem>
                            <MenuItem value="user_rt">User Retweet</MenuItem>
                            <MenuItem value="retweet_id">Retweet ID</MenuItem>
                            <MenuItem value="reply_to">Reply To</MenuItem>
                            <MenuItem value="retweet_date">Retweet Date</MenuItem>
                            <MenuItem value="translate">Translated</MenuItem>
                            <MenuItem value="trans_src">Translated (Source Lang)</MenuItem>
                            <MenuItem value="trans_dest">Translated (Target Lang)</MenuItem>
                        </TextField>
                    </div>
                    <div className={classes.TextFieldContainer}>
                        <TextField
                            label="Value"
                            variant="outlined"
                            size={'small'}
                            onChange={e => setValue(e.target.value)}
                        />
                    </div>
                    <Button
                        className={classes.addButton}
                        variant="contained"
                        onClick={addFilter}
                        disabled={(!feature || !value) && (type !== "null" && type !== "not_null")}
                    > Add </Button>
                </div>
            </Popover>
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(FilterForm)