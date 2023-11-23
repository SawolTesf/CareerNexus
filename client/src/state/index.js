import { createSlice } from '@reduxjs/toolkit'; // import createSlice which is a function that takes in an object with a name and an initial state and reducers.

// This is the global state for the application. It is the state that is shared between all of the components. It is the state that is passed into the Provider component in the index.js file. I will be able to access this from any component in the application using the useSelector hook.

const initialState = {
    mode: 'light', // This is the mode of the application. It can be either light or dark.
    user: null, // This is the user object. It will be null if there is no user logged in.
    token: null, // This is the token that is returned from the server when a user logs in. It will be null if there is no user logged in.
    posts : [], // This is the array of posts that will be displayed on the home page.

};

export const authSlice = createSlice({
    name: 'auth', // This is the name of the slice. It is used to create the action types.
    initialState, // This is the initial state of the slice.
    reducers: { // These are the reducers that will be used to update the state.

    }
});
