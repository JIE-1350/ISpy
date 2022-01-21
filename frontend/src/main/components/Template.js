//Template for react component. Replace Template with the name of your component

import React from "react";
import { connect } from "react-redux"
import {createUseStyles} from 'react-jss';

import TemplateStyle from './../../jss/components/TemplateStyle.js';
const useStyles = createUseStyles(FilterBoxStyle)


const Template = (props) => {
    const classes = useStyles()

    return (
        <div>
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(Template)