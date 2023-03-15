import { createContext, useContext, useReducer } from "react";

const FilterContext = createContext();

const filterReducer = (state,action) => {
    switch (action.type) {
        case  "FILTER_VIDEOS" :
            return  {...state , filteredCategory : action.payload} 

            // return action.payload === "All" ? {...state , filters : {}} : {...state , filters : action.payload} 
    }
}
 const FilterProvider = ({children}) => {
    const [filterState , dispatchFilter] = useReducer(filterReducer , {filteredCategory : "All"})
    return <FilterContext.Provider value={{filterState , dispatchFilter}}>
        {children}
    </FilterContext.Provider>
 }

 const useFilters = () => useContext(FilterContext)

 export {useFilters , FilterProvider}