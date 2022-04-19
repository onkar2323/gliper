import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useResultContext } from '../context/ResultContextProvider';
import { Loading } from './Loading';

const Results = () => {
  const { results, isLoading, getResults, searchData } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchData) {
      if (location.pathname === '/videos') {
        getResults('/search/q=' + searchData + 'videos' + 'youtube')
      } else {
        getResults(location.pathname + '/q=' + searchData + '&num=40')
      }
    }

  }, [searchData, location.pathname]);

  if (isLoading) return <Loading />

  switch (location.pathname) {
    case '/search':
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:p-10'>
          {results?.map(({link, title, description}, index) => {
            return (<div key={index} className="md:w-2/5 w-full">

              <a href={link} target='_blank' rel='noreferrer'>
                <p className=''>
                  {link.length > 50 ? link.substring(0, 30) : link}
                  
                </p>
                <p className=' hover:underline dark:text-blue-300 text-blue-700'>
                  {title}
                  {console.log(title)}
                </p>
                <p className=' dark:text-gray-300 text-gray-800'>
                  {description}
                </p>
              </a>
              <br></br>
            </div>
            )
          })}
        </div>
      );
    case '/image':
      return (
        <div className='flex flex-wrap justify-center items-center'>
          {results?.map(({ image, link: { href, title } }, index) => {
            return (<a className="sm:p-3 p-5" href={href} key={index} target="_blank" rel='noreferrer'>
              <img src={image?.src} alt={title} loading="lazy" />
              <p className='w-36 break-words text-sm mt-2'>
                {title}
              </p>
            </a>)
          })}
        </div>
      );
    case '/news':
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:p-10'>
          {results?.map(({ links, id, source, title },index) => {

            return (<div key={index} className="md:w-2/5 w-full">

              <a href={links?.[0].href} target='_blank' rel='noreferrer' className='hover:underline'>

                <p className=' dark:text-blue-300 text-blue-700'>
                  {title}
                </p>
              </a>
                <div className='flex gap-4'>
                  <a href={source?.href} target="_blank" rel='noreferrer'>
                    {source?.href}
                  </a>
                </div>
              <br></br>
            </div>
            )
          })}
        </div>
      );
    case '/videos':
      return (
        <div className='flex flex-wrap justify-center '>
          {results?.map((video, index) => {
            return (
              <div key={index} className="p-2">
                {video?.additional_links?.[0]?.href && <ReactPlayer url={video.additional_links?.[0].href} controls width="355px" height="200px" />}
              </div>

            )
          })}
        </div>
      );

    default:
      return 'Error';
  }
}

export default Results;