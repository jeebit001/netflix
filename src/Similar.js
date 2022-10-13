import axios from 'axios'
import Carousel from 'better-react-carousel'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Similar = ({movie_id,details}) => {
    const base_Url = "https://image.tmdb.org/t/p/original";
    const[similars, setSimilars]=useState([])
    useEffect(()=>{
        try{
            async function fetchSimilar(){
                const response= await axios.get(`https://api.themoviedb.org/3/${movie_id.pathname}/similar?api_key=1c927881679f3fd5041463f9c0d6d282&language=en-US&page=1`);
                    setSimilars(response.data.results)
                    console.log(response.data);
            }
            fetchSimilar();
        }
        catch(error){
        console.log(error);
        }
            
    },[])
  return (
    <div className='similar mt-4 '>
        <h2 className='ms-3'>Similar {`${details?.title?"Movies":"Series"}`}</h2>
        <Carousel cols={7} rows={1} loop>
        {
        similars && similars.map((similar)=>(
            <Carousel.Item key={similar.id}>
              <Link  reloadDocument to={`${similar?.original_title?'/movie/':'/tv/'}`+`${similar.id}`}>
                    <div  className="similar-wrapper">
                        <img src={`${base_Url}${similar?.backdrop_path}`} alt="" />
                        <h4 className='cast-name'>{similar?.original_title||similar?.original_name}</h4>
                    </div>
                </Link>
            </Carousel.Item>
                       
            ))
        }      
        </Carousel>
    </div>
  )
}

export default Similar
