const intialState = {
   news: [],
   newsLoadingStatus: "sar",
   filters: [],
   filterLoadingStatus: "sar",
   activeFilter: "all",
   filteredNews: []
}

const reducer = (state = intialState, action) => {
   switch (action.type) {
      case "NEWS_FETCHING":
         return {
            ...state,
            newsLoadingStatus: "loading"
         }
      case "NEWS_FETCHED":
         return {
            ...state,
            news: action.payload,
            filteredNews: state.activeFilter === 'all' ? action.payload : action.payload.filter(s => s.category === state.activeFilter),
            newsLoadingStatus: "sar"
         }
      case "NEWS_FETCHING_ERROR":
         return {
            ...state,
            newsLoadingStatus: "error"
         }
      case "NEWS_CREATED":
         const newsCreatedNewsList = [...state.news, action.payload]
         return {
            ...state,
            news: newsCreatedNewsList,
            filteredNews: state.activeFilter === 'all' ? newsCreatedNewsList : newsCreatedNewsList.filter(s => s.category === state.activeFilter)
         }
      case "FILTERS_FETCHING":
         return {
            ...state,
            filterLoadingStatus: "loading"
         }
      case "FILTERS_FETCHED":
         return {
            ...state,
            filters: action.payload,
            filterLoadingStatus: "sar"
         }
      case "FILTERS_FETCHING_ERROR":
         return {
            ...state,
            filterLoadingStatus: "error"
         }
      case "ACTIVE_FILTER_CHANGE":
         return {
            ...state,
            activeFilter: action.payload,
            filteredNews: action.payload === 'all' ? state.news : state.news.filter(s => s.category === action.payload)
         }
      case "NEWS_DELETED":
         const newNewsList = state.news.filter(s => s.id !== action.payload)
         return {
            ...state,
            news: newNewsList,
            filteredNews: state.activeFilter === 'all' ? newNewsList : newNewsList.filter(s => s.category.activeFilter)
         }
      default:
         return state
   }
}
export default reducer