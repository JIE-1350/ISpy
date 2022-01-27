import React from "react";
import {createUseStyles} from 'react-jss';
import { connect } from "react-redux"

import SearchBar from "./../components/SearchBar";
import FilesBar from "./../components/FilesBar";
import FilterBar from "./../components/FilterBar";
import Table from "./../components/Table";
import Button from '@mui/material/Button';

import SearchTabStyle from './../../jss/Tab/SearchTabStyle.js';

const useStyles = createUseStyles(SearchTabStyle)



const SearchTab = (props) => {
    const classes = useStyles()


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
            <SearchBar></SearchBar>
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