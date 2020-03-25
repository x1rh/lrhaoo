import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BlogSkeleton from './BlogSkeleton';
import * as serviceWorker from './serviceWorker';



ReactDOM.render(
  <React.StrictMode>
    <BlogSkeleton />
  </React.StrictMode>,
  document.getElementById('root')
);

