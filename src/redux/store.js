import { configureStore } from '@reduxjs/toolkit';
import filter from './reducers/filter';
import news from '../components/newsList/news_slice'
import stringMiddleware from '../middleware/stringMiddleware'
export const store = configureStore({
   reducer: { news, filter },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
   devTools: process.env.NODE_ENV !== "production"
})