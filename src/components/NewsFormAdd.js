import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'
import { useHttp } from '../hooks/useHttp'
import { newsCreated } from './newsList/news_slice'
const NewsFormAdd = () => {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const { filterLoadingStatus, filters } = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const { request } = useHttp();


  const onSubmitHandler = e => {
    e.preventDefault();
    const news = { id: v4(), name, description, category }
    request("https://news-blog-backend-7fc557758889.herokuapp.com/news", "POST", JSON.stringify(news))
      .then(res => console.log('success'))
      .then(dispatch(newsCreated(news)))
      .catch(err => console.log(err))

    setName("")
    setDescription("")
    setCategory("")
  }
  const renderFilters = (filters, status) => {
    if (status === 'loading') {
      return <option>Loading options</option>
    } else if (status === 'error') {
      return <option>Error options</option>
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        //eslint-disable-next-line
        if (name === 'all') return
        return <option value={name} key={name}>{label}</option>

      })
    }
  }

  return (
    <form className='border p-4 shadow-lg rounded ' onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className='form-label fs-4'>Name for new News</label>
        <input
          type="text"
          required
          name="name"
          className='form-control'
          id="name"
          placeholder='What is name of news?'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="text" className='form-label fs-4'>Description</label>
        <textarea
          type="text"
          required
          name="text"
          className='form-control'
          id="text"
          placeholder='What is your news about?'
          style={{ height: "120px" }}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className='form-label'>Choose category of news</label>
        <select
          name="category"
          id="category"
          required
          className='form-select'
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option>News about...</option>
          {renderFilters(filters, filterLoadingStatus)}
        </select>
      </div>
      <button type='submit' className='btn btn-dark text-light w-100 shadow-lg'>Create News</button>
    </form>
  )
}

export default NewsFormAdd
