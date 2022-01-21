import React from "react";
import {createUseStyles} from 'react-jss';

import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import FilterFormStyle from './../../jss/components/FilterFormStyle.js';

const useStyles = createUseStyles(FilterFormStyle)

const FilterForm = (props) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
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
                insert form here
            </Popover>
        </div>
    );
}

export default FilterForm;