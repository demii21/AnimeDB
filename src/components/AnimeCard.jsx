import React from 'react';
import {Link} from 'react-router-dom';


function AnimeCard({anime}) {
	return (		
		<article className="anime-card">
			
				<figure>
					<img 
						src={anime.images.jpg.image_url} 
						alt={anime.title} 
						/>
				</figure>
				<Link to={`/${anime.mal_id}`}>
				<h3>{ anime.title }</h3>
				<p>{(anime.synopsis)?anime.synopsis.slice(0,75):""}</p>
				</Link>
		</article>
	)
}

export default AnimeCard
