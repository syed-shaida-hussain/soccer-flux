import { createContext, useContext, useReducer } from "react";

const FilterContext = createContext();

const filterReducer = (state,action) => {
    switch (action.type) {
        case  "FILTER_VIDEOS" :
            return  {...state , filteredCategory : action.payload} 
        case "SEARCH_FILTER" :
            return {...state , searchQuery : action.payload }
    }
}
 const FilterProvider = ({children}) => {
    const [filterState , dispatchFilter] = useReducer(filterReducer , {filteredCategory : "All" , searchQuery : ""})
    return <FilterContext.Provider value={{filterState , dispatchFilter}}>
        {children}
    </FilterContext.Provider>
 }

 const useFilters = () => useContext(FilterContext)

 export {useFilters , FilterProvider}