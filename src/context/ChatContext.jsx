import { createContext, useContext, useReducer } from "react";
import { AuthContex } from "./AuthContext";

export const ChatContex = createContext();

export const ChatContexProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContex);

    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    }

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return (
        <ChatContex.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContex.Provider>
    )

}