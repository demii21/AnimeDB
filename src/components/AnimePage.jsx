import React, { useState, useRef } from 'react';


function AnimePage() {
  // Initialize the state with some example data
  const [anime, setAnime] = useState({
    title: 'Naruto',
    image: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg',
    synopsis: 'Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the village\'s leader and strongest ninja.',
    episodesWatched: 12,
    status: 'currently watching'
  });

  // Use a ref to access the value of the dropdown menu
  const statusInput = useRef();

  // Function to update the status of the anime
  const updateStatus = (e) => {
    e.preventDefault();
    setAnime({ ...anime, status: statusInput.current.value });
  }

  return (
    <>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <img src={anime.image} alt="naruto image" />
            </div>
            <div className="col-2">
              <h3>{anime.title}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnimePage;
