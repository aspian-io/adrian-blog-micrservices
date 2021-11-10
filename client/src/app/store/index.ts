import { useMemo } from 'react'
import { createStore, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import rootReducer from "./rootReducer"
import { IStoreState } from './rootReducerTypes'

export let store: Store;

function initStore ( initialState: IStoreState ) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools( applyMiddleware( thunkMiddleware ) )
  )
}

export const initializeStore = ( preloadedState: IStoreState ) => {
  let _store = store ?? initStore( preloadedState )

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if ( preloadedState && store ) {
    _store = initStore( {
      ...store.getState(),
      ...preloadedState,
    } )
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if ( typeof window === 'undefined' ) return _store
  // Create the store once in the client
  if ( !store ) store = _store

  return _store
}

export function useStore ( initialState: IStoreState ) {
  const store = useMemo( () => initializeStore( initialState ), [ initialState ] )
  return store
}