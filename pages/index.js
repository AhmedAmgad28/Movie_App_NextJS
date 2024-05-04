import React, { useState, useEffect } from 'react';
import MovieCard from '@component/Components/MovieCard';

export default function Home() {
  const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchingData(){
            const res = await fetch("/api/Movies");
            const data = await res.json();
            setMovies(data);
        }
        fetchingData();
    }, []);

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {movies.map(movie => (
              <div key={movie.id} style={{ width: '25%', padding: '10px' }}>
              <MovieCard movie={movie} />
              </div>
          ))}
  </div>
  );
}
