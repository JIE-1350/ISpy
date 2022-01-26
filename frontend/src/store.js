import { createStore } from 'redux'

function state_reducer(state = {}, action) {
    switch (action.type) {
        case "UPDATE_STATE":
            return action.payload
        default:
            return state
    }
}

const store = createStore(state_reducer, {})

// this needs to be moved somewhere relevant
const getState = () => {
    fetch('http://127.0.0.1:8000/state')
    .then((res)=>{
        return res.json();
    }).then((obj)=>{
        if (obj.status === 'success') {
            store.dispatch(
                {
                    type: "UPDATE_STATE",
                    payload: obj
                }
            )
        }
        else {
            throw(JSON.stringify(obj))
        }
    }).catch(error=>{
        if (error instanceof TypeError) {
            setTimeout(function(){
               getState()
            }, 1000);
        }
        console.log(error)
    })
}
getState()

export default store
