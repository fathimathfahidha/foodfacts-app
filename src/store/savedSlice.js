import { createSlice } from '@reduxjs/toolkit'

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem('foodfacts-saved')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveToStorage = (items) => {
  try {
    localStorage.setItem('foodfacts-saved', JSON.stringify(items))
  } catch {
    // ignore write errors
  }
}

const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    items: loadFromStorage()
  },
  reducers: {
    addItem: (state, action) => {
      const exists = state.items.some(item => item.id === action.payload.id)
      if (!exists) {
        state.items.push(action.payload)
        saveToStorage(state.items)
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      saveToStorage(state.items)
    }
  }
})

export const { addItem, removeItem } = savedSlice.actions
export default savedSlice.reducer