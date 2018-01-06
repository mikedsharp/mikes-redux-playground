import * as actions from './actions/index';
import * as ReducerConfiguration from './store/configureStore';

const store = ReducerConfiguration.configure();

const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    console.log('name is', state.name);
    console.log('New state', store.getState());

    if (state.map.isFetching){
        document.getElementById('app').innerHTML = 'loading...';
    } else if (state.map.url) {
        document.getElementById('app').innerHTML = `<a target="_blank" href="${state.map.url}">View your location </a>`;
    }
});

store.dispatch(actions.fetchLocation());
store.dispatch(actions.changeName('mike'));
store.dispatch(actions.addHobby('walking'));
store.dispatch(actions.addHobby('nothing'));
store.dispatch(actions.removeHobby(2));
store.dispatch(actions.changeName('foo'));
store.dispatch(actions.addMovie('Meltdown 2009',  'vanity piece'))
store.dispatch(actions.addMovie('Lethal Weapon 5',  'exploitation'))
store.dispatch(actions.removeMovie(1));
