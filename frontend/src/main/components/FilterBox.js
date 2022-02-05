import React from "react";
import {connect} from "react-redux"
import {createUseStyles} from 'react-jss';

import Button from '@mui/material/Button';

import FilterBoxStyle from './../../jss/components/FilterBoxStyle.js';

const useStyles = createUseStyles(FilterBoxStyle)


const FilterBox = (props) => {
    const classes = useStyles()
    const {index} = props

    const removeFilter = (event) => {
<<<<<<< HEAD
        let indexInt = parseInt(event.currentTarget.id);
        fetch('http://127.0.0.1:8000/filter/remove?index=' + indexInt)
            .then((res) => {
                return res.json();
            }).then((obj) => {
=======
		let indexInt = parseInt(event.currentTarget.id);
        fetch('http://127.0.0.1:8000/insight/remove?index=' + indexInt)
        .then((res)=>{
            return res.json();
        }).then((obj)=>{
>>>>>>> Add functional InsightPanel
            if (obj.status === 'success') {
                props.dispatch(
                    {
                        type: "REMOVE_FILTER",
                        payload: obj
                    }
                )
            } else {
                throw(JSON.stringify(obj))
            }

        }).catch(e => {
            alert(e);
        })
    };

    return (
        <div className={classes.filterContainer} id={index}>
            <Button
                variant="outlined"
                size="small"
                id={index}
                onClick={removeFilter}
            >
                {props === undefined ? '' :
                    props.filters[index].feature + ' ' +
                    props.filters[index].type + ' ' +
                    props.filters[index].value + ' x'
                }
            </Button>
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(FilterBox)