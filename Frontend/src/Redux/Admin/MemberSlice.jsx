import { createSlice } from "@reduxjs/toolkit";

export const memberSlice = createSlice(
    {
        name : "members",
        initialState : {
            value : []
        },
        reducers : {
            updateMembers : (state , action) => {
                state.value = action.payload.members
            }
        }
    }
    
)

export const {updateMembers} = memberSlice.actions
export default memberSlice.reducer