import {createSlice} from '@reduxjs/toolkit'

export const memberDataSlice = createSlice(
     {
          name : 'memberData',
          initialState : {
               value : {}
          },
          reducers : {
               updateMemberData : (state , action) => {
                    state.value = action.payload
               }
          }

     }
)

export const {updateMemberData} = memberDataSlice.actions
export default memberDataSlice.reducer