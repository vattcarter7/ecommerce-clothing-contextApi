import createDataContext from '../createDataContext';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { SET_CURRENT_USER } from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };

    default:
      return state;
  }
};

const setCurrentUser = dispatch => async user => {
  try {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          user = {
            id: snapShot.id,
            ...snapShot.data()
          };
          dispatch({
            type: SET_CURRENT_USER,
            payload: user
          });
        });
      }
    });
  } catch (err) {}
};

const actions = {
  setCurrentUser
};

const INITIAL_STATE = {
  currentUser: null
};

export const { Provider, Context } = createDataContext(
  authReducer,
  actions,
  INITIAL_STATE
);
