import { configureStore } from '@reduxjs/toolkit'
import savedReducer from './savedSlice'

const store = configureStore({
  reducer: {
    saved: savedReducer
  }
})

store.subscribe(() => {
  try {
    const state = store.getState()
    localStorage.setItem(
      'foodfacts-saved',
      JSON.stringify(state.saved.items)
    )
  } catch {
    // storage might be full or unavailable — fail silently
  }
})

export default store