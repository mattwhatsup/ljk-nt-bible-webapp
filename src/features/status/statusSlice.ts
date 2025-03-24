import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

interface StatusState {
  isJumpToDialogOpen: boolean
}

const initialState: StatusState = {
  isJumpToDialogOpen: false,
}

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    openJumpToDialog(state) {
      state.isJumpToDialogOpen = true
    },
    closeJumpToDialog(state) {
      state.isJumpToDialogOpen = false
    },
  },
})

// Actions
export const { openJumpToDialog, closeJumpToDialog } = statusSlice.actions

// Selectors
export const selectIsJumpToDialogOpen = (state: RootState) =>
  state.status.isJumpToDialogOpen

export default statusSlice.reducer
