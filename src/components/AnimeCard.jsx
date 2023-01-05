import React from 'react';
import {Link} from 'react-router-dom';


function AnimeCard({anime}) {
	return (		
		<article className="anime-card">
			<Link to={`/${anime.mal_id}`}>
				<figure>
					<img 
						src={anime.images.jpg.image_url} 
						alt={anime.title} 
						/>
				</figure>
				<h3>{ anime.title }</h3>
				<p>{(anime.synopsis)?anime.synopsis.slice(0,75):""}</p>
				</Link>
		</article>
	)
}

export default AnimeCard
