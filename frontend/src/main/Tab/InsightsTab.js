import React from "react";
import {createUseStyles} from 'react-jss';
import {connect} from "react-redux"

import FilesBar from "./../components/FilesBar";
import InsightSelectBar from "./../components/InsightSelectBar";
import InsightPanel from "./../components/InsightPanel";

import RGL, { WidthProvider } from "react-grid-layout";
import './../../../node_modules/react-grid-layout/css/styles.css';


import InsightsTabStyle from './../../jss/Tab/InsightsTabStyle.js';

const useStyles = createUseStyles(InsightsTabStyle)

const ReactGridLayout = WidthProvider(RGL);

const InsightsTab = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.insightsTab}>
            <div className={classes.directoryWindow}><FilesBar/></div>
            <div className={classes.mainWindow}>

                <InsightSelectBar/>
                <div className={classes.insightsWindow}>
                    <div className={classes.LayoutWindow}>
                        <ReactGridLayout
                            isDraggable
                            isResizable
                            items={5}
                            rowHeight={100}
                            preventCollision={false}
                            cols={12}
                        >
                            {props.insights === undefined ? '' : props.insights.map((insight, index) => (
                                <div key={index} data-grid={insight.layout}>
                                    <InsightPanel index={index}/>
                                </div>))
                            }
                        </ReactGridLayout>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(InsightsTab)