import React from 'react';
import MovieCard from '@component/Components/MovieCard';

//using SSR
const Index = ({movies}) => {
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

export default Index;
export async function getServerSideProps(){
    const res = await fetch("http://localhost:3000/api/Movies");
    const data = await res.json();
    return {props:{movies:data}}
}