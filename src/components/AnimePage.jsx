import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Badge } from 'reactstrap';
import { InfinitySpin } from 'react-loader-spinner'
function AnimePage() {
  // Initialize the state with some example data
  let params = useParams();
  let host = "http://localhost:5000"

  const [watched,setWatched] = useState(false);
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

  
  const handleWantToWatchClick = () =>{
    let store = JSON.parse(localStorage.getItem("WatchedAnime")||'[]');
    store.push({
      mal_id: anime.mal_id,
      data:anime,
    });
    localStorage.setItem("WatchedAnime", JSON.stringify(store));
    setWatched(true);
  }
  const removeWatched = () => {
    let store = JSON.parse(localStorage.getItem("WatchedAnime")||'[]');
    if(watched){
      let index = store.findIndex(a=>a.mal_id === anime.mal_id);
      index !== -1 && store.splice(index,1);
      localStorage.setItem("WatchedAnime",JSON.stringify(store))
    }
    setWatched(false);
  }

  const checkWatched = () =>{
    let store = JSON.parse(localStorage.getItem("WatchedAnime")||'[]');
    store.map((x)=>{
      if(x.mal_id === anime.mal_id){
        setWatched(true);
      }
    })
   
  }

  useEffect(() => {
    fetchAnime();
    checkWatched();
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
          <div className="details-container">
          <h3 >
            Details
          </h3>
            Premiered : {anime.aired.from} <br />
            Status : {anime.status === "Finished Airing"?"Ended" : "Running"} <br />
            Duration : {anime.duration}<br />
            Episodes : {anime.episodes} Episodes in total  
          </div>
          <div>
            {watched ? 
            <button type="button" className="btn btn-danger" style={{marginLeft:'30px',marginTop:'15px'}} onClick={()=>{
              removeWatched()
            }}>Remove</button>:
          <button type="button" className="btn btn-primary" style={{marginLeft:'30px',marginTop:'15px'}} onClick={()=>{
            handleWantToWatchClick()
          }}>Watched</button> 
        }
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


