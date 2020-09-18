const initialState = {
  username: '',
  id: null,
  profile_pic: ''
}

const LOGIN_USER = 'LOGIN_USER';

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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, username: action.payload.username, id: action.payload.id, profile_pic: action.payload.profile_pic };
    default:
      return initialState;
  }
}