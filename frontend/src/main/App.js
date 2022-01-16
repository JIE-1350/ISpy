import React from "react";
import {createUseStyles} from 'react-jss'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabPanel from './components/TabPanel.js';
import SearchTab from './Tab/SearchTab.js';
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
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Tab Bar"
            >
                <Tab value={0} label="Home" />
                <Tab value={1} label="Search" />
                <Tab value={2} label="Insights" />
                <Tab value={3} label="Help" />
            </Tabs>
            <TabPanel value={value} index={0}> Home Page </TabPanel>
            <TabPanel value={value} index={1}> <SearchTab/> </TabPanel>
            <TabPanel value={value} index={2}> Insights Page </TabPanel>
            <TabPanel value={value} index={3}> Help Page </TabPanel>
        </div>
    );
}

export default App;