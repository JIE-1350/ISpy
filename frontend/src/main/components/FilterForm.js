import React from "react";
import {createUseStyles} from 'react-jss';

import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
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
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const addFilter = (event) => {
        fetch('http://127.0.0.1:8000/filter/add?type=' + type + '&feature=' + feature + '&value=' + value)
        .then((res)=>{
            return res.text();
        }).then((data)=>{
            props.setState(data);
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
                    <TextField
                        label="Type"
                        variant="outlined"
                        size={'small'}
                        onChange={e => setType(e.target.value)}
                    />
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
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
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

export default FilterForm;