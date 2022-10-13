import React, { useState,useEffect } from 'react'
import axios from './axios';
import "./Row.css";
import { Link } from 'react-router-dom';
const base_Url="https://image.tmdb.org/t/p/original";

const Row = ({title, fetchUrl, isLargeRow}) => {
    const [movies, setMovies]=useState([]);
    useEffect(()=>{
        try {
            async function fetchData(){
                const request=await axios.get(fetchUrl);
                setMovies(request.data.results);
                console.log(request.data.results);
            }
            fetchData();
        } catch (error) {
            console.log(error);
        }
    },[fetchUrl]);


  return (
    <div className='row'>
      <h3 className='category__title'>{title}</h3>
      <div className="row__posters">
        {
            movies.map((movie)=>(
              <Link to={`${movie.title?'/movie/':'/tv/'}`+`${movie.id}`}>
                  <img key={movie.id} className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`${base_Url}${movies && isLargeRow?movie?.poster_path:movie?.backdrop_path}`} alt={movie.title} />
            </Link>   
            ))
        }
      </div>
     
    </div>
  )
}

export default Row
