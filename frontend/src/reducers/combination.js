import {combineReducers} from "redux";
import authReducer from "./auth";
import dataReducer from "./data"

const reducer = combineReducers({
    auth: authReducer,
    data: dataReducer,
});

export default reducer;