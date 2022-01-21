import React from "react";
import {createUseStyles} from 'react-jss';
import { connect } from "react-redux"

import FilterForm from "./../components/FilterForm";
import Table from "./../components/Table";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import SearchTabStyle from './../../jss/Tab/SearchTabStyle.js';

const useStyles = createUseStyles(SearchTabStyle)



const SearchTab = (props) => {
    const classes = useStyles()

    const [data, setData] = React.useState('')
    const [user, setUser] = React.useState('')
    const [since, setSince] = React.useState('')
    const [until, setUntil] = React.useState('')
    const [keyword, setKeyword] = React.useState('')
    const [state, setState] = React.useState('')
	let filterCounter = 0; //this keeps track of how many filters are applied and determines filter IDs

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

	const addFilterButton = () => {
	  let btn = document.createElement("Button");
	  btn.innerText = "testbutton" + filterCounter;
	  btn.id = "testbutton" + filterCounter;
	  btn.InnerHTML = "testbutton" + filterCounter;
	  btn.variant = "contained";
	  btn.className = "Button";
	  btn.onclick = function () {
		  let elem = document.getElementById(btn.id);
		  document.getElementById("appliedFilterList").removeChild(elem);
		  filterCounter = filterCounter - 1;
		};
	  document.getElementById("appliedFilterList").appendChild(btn);
	  filterCounter = filterCounter + 1;
	}
	
	const filterDropdown = () => {
		let elm = document.getElementById("overlay");
		elm.style.visibility = (elm.style.visibility === "visible") ? "hidden" : "visible";
		console.log();		
	}
	
    return (
	<body>
    <div className={classes.searchTab}>
        <div className={classes.directoryWindow}> directoryWindow </div>
        <div className={classes.mainWindow}>
            <TextField label="Username" variant="outlined" onChange={e => setUser(e.target.value)}/>
            <TextField label="Start Date" variant="outlined" onChange={e => setSince(e.target.value)}/>
            <TextField label="To Date" variant="outlined" onChange={e => setUntil(e.target.value)}/>
            <TextField label="Keyword" variant="outlined" onChange={e => setKeyword(e.target.value)}/>
            <Button variant="contained" onClick={scrapeData}>Search</Button>
			<Button variant="contained" onClick={addFilterButton}>Apply Filter Test</Button>
			<Button variant="contained" onClick={filterDropdown}>Add Filter (Context)</Button>
            <div id="appliedFilterList"></div>
            <div id="overlay"><div><p>"Test content"</p></div></div>
            <div className={classes.filterBar}>
                <FilterForm/>
            </div>
            <Table></Table>
        </div>
    </div>
	</body>
    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(SearchTab)