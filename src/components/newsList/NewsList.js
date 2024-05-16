import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Spinner';
import Error from '../Error'
import NewsListItem from '../NewsListItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../style/news_list.css';
import { newsDeleted, fetchNews, filteredNewsSelected } from './news_slice';
import { useHttp } from '../../hooks/useHttp';

export default function NewsList() {
   const filteredNews = useSelector(filteredNewsSelected)
   const filterLoadingStatus = useSelector(state => state.filterLoadingStatus)
   const dispatch = useDispatch()
   const { request } = useHttp();

   useEffect(() => {
      dispatch(fetchNews())
   }, [])

   const onDelete = useCallback((id) => {
      request(`https://news-blog-backend-7fc557758889.herokuapp.com/news/${id}`, "DELETE")
         .then(data => console.log(data + "Deleted"))
         .then(dispatch(newsDeleted(id)))
         .catch(() => dispatch("NEWS_FETCHING_ERROR"))
   }, [])

   if (filterLoadingStatus === "loading") {
      return <Spinner />
   } else if (filterLoadingStatus === "error") {
      return <Error />
   }

   const renderNewsList = (arr) => {
      if (arr.length === 0) {
         return <CSSTransition timeout={500} classNames="item">
            <h5 className="text-center mt-5">New's doesn't found</h5>
         </CSSTransition>
      }
      return arr.map(({ id, ...props }) => {
         return (
            <CSSTransition key={id} timeout={500} classNames="item">
               <NewsListItem onDelete={() => onDelete(id)} {...props} />
            </CSSTransition>
         )
      }).reverse()
   }

   const element = renderNewsList(filteredNews)

   return (
      <TransitionGroup component="ul">
         {element}
      </TransitionGroup>
   )
}
