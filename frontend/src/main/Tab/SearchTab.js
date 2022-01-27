import React from "react";
import {createUseStyles} from 'react-jss';
import { connect } from "react-redux"

import SearchBar from "./../components/SearchBar";
import FilesBar from "./../components/FilesBar";
import FilterBar from "./../components/FilterBar";
import Table from "./../components/Table";
import SaveButton from "./../components/SaveButton";

import SearchTabStyle from './../../jss/Tab/SearchTabStyle.js';

const useStyles = createUseStyles(SearchTabStyle)



const SearchTab = (props) => {
    const classes = useStyles()

    return (
    <div className={classes.searchTab}>
        <div className={classes.directoryWindow}> <FilesBar/> </div>
        <div className={classes.mainWindow}>
            <SearchBar></SearchBar>
            <FilterBar></FilterBar>
            <Table></Table>
            <SaveButton></SaveButton>
        </div>
    </div>
    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(SearchTab)