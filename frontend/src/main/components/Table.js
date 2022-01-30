import React from "react";
import { connect } from "react-redux"


const Table = (props) => {
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