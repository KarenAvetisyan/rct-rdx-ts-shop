import { createStore } from 'redux';
import rootReducer from '../reducers'

const localStore = localStorage['redux-store'] ? JSON.parse(localStorage['redux-store']) : console.log('nothing found...')
const store = createStore(rootReducer, localStore);


store.subscribe(() => {
   localStorage['redux-store'] = JSON.stringify(store.getState()) 
})


export default store;