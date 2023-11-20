import React, { createContext } from 'react'

const AuthContext = createContext()

function AuthContextProvider({ children, contextData }) {
    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
}

export { AuthContextProvider, AuthContext }