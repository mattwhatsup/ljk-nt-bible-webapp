import type { Middleware } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

const localStorageMiddleware: Middleware<{}, RootState> =
  store => next => action => {
    const result = next(action)
    const state = store.getState()
    localStorage.setItem('settings', JSON.stringify(state.settings))
    return result
  }

export default localStorageMiddleware
