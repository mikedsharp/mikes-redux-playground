var redux = require('redux');
var axios = require('axios');

console.log('starting redux...');

// nameReducer and action generators
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

var changeName = (name) => {
    return {
        type: 'CHANGE_NAME',
        name
    }
}

// hobbyReducer and action generators
var nextHobbyId = 1;
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

var addHobby = (hobby) => {
    return {
        type: 'ADD_HOBBY',
        name
    }
    
};

var removeHobby = (id) => {
    return {
        type: 'REMOVE_HOBBY',
        id
    }
};

// movieReducer and action generators
var nextMovieId = 1;
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

var addMovie = (title, genre) => {
    return {
        type: 'ADD_MOVIE',
        title,
        genre
    }
    
};

var removeMovie = (id) => {
    return {
        type: 'REMOVE_MOVIE',
        id
    }
};

// mapReducer and action generators
var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
    switch(action.type) {
        case 'START_LOCATION_FETCH': {
            return {
                isFetching: true,
                url: undefined
            };
        }
        case 'COMPLETE_LOCATION_FETCH': {
            return {
                isFetching: false,
                url: action.url
            };
        }
        default: {
            return state;
        }
    }
};

var startLocationFetch = () => {
    return {
        type: 'START_LOCATION_FETCH'
    }
};


var completeLocationFetch = (url) => {
    return {
        type: 'COMPLETE_LOCATION_FETCH',
        url
    }
};

var fetchLocation = () => {
    store.dispatch(startLocationFetch());

    axios.get('http://ipinfo.io')
        .then(response => {
            var loc = response.data.loc;
            var baseUrl = 'http://maps.google.com?q=';

            store.dispatch(completeLocationFetch(`${baseUrl}${loc}`));
        });
};

var reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: moviesReducer,
    map: mapReducer
});

var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

// subscribe to changes
var unsubscribe = store.subscribe(() => {
    var state = store.getState();
    console.log('name is', state.name);
    console.log('New state', store.getState());

    if (state.map.isFetching){
        document.getElementById('app').innerHTML = 'loading...';
    } else if (state.map.url) {
        document.getElementById('app').innerHTML = `<a target="_blank" href="${state.map.url}">View your location </a>`;
    }
});
fetchLocation();
// unsubscribe();
var currentState = store.getState();

console.log('currentState', currentState);

store.dispatch(changeName('mike'));
store.dispatch(addHobby('walking'));
store.dispatch(addHobby('nothing'));
store.dispatch(removeHobby(2));
store.dispatch(changeName('foo'));
store.dispatch(addMovie('Meltdown 2009',  'vanity piece'))
store.dispatch(addMovie('Lethal Weapon 5',  'exploitation'))
store.dispatch(removeMovie(1));
