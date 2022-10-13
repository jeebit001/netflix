import React, { useEffect, useState } from 'react'
import axios from "./axios"
import requests from './request';
import "./Banner.css"

const Banner = () => {
    const[movies, setMovies]=useState([]);
    

    useEffect(()=>{
        async function fetchData(){
            const request=await axios.get(requests.fetchNetflixOriginals);
            setMovies(request.data.results[Math.floor(Math.random()*request.data.results.length-1)])
        }
        fetchData();
    },[])
  return (
    <header className='banner' style={{backgroundSize:"cover", backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies.backdrop_path}")`,backgroundPosition:"center center"  }}>
        <div className="banner__contents">
                <h1 className='banner__title'>
                    {
                        movies?.title || movies?.name || movies?.original_name
                    }
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h3> { movies.first_air_date } </h3>
                <h1 className='banner__description'> {movies?movies?.overview:"no description"} </h1>
        </div>
    </header>
  )
}

export default Banner
