import React, { useCallback, useEffect } from 'react'
import { useHttp } from '../hooks/useHttp'
import { useSelector, useDispatch } from 'react-redux';
import { newsFetched, newsFetchingError, newsFetching, newsDeleted } from '../redux/actions';
import Spinner from './Spinner';
import Error from './Error';
import NewsListItem from './NewsListItem';
const NewsList = () => {
   const { request } = useHttp();
   const { filteredNews, filterLoadingStatus } = useSelector(state => state); // boshlang'ich news newsLoadingStatus
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(newsFetching())
      request("http://localhost:5000/news")
         .then((data) => dispatch(newsFetched(data)))
         .catch(err => dispatch(newsFetchingError()))

      //eslint-disable-next-line
   }, [])

   const onDelete = useCallback((id) => {
      request(`http://localhost:5000/news/${id}`, "DELETE")
         .then(data => console.log(data))
         .then(dispatch(newsDeleted(id)))
         .catch(err => console.log(err))
      // eslint-disable-next-line
   }, [])
   if (filterLoadingStatus === 'loading') {
      return <Spinner />
   } else if (filterLoadingStatus === "error") {
      return <Error />
   }
   const renderNewsList = (arr) => {
      if (arr.length === 0) {
         return <h4 className='text-center mt-5'>News doesn't exists</h4>
      }
      return arr.map(({ id, ...props }) => {
         return <NewsListItem key={id} onDelete={() => onDelete(id)} {...props} />
      }).reverse()
   }
   const element = renderNewsList(filteredNews)
   return <ul>
      {element}
   </ul>
}

export default NewsList