var redux = require('redux');

console.log('starting redux...');
var nextHobbyId = 1;
var nextMovieId = 1;
var stateDefault = {
    name: 'Anonymous',
    hobbies: [],
    movies: []
};
var oldReducer = (state = stateDefault, action) => {
    console.log('new action', action);
    switch (action.type) {
        case 'ADD_MOVIE': {
            return {
                ...state,
                movies: [
                    ...state.movies,
                    {
                        genre: action.genre,
                        title: action.title,
                        id: nextMovieId++
                    }
                ]
            }
        }
        case 'REMOVE_MOVIE': {
            return {
                ...state,
                movies: [
                    state.movies.filter(movie => movie.id !== action.id)
                ]
            }
        }
        case 'ADD_HOBBY': {
            return {
                ...state,
                hobbies: [
                    ...state.hobbies,
                    {
                        id: nextHobbyId++,
                        hobby: action.hobby
                    }
                ]
            }
        }
        case 'REMOVE_HOBBY': {
            return {
                ...state,
                hobbies: [
                    state.hobbies.filter(hobby => hobby.id !== action.id)
                ]
            }
        }
        default: {
            return state;
        }
    }
};

var nameReducer = (state = 'Anonymous', action) => {
    switch(action.type) {
        case 'CHANGE_NAME': {
            return action.name;
        }
        default: {
            return state;
        }
    }
};

var hobbiesReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_HOBBY': {
            return [
                ...state,
                {
                    id: nextHobbyId++,
                    hobby: action.hobby
                }
            ]
        }
        case 'REMOVE_HOBBY': {
            return  state.filter(hobby => hobby.id !== action.id)
        }
        default: {
            return state;
        }
    }
}

var moviesReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_MOVIE': {
            return [
                ...state,
                {
                    genre: action.genre,
                    title: action.title,
                    id: nextMovieId++
                }
            ]
        }
        case 'REMOVE_MOVIE': {
            return state.filter(movie => movie.id !== action.id)
        }
        default: {
            return state;
        }
    }
};

var reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: moviesReducer
});

var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

// subscribe to changes
var unsubscribe = store.subscribe(() => {
    var state = store.getState();
    console.log('name is', state.name);
    document.getElementById('app').innerHTML = state.name;
    console.log('New state', store.getState());
});

// unsubscribe();
var currentState = store.getState();

console.log('currentState', currentState);

store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Mike'
});

store.dispatch({
    type: 'ADD_HOBBY',
    hobby: 'Nothing'
});


store.dispatch({
    type: 'ADD_HOBBY',
    hobby: 'Walking'
});

store.dispatch({
    type: 'REMOVE_HOBBY',
    id: 2
});


store.dispatch({
    type: 'CHANGE_NAME',
    name: 'foo'
});


store.dispatch({
    type: 'ADD_MOVIE',
    title: 'Meltdown 2009',
    genre: 'vanity piece'
});


store.dispatch({
    type: 'ADD_MOVIE',
    title: 'Lethal Weapon 5',
    genre: 'exploitation'
});

store.dispatch({
    type: 'REMOVE_MOVIE',
    id: 1
});
