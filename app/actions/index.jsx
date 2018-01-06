import axios from 'axios';

export const changeName = (name) => {
    return {
        type: 'CHANGE_NAME',
        name
    }
}

export const addHobby = (hobby) => {
    return {
        type: 'ADD_HOBBY',
        name
    }
    
};

export const removeHobby = (id) => {
    return {
        type: 'REMOVE_HOBBY',
        id
    }
};

export const addMovie = (title, genre) => {
    return {
        type: 'ADD_MOVIE',
        title,
        genre
    }
    
};

export const removeMovie = (id) => {
    return {
        type: 'REMOVE_MOVIE',
        id
    }
};

export const startLocationFetch = () => {
    return {
        type: 'START_LOCATION_FETCH'
    }
};

export const completeLocationFetch = (url) => {
    return {
        type: 'COMPLETE_LOCATION_FETCH',
        url
    }
};

export const fetchLocation = () => {
    return (dispatch, getState) => {
        dispatch(startLocationFetch());

        axios.get('http://ipinfo.io')
            .then(response => {
                const loc = response.data.loc;
                const baseUrl = 'http://maps.google.com?q=';
    
                dispatch(completeLocationFetch(`${baseUrl}${loc}`));
            });
    };
};
