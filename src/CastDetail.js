import React, {useEffect, useState}from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import KnownFor from './KnownFor';


const CastDetail = () => {
    const base_Url = "https://image.tmdb.org/t/p/original";
    const cast_id=useParams();
    console.log(cast_id);
    const[detail, setDetail]=useState([]);
    useEffect(() => {
        try {
          async function fetchDetail() {
            const res = await axios.get(
              `https://api.themoviedb.org/3/person/${cast_id.id}?api_key=1c927881679f3fd5041463f9c0d6d282&language=en-US`);
                setDetail(res.data)
                console.log(res.data);
              };
          fetchDetail();
        } catch (error) {
          console.log(error);
        }
      }, []);
      
  return (
    <div className='cast-details'>
        <div className="container">
        <div className="row">
            <div className="col-md-4">
                <img className='main-cast-img' src={`${base_Url}${detail.profile_path}`} alt="" />
            </div>
            <div className="col-md-8">
                <h4 className='mb-4'>{detail.name}</h4>
                <h5>Biagraphy</h5>
                <p>{detail.biography}</p>

                <h5 className='mt-4'>Known For</h5>
                    <KnownFor cast_id={cast_id}/>
            </div>
        </div>

        </div>
       
    </div>
  )
}

export default CastDetail
