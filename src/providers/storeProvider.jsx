"use client"
 
 import { useState, createContext} from 'react'

 export const StoreContext = createContext(null)

const StoreProvider = ({ children }) => {

const [store, setStore] = useState({
    printSelection: [],
    tooManyPrints: false,
})

return (
    <StoreContext.Provider
        value={[store, setStore]}
    >
        {children}
    </StoreContext.Provider>
)
}

export default StoreProvider