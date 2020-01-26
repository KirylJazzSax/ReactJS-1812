import initReducers from './reducers'
import { createStore } from 'redux'

export default function initStore () {
    let initialStore = {}

    return createStore (initReducers, initialStore)
}