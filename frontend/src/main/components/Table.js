import React from "react";
import { connect } from "react-redux"
import { useEffect } from 'react'
import { JsonToTable } from "react-json-to-table";
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { CircularProgress } from '@mui/material';

const Table = (props) => {
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

	const DisplayData=()=>{
		return(
		<div>
			{props === undefined ? '' : (props.table.data).map(
					([key, value])=>{
						return(
							<tr key={key}>
							{Object.values(value).map((i) => (
								<td>{i}</td>
							))}
							</tr>
						)
					}
				)
			}		
		</div>
		)
	}
		
    return (
        <div>
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
            <JsonToTable json={props.table.data}/>
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(Table)