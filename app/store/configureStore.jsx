import * as redux from 'redux';
import * as thunk from 'redux-thunk';

import {nameReducer, hobbiesReducer, moviesReducer, mapReducer} from './../reducers/index';
export const configure = () => {
    const reducer = redux.combineReducers({
        name: nameReducer,
        hobbies: hobbiesReducer,
        movies: moviesReducer,
        map: mapReducer
    });
    
    const store = redux.createStore(reducer, redux.compose(
        redux.applyMiddleware(thunk.default),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
};