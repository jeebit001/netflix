import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Carousel from 'better-react-carousel';
import { Link } from 'react-router-dom';


const KnownFor = ({cast_id}) => {
    const base_Url = "https://image.tmdb.org/t/p/original";

    const[credits, setCredits]=useState([]);
    useEffect(()=>{
        try {
            async function fetchCredit(){
                const res=await axios.get(`https://api.themoviedb.org/3/person/${cast_id.id}/movie_credits?api_key=1c927881679f3fd5041463f9c0d6d282&language=en-US`)
                setCredits(res.data)
                console.log(res.data);
            }
            fetchCredit();
        }
        catch (error){
            console.log(error);
        }
       
    },[])
  return (
    <div className='knowm'>
         <Carousel cols={4} rows={1} gap={10} loop autoPlay="true">
        {
        credits.cast && credits.cast.map((credit)=>(
        <Carousel.Item key={credit.id}>
            <div className="cast-list">
                <Link to={`/movie/${credit.id}`}>

                <img className='cast-img' src={`${base_Url}${credit.poster_path}`||`${base_Url}${credit.backdrop_path}`} alt="" />
                </Link>
                <div className="cast-detail">
                <h5 className='mb-0 cast-name'>{credit?.title}</h5>
                <p>{credit?.character}</p>
                </div>
            </div>
      </Carousel.Item>
            ))
        }
    </Carousel>

      
    </div>
  )
}

export default KnownFor
