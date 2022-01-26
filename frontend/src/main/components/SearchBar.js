import React from "react";
import { connect } from "react-redux"
import {createUseStyles} from 'react-jss';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import SearchBarStyle from './../../jss/components/SearchBarStyle.js';

const useStyles = createUseStyles(SearchBarStyle)

const TextFieldStyle = {paddingRight: '5px'}

const SearchBar = (props) => {
    const classes = useStyles()

    const [user, setUser] = React.useState('')
    const [since, setSince] = React.useState('')
    const [until, setUntil] = React.useState('')
    const [word, setWord] = React.useState('')
    const [days, setDays] = React.useState('')

    const search = () => {
        fetch('http://127.0.0.1:8000/?user=' + user + '&word=' + word + '&days=' + days + '&since=' + since + '&until=' + until)
        .then((res)=>{
            return res.json();
        }).then((obj)=>{
            if (obj.status === 'success') {
                props.dispatch(
                    {
                        type: "UPDATE_STATE",
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
    }


    const searchType = [
        {
            value: 'Keyword',
            label: 'Keyword'
        },
        {
            value: 'Hashtag',
            label: 'Hashtag'
        }
    ]

    const timeRange = [
        {
            value: 'date_range',
            label: 'Date Range'
        },
        {
            value: 'days',
            label: '# of Days'
        }
    ]

    const [search_type, setSearchType] = React.useState('Keyword');
    const [time_range, setTimeRange] = React.useState('dateRange');
    const [is_Days = time_range === "days" ? true : false, setIsDays] = React.useState();

    const handleSearchChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleTimeChange = (event) => {
        setTimeRange(event.target.value);
        setIsDays(event.target.value === "days" ? true : false);
    };


    return (
        <div className={classes.searchBar}>
            <div>
                <TextField select label="Search Type:" className={classes.textField} onChange={handleSearchChange} size={'small'} sx={TextFieldStyle}>
                    {searchType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <TextField label= {search_type} className={classes.textField} variant="outlined" onChange={e => setWord(e.target.value)} size={'small'} sx={TextFieldStyle}/>
            <TextField label="Username" className={classes.textField} variant="outlined" onChange={e => setUser(e.target.value)} size={'small'} sx={TextFieldStyle}/>
            <div>
                <TextField select label="Search by:" className={classes.textField} onChange={handleTimeChange} size={'small'} sx={TextFieldStyle}>
                    {timeRange.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            {is_Days
                ? <div className = "search_by_days">
                    <TextField label="# of Days" className={classes.textField} variant="outlined" onChange={e => setDays(e.target.value)} size={'small'} sx={TextFieldStyle}/>
                </div>
                : <div className = "search_by_range">
                    <TextField label="Start Date" className={classes.textField} variant="outlined" onChange={e => setSince(e.target.value)} size={'small'} sx={TextFieldStyle}/>
                    <TextField label="To Date" className={classes.textField} variant="outlined" onChange={e => setUntil(e.target.value)} size={'small'} sx={TextFieldStyle}/>
                </div>
            }
            <Button variant="contained" onClick={search}>Search</Button>
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(SearchBar)