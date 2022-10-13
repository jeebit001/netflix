import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Cast from "./Cast";
import Similar from "./Similar";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";

const MovieDetail = () => {
  const base_Url = "https://image.tmdb.org/t/p/original";

  const movie_id = useLocation();
  const play_id=useParams();
  console.log(play_id);
  const [details, setDetails] = useState([]);
  const[play, setPlay]=useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    try {
      async function fetchDetail() {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${movie_id.pathname}?api_key=1c927881679f3fd5041463f9c0d6d282&language=en-US`
        );
        setDetails(response.data);
        console.log(response.data);
        setTimeout(() => {
          setLoader(true);
        }, 800);
        setLoader(false);
      }
      fetchDetail();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(()=>{
    try{
      async function fetchPlay(){
        const res = await axios.get(
          `https://2embed.org/embed/movie?tmdb=${play_id.id}`,{
            // common:{
            headers:{
              "Access-Control-Allow-Origin": "*"
            // }
          }
          }
        );
        setPlay(res);
      }
      fetchPlay();
    } catch(error){
      console.log(error);
    }

  },[]);

  return (
    <>
      {loader ? (
        <div
          className="movieDetail-top"
          style={{
            backgroundImage: `url("${base_Url}${details?.backdrop_path}")`,
          }}
        >
          <div className="container position-relative">
            <div className="row mt-5">
              <div className="col-md-4">
                <img
                  className="movie-poster"
                  src={`${base_Url}${details?.poster_path}`}
                  alt=""
                />
              </div>
              <div className="col-md-8">
                <h3 className="movie-title">
                  {details?.title || details?.name}{" "}
                </h3>
                <h4 className="tagline"> {details?.tagline}</h4>
                <p className="movie-desc">{details?.overview}</p>
                <div className="created ">
                  {details.created_by &&
                    details.created_by.map((create) => (
                      <Link to={`/castDetail/${create.id}`}>
                        <span className="mb-0 me-2" key={create.id}>
                          {create?.name}
                        </span>
                      </Link>
                    ))}
                </div>
                <h4 className="detail-sub mb-3">Creator</h4>
                <div className="genre">
                  {details.genres &&
                    details.genres.map((genre) => (
                      <span key={genre.id} className="me-2">{genre?.name}</span>
                    ))}
                </div>
                <h4 className="detail-sub mb-3">Genre</h4>
              </div>
            </div>
          </div>
          <Cast movie_id={movie_id} />
          <Similar details={details} movie_id={movie_id} />
        </div>
      ) : (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperClass="blocks-wrapper"
          colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
        />
      )}
    </>
  );
};

export default MovieDetail;
