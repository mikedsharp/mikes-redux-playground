var redux = require('redux');

console.log('Starting todo redux example');

var stateDefault = {
    searchText: '',
    showCompleted: false,
    todos: []
};
var reducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'CHANGE_SEARCH_TEXT': {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case 'ADD_TODO': {
            return {
                ...state
            };
        }
        case 'REMOVE_TODO': {
            return {
                ...state
            };
        }
        case 'CHANGE_SHOW_COMPLETED': {
            return {
                ...state
            };
        }
        default: {
            return state;
        }
    }
};

var store = redux.createStore(reducer);
console.log('previousState', store.getState());
store.dispatch({
    type: 'CHANGE_SEARCH_TEXT',
    searchText: 'fuck react'
});
console.log('currentState', store.getState());
