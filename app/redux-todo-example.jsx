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
                ...state,
                todos: [...state.todos, action.newTodo]
            };
        }
        case 'POP_TODO': {
            var newTodos = [...state.todos];
            newTodos.pop();
            return {
                ...state,
                todos: newTodos
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

var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

// subscribe to changes
var unsubscribe = store.subscribe(() => {
    var state = store.getState();
    console.log('search text  is', state.searchText);
    document.getElementById('app').innerHTML = state.todos[state.todos.length - 1];
});


console.log('previousState', store.getState());
store.dispatch({
    type: 'CHANGE_SEARCH_TEXT',
    searchText: 'fuck react'
});

store.dispatch({
    type: 'ADD_TODO',
    newTodo: 'throw react out of the window'
});


store.dispatch({
    type: 'CHANGE_SEARCH_TEXT',
    searchText: 'now I love react for no reason'
});

store.dispatch({
    type: 'ADD_TODO',
    newTodo: 'learn to live with react'
});

store.dispatch({
    type: 'ADD_TODO',
    newTodo: 'get stockholm syndrome for react'
});

store.dispatch({
    type: 'POP_TODO'
});

console.log('currentState', store.getState());
