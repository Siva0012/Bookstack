import {configureStore} from '@reduxjs/toolkit'
import memberReducer from '../Redux/Admin/MemberSlice'
import singleMemberReducer from '../Redux/Admin/SingleMemberSlice'
import memberShipReducer from './Member/MembershipPlanSlice'

export default configureStore(
    {
        reducer : {
            members : memberReducer,
            singleMember : singleMemberReducer,
            memberShipType : memberShipReducer
        }
    }
)