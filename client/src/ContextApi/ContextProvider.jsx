import React, { useState } from 'react'
import { newContext } from './context.js'
const ContextProvider = ({ children }) => {
    const [roles, setRoles] = useState('')
    return (
        <>
            <newContext.Provider value={{ roles, setRoles }}>
                {children}
            </newContext.Provider>
        </>
    )
}

export default ContextProvider
