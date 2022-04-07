import React from "react";
import {createUseStyles} from 'react-jss'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import TabPanel from './components/TabPanel.js';
import SearchTab from './Tab/SearchTab.js';
import InsightsTab from './Tab/InsightsTab.js';

import AppStyle from './../jss/AppStyle.js';

const useStyles = createUseStyles(AppStyle)

const App = () => {
    const classes = useStyles()

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <div className={classes.tabBarContainer}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="Tab Bar"
                >
                    <Tab value={0} label="Search" />
                    <Tab value={1} label="Insights" />
                </Tabs>
            </div>
            <TabPanel value={value} index={0}> <SearchTab/> </TabPanel>
            <TabPanel value={value} index={1}> <InsightsTab/> </TabPanel>
        </div>
    );
}

export default App;