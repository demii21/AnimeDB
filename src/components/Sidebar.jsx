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
            <br /><br />
            
        </nav>
        <Link to={`/watched`} ><h3 className="pillBtn">Watched</h3></Link>
        
   </aside>
  )
}

export default Sidebar