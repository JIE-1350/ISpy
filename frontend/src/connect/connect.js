const getState = () => {
    fetch('http://127.0.0.1:8000/state')
    .then((res)=>{
        return res.json();
    }).then((obj)=>{
        if (obj.status === "success") {
            store.dispatch(
                {
                    type: "UPDATE_STATE",
                    payload: obj
                }
            )
        }
    }).catch(e=>{
        alert(e);
    })
}


const addFilter = (event) => {
    fetch('http://127.0.0.1:8000/filter/add?type=' + type + '&feature=' + feature + '&value=' + value)
    .then((res)=>{
        return res.json();
    }).then((obj)=>{
        props.dispatch(
            {
                type: "UPDATE_STATE",
                payload: obj
            }
        )
    }).catch(e=>{
        alert(e);
    })
};