import React from "react";
import { connect } from "react-redux"
import { useEffect } from 'react'

// import { JsonToTable } from "react-json-to-table";

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { CircularProgress } from '@mui/material';

import {createUseStyles} from 'react-jss';
import TableStyle from './../../jss/components/TableStyle.js';
const useStyles = createUseStyles(TableStyle)

const Table = (props) => {
	const classes = useStyles()
    const searching = props.searching
    const dispatch = props.dispatch
	
	// this is a hacky solution
	const transposeTable = (tbody, newContainerType = "tbody") => {
	  const rows = Array.from(tbody.querySelectorAll("tr"))
	  const newTbody = document.createElement(newContainerType)

	  for (let rowIdx = 0; rowIdx < rows.length; rowIdx++) {
		const row = rows[rowIdx]
		const cells = Array.from(row.querySelectorAll("td, th"))

		for (let cellIdx = 0; cellIdx < cells.length; cellIdx++ ) {
		  const cell = cells[cellIdx]
		  const newRow = newTbody.children[cellIdx] || document.createElement("tr")
		  if (!newTbody.children[cellIdx]) {
			newTbody.appendChild(newRow)
		  }
		  newRow.appendChild(cell.cloneNode(true))
		}
	  } 
	  tbody.parentElement.appendChild(newTbody)
	  tbody.parentElement.removeChild(tbody)
	}
	
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

	// transposeTable(document.querySelector("tbody")); //currently errors at times because execution is not deferred
	
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
			
            <table class="tableContainer">
                <thead>
				    <tr>
                    {props.table.data === undefined ? '' : Object.keys(props.table.data).map(
						(key)=>{
							return(
								<td className={classes.tableCell}>{key}</td>
							)
						}
					)}
					</tr>
                </thead>
				<tbody>
                    {props.table.data === undefined ? '' : Object.entries(props.table.data).map(
						([idx, value])=>{
							return(
								<tr className={classes.tableRow} key={idx}>
								{Object.values(value).map((i) => (
									<td className={classes.tableCell}>{i}</td>
								))}
								</tr>
							)
						}
					)}
			     </tbody>
            </table>
			
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(Table)