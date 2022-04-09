import React, { useEffect } from 'react'
import { useHttp } from '../hooks/useHttp';
import { useDispatch, useSelector } from 'react-redux';
import { filtersFetched, filtersFetching, filtersFetchingError, filtersFilterChanged } from '../redux/actions';
import Spinner from '../components/Spinner'
import Error from '../components/Error'
import classNames from 'classnames'
const NewsFilter = () => {
  const { filters, filterLoadingStatus, activeFilter } = useSelector(state => state.filter)
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetching())
    request("https://react-project-backend-api.herokuapp.com/filters")
      .then(data => dispatch(filtersFetched(data)))
      .catch(err => dispatch(filtersFetchingError()))
    //eslint-disable-next-line
  }, [])

  if (filterLoadingStatus === 'loading') {
    return <Spinner />
  } else if (filterLoadingStatus === 'error') {
    return <Error />
  }

  const renderFilters = arr => {
    if (arr.length === 0) {
      return <h5 className='text-center mt-5'>Filters doesn't found</h5>
    }
    return arr.map(({ name, className, label }) => {
      const btnClasses = classNames("btn", className, {
        "active": name === activeFilter
      })
      return <button
        key={name}
        id={name}
        className={btnClasses}
        onClick={() => dispatch(filtersFilterChanged(name))}
      >{label}</button>
    })
  }

  const elements = renderFilters(filters)

  return (
    <div className='card shadow-lg mt-4'>
      <div className="card-body">
        <p className="card-text">Filter by category</p>
        <div className="btn-group">
          {elements}
        </div>
      </div>
    </div>
  )
}

export default NewsFilter