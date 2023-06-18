import { createSlice } from "@reduxjs/toolkit";

export const singleMemberSlice = createSlice({
    name : 'singleMember',
    initialState : {
        value : {}
    },
    reducers : {
        updateSingleMember : (state , action) => {
            state.value = action.payload.value
        }
    }
})

export const {updateSingleMember} = singleMemberSlice.actions
export default singleMemberSlice.reducer