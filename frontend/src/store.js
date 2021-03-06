import {createStore} from 'redux'
import {combineReducers} from 'redux'

function files(state = [], action) {
    switch (action.type) {
        case 'LOAD_SEARCH_TAB':
            return action.payload.data.files
        case 'SAVE_FILE':
            return action.payload.data.files
        case 'SEARCH_COMPLETED':
            return action.payload.data.files
        case 'FILE_SELECTED':
            return action.payload.data.files
        case 'UPDATE_TABLE':
            return action.payload.data.files
        case 'REMOVE_FILE':
            return action.payload.data.files
        default:
            return state
    }
}

function table(state = {}, action) {
    switch (action.type) {
        case 'LOAD_SEARCH_TAB':
            return action.payload.data.table
        case 'ADD_FILTER':
            return action.payload.data.table
        case 'REMOVE_FILTER':
            return action.payload.data.table
        case 'SEARCH_COMPLETED':
            return action.payload.data.table
        case 'UPDATE_TABLE':
            return action.payload.data.table
        case 'FILE_SELECTED':
            return action.payload.data.table
        case 'REMOVE_FILE':
            return action.payload.data.table
        case 'SEARCHING':
            return {}
        default:
            return state
    }
}

function filters(state = [], action) {
    switch (action.type) {
        case 'LOAD_SEARCH_TAB':
            return action.payload.data.filters
        case 'ADD_FILTER':
            return action.payload.data.filters
        case 'REMOVE_FILTER':
            return action.payload.data.filters
        case 'SEARCH_COMPLETED':
            return action.payload.data.filters
        case 'FILE_SELECTED':
            return action.payload.data.filters
        case 'REMOVE_FILE':
            return action.payload.data.filters
        default:
            return state
    }
}

function searching(state = false, action) {
    switch (action.type) {
        case 'SEARCH_COMPLETED':
            return false
        case 'SEARCHING':
            return action.payload
        default:
            return state
    }
}

function insights(state = [], action) {
    switch (action.type) {
        case 'LOAD_SEARCH_TAB':
            return action.payload.data.insights
        case 'INSIGHT_GENERATED':
            return action.payload.data.insights
        case 'REMOVE_INSIGHT':
            return action.payload.data.insights
        case 'FILE_SELECTED':
            return action.payload.data.insights
        case 'REMOVE_FILE':
            return action.payload.data.insights
        case 'SEARCH_COMPLETED':
            return action.payload.data.insights
        default:
            return state
    }
}

function fileIndex(state = 0, action) {
    switch (action.type) {
        case 'CHANGE_FILE_INDEX':
            return action.payload
        case 'UPDATE_TABLE':
            return action.payload.data.selectedIndex
        case 'REMOVE_FILE':
            return 0
        default:
            return state
    }
}

function settings(state = {}, action) {
    switch (action.type) {
        case 'LOAD_SEARCH_TAB':
            return action.payload.data.settings
        default:
            return state
    }
}

const reducers = combineReducers({
    files,
    table,
    filters,
    searching,
    insights,
    fileIndex,
    settings
})

const store = createStore(reducers, {})

// this needs to be moved somewhere relevant
const getState = () => {
    fetch('http://127.0.0.1:8000/state')
        .then((res) => {
            return res.json();
        }).then((obj) => {
        if (obj.status === 'success') {
            store.dispatch(
                {
                    type: "LOAD_SEARCH_TAB",
                    payload: obj
                }
            )
        } else {
            throw(JSON.stringify(obj))
        }
    }).catch(error => {
        if (error instanceof TypeError) {
            setTimeout(function () {
                getState()
            }, 1000);
        }
        console.log(error)
    })
}
getState()

export default store
