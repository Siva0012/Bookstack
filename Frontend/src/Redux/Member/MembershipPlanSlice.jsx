import { createSlice } from "@reduxjs/toolkit"

export const memberShipSlice = createSlice(
     {
          name : 'membershipType',
          initialState : {
               value : ""
          },
          reducers : {
               updateMembershipType : (state , action) => {
                    state.value = action.payload
               }
          }
     }
)

export const {updateMembershipType} = memberShipSlice.actions
export default memberShipSlice.reducer