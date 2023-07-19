import {configureStore} from '@reduxjs/toolkit'
import memberReducer from '../Redux/Admin/MemberSlice'
import singleMemberReducer from '../Redux/Admin/SingleMemberSlice'
import memberShipReducer from './Member/MembershipPlanSlice'
import memberDataReducer from './Member/MemberDataSlice'
import adminDataReducer from './Admin/AdminDataSlice'

//persist
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedMemberReducer = persistReducer(persistConfig , memberReducer)
  const persistedSinglememberReducer = persistReducer(persistConfig , singleMemberReducer)
  const persistedMemberdataReducer = persistReducer(persistConfig , memberDataReducer )
  const persistedMembershipReducer = persistReducer(persistConfig , memberShipReducer)
  const persistedAdminDataReducer = persistReducer(persistConfig , adminDataReducer)

export const store = configureStore(
    {
        reducer : {
            members : persistedMemberReducer,
            singleMember : persistedSinglememberReducer,
            memberShipType : persistedMembershipReducer,
            memberData : persistedMemberdataReducer,
            adminData : persistedAdminDataReducer
        },
        middleware : [thunk]
    }
)

export const persistor = persistStore(store)