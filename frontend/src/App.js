import React from "react";
import Table from "./components/Table"

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const App = () => {
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
        <div>
            <h1>Python Scraper</h1>
            <TextField label="Username" variant="outlined" onChange={e => setUser(e.target.value)}/>
            <TextField label="Start Date" variant="outlined" onChange={e => setSince(e.target.value)}/>
            <TextField label="To Date" variant="outlined" onChange={e => setUntil(e.target.value)}/>
            <TextField label="Keyword" variant="outlined" onChange={e => setKeyword(e.target.value)}/>
            <Button variant="contained" onClick={scrapeData}>Search</Button>
            <Table data={data}></Table>
        </div>
    );
}

export default App;