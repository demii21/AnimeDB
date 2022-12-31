import React from 'react'
import {Link} from 'react-router-dom'

const Sidebar = ({topAnime}) => {
  return (
   <aside>
        <nav>
            <h3>Top Anime</h3>
            {topAnime.map(anime => 
                <Link to={`/${anime.mal_id}`} key={anime.mal_id} >
                    {anime.title}
                </Link>
            )}
        </nav>
   </aside>
  )
}

export default Sidebar