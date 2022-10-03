import { GET_CLIENTS, GET_CLIENTS_TRAITS } from "../LoginTypes";

const initialState = {
  clients: [],
  //loading: true,
  clientTraits: []
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTS:
      console.log(action.payload)
      return {
        ...state,
        clients: action.payload,
        // loading: false,
      };
      case GET_CLIENTS_TRAITS:
     // console.log(action.payload)
      return {
        ...state,
        clientTraits: action.payload,
        // loading: false,
      };
    
    default:
      return state;
  }
}

export const clientTrait = (state = initialState.clientTraits, action) => {
switch (action.type) {
  case GET_CLIENTS_TRAITS:
    console.log(action.payload);
    return {
      ...state,
      clientTraits: action.payload,
      // loading: false,
    };

  default:
    return state;
}
}

