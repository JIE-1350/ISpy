import React from "react";
import { connect } from "react-redux"
import { useEffect } from 'react'


const Table = (props) => {

    const updateTable = () => {
        fetch('http://127.0.0.1:8000/update-table')
        .then((res)=>{
            return res.json();
        }).then((obj)=>{
            if (obj.status === 'success') {
                props.dispatch(
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
    useEffect(() => {
        const interval = setInterval(() => {
            if (props.searching === true) {
                updateTable();
            }
        }, 1000)  // update table every 1000 milliseconds
        return () => clearInterval(interval)
    }, [props.searching]);


    return (
        <div>
            {JSON.stringify(props)}
        </div>
    );
}


const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(Table)