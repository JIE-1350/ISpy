import React from "react";
import {createUseStyles} from 'react-jss';
import { connect } from "react-redux"

<<<<<<< HEAD
import { display } from '@mui/system';
=======

import FilesBar from "./../components/FilesBar";
>>>>>>> development
import FilterForm from "./../components/FilterForm";
import FilterBox from "./../components/FilterBox";
import Table from "./../components/Table";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import SearchTabStyle from './../../jss/Tab/SearchTabStyle.js';

const useStyles = createUseStyles(SearchTabStyle)



const SearchTab = (props) => {
    const classes = useStyles()

    const [user, setUser] = React.useState('')
    const [since, setSince] = React.useState('')
    const [until, setUntil] = React.useState('')
    const [word, setWord] = React.useState('')
    const [days, setDays] = React.useState('')

    const scrapeData = () => {
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


    const saveAs = () => {
        fetch('http://127.0.0.1:8000/getfile')
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


    return (
    <div className={classes.searchTab}>
        <div className={classes.directoryWindow}> <FilesBar/> </div>
        <div className={classes.mainWindow}>
            <div className={classes.searchBar}>
            <div> 
                <TextField select label="Search Type:" className={classes.textFeild} sx={{paddingRight: '5px', paddingBottom: '5px'}} onChange={handleSearchChange}>
                    {searchType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <TextField label= {search_type} className={classes.textFeild} variant="outlined" sx={{paddingRight: '5px', paddingBottom: '5px'}} onChange={e => setWord(e.target.value)}/>
            <TextField label="Username" className={classes.textFeild} variant="outlined" sx={{paddingRight: '5px', paddingBottom: '5px'}} onChange={e => setUser(e.target.value)}/>
            <div> 
                <TextField select label="Search by:" className={classes.textFeild} sx={{paddingRight: '5px', paddingBottom: '5px'}} onChange={handleTimeChange}>
                    {timeRange.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            {is_Days
                ? <div className = "search_by_days">
                    <TextField label="# of Days" className={classes.textFeild} variant="outlined" sx={{paddingRight: '5px', paddingBottom: '5px'}} onChange={e => setDays(e.target.value)}/>
                </div>
                : <div className = "search_by_range">
                    <TextField label="Start Date" className={classes.textFeild} variant="outlined" sx={{paddingRight: '5px', paddingBottom: '5px'}} onChange={e => setSince(e.target.value)}/>
                    <TextField label="To Date" className={classes.textFeild} variant="outlined" sx={{paddingRight: '5px', paddingBottom: '5px'}} onChange={e => setUntil(e.target.value)}/>
                </div>
            }
            <Button variant="contained" onClick={scrapeData}>Search</Button>
            </div>
            <div className={classes.filterBar}>
                {props.state === undefined ? '' : props.state.filters.map((filter, index) => (
                    <FilterBox index={index}></FilterBox>))
                }
                <FilterForm/>
            </div>
            <Table></Table>
            <Button variant="contained" onClick={saveAs}>Download</Button>
        </div>
    </div>
    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(SearchTab)