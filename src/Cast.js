import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from 'better-react-carousel';



const Cast = ({movie_id}) => {
    const base_Url = "https://image.tmdb.org/t/p/original";
    const[cast, setCast]=useState([]);
    useEffect(() => {
        try {
          async function fetchCast() {
            const res = await axios.get(
              `https://api.themoviedb.org/3/${movie_id.pathname}/credits?api_key=1c927881679f3fd5041463f9c0d6d282&language=en-US`
              );
            setCast(res.data);
            console.log(res.data);
          }
          fetchCast();
        } catch (error) {
          console.log(error);
        }
      },[]);
  return (
    <div className='cast mt-5'>
    <Carousel cols={7} rows={1} gap={10} loop>
        {
        cast.cast && cast.cast.map((cas)=>(
        <Carousel.Item key={cas.id}>
            <div className="cast-list">
                <Link to={`/castDetail/${cas.id}`}>
                <img className='cast-img' src={`${base_Url}${cas.profile_path}`} alt="" />
                </Link>
                <div className="cast-detail">
                <h5 className='mb-0 cast-name'>{cas?.name}</h5>
                <p>{cas?.character}</p>
                </div>
            </div>
      </Carousel.Item>
            ))
        }
    </Carousel>
    </div>
  )
}

export default Cast
