import React from "react";
import Table from "./components/Table"


const App = () => {
    const [data, setData] = React.useState('')
    const [user, setUser] = React.useState('')
    const [since, setSince] = React.useState('2021-01-1')
    const [until, setUntil] = React.useState('2022-01-1')
    const [keyword, setKeyword] = React.useState('covid')

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
            <input type="text" value={user} onChange={e => setUser(e.target.value)}/>
            <input type="text" value={since} onChange={e => setSince(e.target.value)}/>
            <input type="text" value={until} onChange={e => setUntil(e.target.value)}/>
            <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)}/>
            <button onClick={scrapeData}>Scrape Data</button>
            <Table data={data}></Table>
        </div>
    );
}

export default App;