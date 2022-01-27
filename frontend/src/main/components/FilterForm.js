import React from "react";
import {createUseStyles} from 'react-jss';
import { connect } from "react-redux"

import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import FilterFormStyle from './../../jss/components/FilterFormStyle.js';

const useStyles = createUseStyles(FilterFormStyle)

const FilterForm = (props) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [type, setType] = React.useState('')
    const [feature, setFeature] = React.useState('')
    const [value, setValue] = React.useState('')

    const handleChange = (event) => {
        setFeature(event.target.value);
    };
	const handleChangeType = (event) => {
        setType(event.target.value);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const addFilter = (event) => {
        fetch('http://127.0.0.1:8000/filter/add?type=' + type + '&feature=' + feature + '&value=' + value)
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

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button
                className={classes.addButton}
                variant="contained"
                onClick={handleClick}
            > + </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
            >
                <div className={classes.popover}>
                    <FormControl fullWidth>
                        <InputLabel
                            id="type-simple-select-label"
                            size={'small'}
                        >
                            Type
                        </InputLabel>
                            <Select
                                labelId="type-simple-select-label"
                                id="type-simple-select"
                                value={type}
                                label="Type"
                                size={'small'}
                                onChange={handleChangeType}
                            >
                                <MenuItem value='equal'>Equal To</MenuItem>
								<MenuItem value="less">Less Than</MenuItem>
								<MenuItem value="greater">Greater Than</MenuItem>
								<MenuItem value="null">Is Null</MenuItem>
								<MenuItem value="not_null">Is Not Null</MenuItem>
                            </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel
                            id="demo-simple-select-label"
                            size={'small'}
                        >
                            Feature
                        </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={feature}
                                label="Feature"
                                size={'small'}
                                onChange={handleChange}
                            >
                                {props.state === undefined ? '' : Object.keys(props.state.data).map((feature) => (
                                    <MenuItem value={feature}>{feature}</MenuItem>))
                                }
                            </Select>
                    </FormControl>
                    <TextField
                        label="Value"
                        variant="outlined"
                        size={'small'}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Button
                        className={classes.addButton}
                        variant="contained"
                        onClick={addFilter}
                    > Add </Button>
                </div>
            </Popover>
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(FilterForm)