import React from "react";
import {createUseStyles} from 'react-jss';
import { connect } from "react-redux"


import FilesBar from "./../components/FilesBar";
import FilterBar from "./../components/FilterBar";
import Table from "./../components/Table";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import SearchTabStyle from './../../jss/Tab/SearchTabStyle.js';

const useStyles = createUseStyles(SearchTabStyle)



const SearchTab = (props) => {
    const classes = useStyles()

    const [user, setUser] = React.useState('')
    const [since, setSince] = React.useState('')
    const [until, setUntil] = React.useState('')
    const [keyword, setKeyword] = React.useState('')

    const scrapeData = () => {
        fetch('http://127.0.0.1:8000/?user=' + user + '&keyword=' + keyword + '&since=' + since + '&until=' + until)
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
            <TextField label="Username" variant="outlined" onChange={e => setUser(e.target.value)}/>
            <TextField label="Start Date" variant="outlined" onChange={e => setSince(e.target.value)}/>
            <TextField label="To Date" variant="outlined" onChange={e => setUntil(e.target.value)}/>
            <TextField label="Keyword" variant="outlined" onChange={e => setKeyword(e.target.value)}/>
            <Button variant="contained" onClick={scrapeData}>Search</Button>
            <FilterBar></FilterBar>
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