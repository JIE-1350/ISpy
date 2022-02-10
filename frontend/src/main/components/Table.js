import React from "react";
import { connect } from "react-redux"
import { useEffect } from 'react'

// import { JsonToTable } from "react-json-to-table";

import MaterialTable from "material-table";

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { CircularProgress } from '@mui/material';

// import {createUseStyles} from 'react-jss';
// import TableStyle from './../../jss/components/TableStyle.js';
// const useStyles = createUseStyles(TableStyle)

const Table = (props) => {
    // const classes = useStyles()
    const searching = props.searching
    const dispatch = props.dispatch

    useEffect(() => {
        const updateTable = () => {
            fetch('http://127.0.0.1:8000/update-table')
            .then((res)=>{
                return res.json();
            }).then((obj)=>{
                if (obj.status === 'success') {
                    dispatch(
                        {
                            type: "UPDATE_TABLE",
                            payload: obj
                        }
                    )
                }
                else {
                    throw(JSON.stringify(obj))
                }
            }).catch(error=>{
                console.log(error)
            })
        }
        const interval = setInterval(() => {
            if (searching === true) {
                updateTable();
            }
        }, 1000)  // update table every 1000 milliseconds
        return () => clearInterval(interval)
    }, [searching, dispatch]);
	
    return (
        <div style={{'overflow-x':'auto'}}>
            <Box sx={{ height: 40 }}>
                <Fade
                in={searching}
                  style={{
                    transitionDelay: searching ? '800ms' : '0ms',
                  }}
                  unmountOnExit
                >
                 <CircularProgress />
                </Fade>
            </Box>
       
			<div style={{ maxWidth: "100%" }}>
			<MaterialTable
			  title="Retrieved Tweets"
			  columns={props.table.columns}
			  data = {props.table.data}
			/>
			</div>
               
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(Table)