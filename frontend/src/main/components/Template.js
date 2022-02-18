import React from "react";
import {connect} from "react-redux"
import {createUseStyles} from 'react-jss';

import TemplateStyle from './../../jss/components/TemplateStyle.js';

const useStyles = createUseStyles(TemplateStyle)


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