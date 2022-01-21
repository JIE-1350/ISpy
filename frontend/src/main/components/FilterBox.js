import React from "react";
import { connect } from "react-redux"
import {createUseStyles} from 'react-jss';

import FilterBoxStyle from './../../jss/components/FilterBoxStyle.js';
const useStyles = createUseStyles(FilterBoxStyle)


const FilterBox = (props) => {
    const classes = useStyles()
    const {index} = props


    const addFilter = (event) => {
        fetch('http://127.0.0.1:8000/filter/remove?index=' + index)
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
    };

    return (
        <div>
            {props.state === undefined ? '' : index + JSON.stringify(props.state.filters[index])}
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(FilterBox)