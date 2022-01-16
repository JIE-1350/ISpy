import React from "react";
import {createUseStyles} from 'react-jss'

import Table from "./../components/Table"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import SearchTabStyle from './../../jss/Tab/SearchTabStyle.js';

const useStyles = createUseStyles(SearchTabStyle)

const SearchTab = () => {
    const classes = useStyles()

    const [data, setData] = React.useState('')
    const [user, setUser] = React.useState('')
    const [since, setSince] = React.useState('')
    const [until, setUntil] = React.useState('')
    const [keyword, setKeyword] = React.useState('')

    const scrapeData = () => {
        fetch('http://127.0.0.1:8000/?user=' + user + '&keyword=' + keyword + '&since=' + since + '&until=' + until)
        .then((res)=>{
            return res.text();
        }).then((data)=>{
            setData(data);
        }).catch(e=>{
            alert(e);
        })
    }

    return (
    <div className={classes.searchTab}>
        <div className={classes.directoryWindow}> directoryWindow </div>
        <div className={classes.mainWindow}>
            <TextField label="Username" variant="outlined" onChange={e => setUser(e.target.value)}/>
            <TextField label="Start Date" variant="outlined" onChange={e => setSince(e.target.value)}/>
            <TextField label="To Date" variant="outlined" onChange={e => setUntil(e.target.value)}/>
            <TextField label="Keyword" variant="outlined" onChange={e => setKeyword(e.target.value)}/>
            <Button variant="contained" onClick={scrapeData}>Search</Button>
            <Table data={data}></Table>
        </div>
    </div>
    )
}

export default SearchTab