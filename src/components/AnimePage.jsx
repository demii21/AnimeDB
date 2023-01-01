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
  
  const [loading, setLoading] = useState(true);
  const fetchAnime = async () => {
    if(anime.mal_id!=params.id){
      const response = await axios.get(`${host}/api/anime/${params.id}`);
    setAnime(response.data);
    setLoading(false);
    console.log(response.data)
    }
    
    

  }

  useEffect(() => {
    fetchAnime();
  }, [fetchAnime])

 
  if (!loading) {
    return (
      <>
        <div className='row anime-page-container' >
          <img src={anime?.images?.jpg?.image_url ?? ''} alt={anime.title} className="anime-page-main-image" />
          <div className='col'>
            <h3 >{anime.title}</h3>
            <div className='container'>{anime.synopsis} <br /><br />
              <span className='font-weight-bold'>Tags :</span>{anime.genres.map(element => { return(
               <Badge className="badge rounded-pill bg-info mx-2" key={element["name"]}>{element["name"]}</Badge>)
              })}
            </div>    
            
          </div>
          <br />
          <br />
          <h3 >
            Details
          </h3>
          <div className="details-container">
            Premiered : {anime.aired.from} <br />
            Status : {anime.status === "Finished Airing"?"Ended" : "Running"} <br />
            Duration : {anime.duration}<br />
            Episodes : {anime.episodes} Episodes in total  
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


