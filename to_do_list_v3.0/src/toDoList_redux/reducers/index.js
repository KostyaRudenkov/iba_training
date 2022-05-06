import { combineReducers } from "redux";
import tasks from './tasks.js';

const rootReducer = combineReducers( { tasks } );

export default rootReducer;