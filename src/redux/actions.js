import { createAction } from "@reduxjs/toolkit"

export const filtersFetching = createAction("FILTERS_FETCHING")
export const filtersFetched = createAction("FILTERS_FETCHED")
export const filtersFetchingError = createAction("FILTERS_FETCHING_ERROR")
export const filtersFilterChanged = createAction("ACTIVE_FILTER_CHANGE")