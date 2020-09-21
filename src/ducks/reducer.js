const initialState = {
  username: '',
  id: null,
  profile_pic: ''
}

const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

export function loginUser(username, id, profile_pic) {
  console.log('going through', username)
  return {
    type: LOGIN_USER,
    payload: {
      username,
      id,
      profile_pic
    }
  }
}

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
    payload: {
      username: '',
      id: null,
      profile_pic: ''
    }
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, username: action.payload.username, id: action.payload.id, profile_pic: action.payload.profile_pic };
    case LOGOUT_USER:
      return { ...state, username: action.payload.username, id: action.payload.id, profile_pic: action.payload.profile_pic };
    default:
      return initialState;
  }
}