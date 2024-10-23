const initialState = {
  users: [],
};

export function userReducer  (state = initialState, action)  {
  switch (action.type) {
    case 'GET_USERS_SUCCESS':
      return { ...state, users: action.payload };
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'DELETE_USER':
      return { ...state, users: state.users.filter((user) => user.id !== action.payload) };
    case 'CHANGE_PASSWORD':
      return state;
    default:
      return state;
  }
};
