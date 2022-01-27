import React from "react";
import { connect } from "react-redux"
import {createUseStyles} from 'react-jss';

import FilterForm from "./../components/FilterForm";
import FilterBox from "./../components/FilterBox";

import FilterBarStyle from './../../jss/components/FilterBarStyle.js';
const useStyles = createUseStyles(FilterBarStyle)


const FilterBar = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.filterBar}>
            <FilterForm/>
            <div className={classes.filtersBox}>
                {props.state === undefined ? '' : props.state.filters.map((filter, index) => (
                    <FilterBox index={index}></FilterBox>))
                }
            </div>
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(FilterBar)