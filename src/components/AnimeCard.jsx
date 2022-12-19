import React from 'react'

function AnimeCard({anime}) {
	return (		
		<article className="anime-card">
			<a 
				href={anime.url} 
				target="_blank" 
				rel="noreferrer">
				<figure>
					<img 
						src={anime.images.jpg.image_url} 
						alt={anime.title} 
						/>
				</figure>
				<h3>{ anime.title }</h3>
				<p>{(anime.synopsis)?anime.synopsis.slice(0,75):""}</p>
			</a>
		</article>
	)
}

export default AnimeCard