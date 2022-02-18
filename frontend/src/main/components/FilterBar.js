import React from "react";
import {connect} from "react-redux"
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
                {props === undefined ? '' : props.filters.map((filter, index) => (
                    <FilterBox index={index}/>))
                }
            </div>
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(FilterBar)