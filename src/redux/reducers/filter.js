import { createReducer } from "@reduxjs/toolkit"
import { filtersFetched, filtersFetching, filtersFetchingError, filtersFilterChanged } from "../actions";

const intialState = {
   filters: [],
   filterLoadingStatus: "sar",
   activeFilter: "all",
   filteredNews: []
}
const filter = createReducer(intialState, {
   [filtersFetching]: state => { state.filterLoadingStatus = "loading" },
   [filtersFetched]: (state, action) => {
      state.filterLoadingStatus = "sar";
      state.filters = action.payload;
   },
   [filtersFetchingError]: state => { state.filterLoadingStatus = 'error' },
   [filtersFilterChanged]: (state, action) => { state.activeFilter = action.payload },
}, [], state => state)

export default filter