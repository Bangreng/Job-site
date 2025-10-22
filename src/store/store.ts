import { combineReducers, configureStore } from "@reduxjs/toolkit";
import jobReducer from './reducer/JobSlice'

const rootReducer = combineReducers({
    jobs: jobReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']