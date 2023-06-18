import {configureStore} from '@reduxjs/toolkit'
import memberReducer from '../Redux/Admin/MemberSlice'
import singleMemberReducer from '../Redux/Admin/SingleMemberSlice'

export default configureStore(
    {
        reducer : {
            members : memberReducer,
            singleMember : singleMemberReducer
        }
    }
)