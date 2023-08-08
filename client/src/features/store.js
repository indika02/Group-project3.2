import { createStore } from 'redux';
import rootReducer from './reducer'; // Assuming this is the path to your combined reducer

const store = createStore(rootReducer);

export default store;
