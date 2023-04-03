import { USER_DATA } from '../../constants/constants'

// import from files
const initialState = {
  user: []
}

// reducer for user data
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return { ...state, user: action.payload }
    default: {
      return state
    }
  }
}
export default authReducer
