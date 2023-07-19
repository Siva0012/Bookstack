import {createSlice} from '@reduxjs/toolkit'

export const adminDataSlice = createSlice(
      {
            name : 'adminData',
            initialState : {
                  value : {}
            },
            reducers : {
                  updateAdminData : (state , action) => {
                        state.value = action.payload
                  }
            }
      }
)

export const {updateAdminData} = adminDataSlice.actions
export default adminDataSlice.reducer