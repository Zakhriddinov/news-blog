import React from 'react'
import Navbar from './components/Navbar'
import NewsFilter from './components/NewsFilter'
import NewsFormAdd from './components/NewsFormAdd'
import NewsList from './components/newsList/NewsList'

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <div className="content">
        <NewsList />
        <div className="content_page mb-5">
          <NewsFormAdd />
          <NewsFilter />
        </div>
      </div>
    </div>
  )
}

export default App