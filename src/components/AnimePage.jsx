import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Badge } from 'reactstrap';
import { InfinitySpin } from 'react-loader-spinner'
function AnimePage() {
  // Initialize the state with some example data
  let params = useParams();
  let host = "http://localhost:5000"

  const [anime, setAnime] = useState({});
  // const [genres, setGenres] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchAnime = async () => {
    const response = await axios.get(`${host}/api/anime/${params.id}`);
    setAnime(response.data);
    setLoading(false);
    console.log(response.data)
  }

  // const Genres = async () => {
  //   setGenres(anime?.genres)
  // }
  useEffect(() => {
    fetchAnime();
    // Genres();
  }, [])

 
  if (!loading) {
    return (
      <>
        <div className='row anime-page-container' >
          <img src={anime?.images?.jpg?.image_url ?? ''} alt={anime.title} className="anime-page-main-image" />
          <div className='col'>
            <h3>{anime.title}</h3>
            <p className='container'>{anime.synopsis}</p>
              <div>{anime.genres.forEach(element => {
                <Badge color="dark">{element['name']}</Badge>
              })}
                </div>
            
          </div>
          <br />
          <br />
          <h3>
            Details
          </h3>
          <div className='mx-3'>
            
            Duration : {anime.duration}<br />
            Episodes : {anime.episodes}
          </div>
        </div>
      </>
    );
  }
  else {
    return ( 
      <>
      <div className='spinner-center'> 
      <InfinitySpin
          width='200'
          color="#4fa94d"
        />

      </div>
        

      </>
    )

  }
}

export default AnimePage;


