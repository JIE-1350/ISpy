import React from "react";
import { connect } from "react-redux"
import {createUseStyles} from 'react-jss';

import Button from '@mui/material/Button';

import FilterBoxStyle from './../../jss/components/FilterBoxStyle.js';
const useStyles = createUseStyles(FilterBoxStyle)


const FilterBox = (props) => {
    const classes = useStyles()
	const [anchorEl, setAnchorEl] = React.useState(null);
    const {index} = props

    const removeFilter = (event) => {
        setAnchorEl(event.currentTarget);
		event.currentTarget.remove();
		let indexInt = parseInt(event.currentTarget.id);
        fetch('http://127.0.0.1:8000/filter/remove?index=' + indexInt)
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
		window.location.reload(); //this can be used to bodge the issue with filter removal 
		//hiding all later indexed filters from view until 'page' is reloaded
    };
	
    return (
        <div id={index} style={{display: 'inline-block'}}>
			<Button variant="contained" size="small" className={classes.addButton} id={index} onClick={removeFilter}>{props.state === undefined ? '' : index + JSON.stringify(props.state.filters[index])}</Button>
		</div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(FilterBox)