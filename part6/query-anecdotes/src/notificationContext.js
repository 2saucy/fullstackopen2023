import { createContext, useContext, useReducer  } from "react";

const notificationReducer = (state, action) => {
    switch (action.type){
        case 'SHOW_NOTIFICATION':
            return action.payload
        case 'HIDE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return(
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const useAndDispatch = useContext(NotificationContext)
    return useAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext