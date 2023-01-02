import React from 'react'
import { useState, useEffect } from 'react'
import AnimeCard from './AnimeCard';



const Watched = () => {
  const [anime, setAnime] = useState([]);

  const load = () => {
    let store = JSON.parse(localStorage.getItem("WatchedAnime") || '[]');
    setAnime(store);
  }
  useEffect(() => {
    load();

  }, [])


  return (
    <>
   
    <main>
       <h1 style={{textAlign:'center'}}>Watched Anime List</h1> <br />
      <div className="anime-list">
        {anime.map(anime => (
          <AnimeCard
            anime={anime.data}
            key={anime.mal_id} />
        ))}
      </div>
    </main>
     
    </>
  )
}

export default Watched