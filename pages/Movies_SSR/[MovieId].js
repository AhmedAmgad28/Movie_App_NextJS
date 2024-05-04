import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {useSession} from "next-auth/react"

const MovieId = () => {
    const [movieData, setMovieData] = useState(null);
    const router = useRouter();
    const {MovieId} = router.query;
    const {data:session}=useSession()

    useEffect(() => {
        axios
          .get(`http://localhost:3000/api/Movies/${MovieId}`)
          .then((response) => {
            const desiredMovie = response.data;
    
            if (desiredMovie) {
              setMovieData(desiredMovie);
            } else {
              console.log('Movie not found.');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }, [MovieId]);
    
      if (!movieData) {
        return <div>Loading...</div>;
      }
    
      const { title, poster_path, overview, release_date, vote_average } = movieData;

      const handleUpdateClick = () => {
        router.push(`/Movies_SSR/UpdateMovie/${MovieId}`);
      };
    
      const handleDeleteClick = () => {
        const userConfirmation = window.confirm('Are you sure you want to delete this movie?');
    
        if (userConfirmation) {
          axios
            .delete(`http://localhost:3000/api/Movies/${MovieId}`)
            .then((response) => {
              console.log('Movie deleted successfully.');
              router.push('/Home');
            })
            .catch((error) => {
              console.error(error);
            });
        }
      };

      if (session){
        return (
          <div id="MainContainerDetails" style={{ background: '#f1f1f1', padding: '20px' }}>
        <div
          id="MovieDetails"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px',
            background: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <img
            src={`${poster_path}`}
            alt="movie1"
            style={{ width: '270px', marginRight: '20px' }}
          />
          <div className="Details">
            <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>{title}</h1>
            <p style={{ fontSize: '16px', marginBottom: '20px' }}>{overview}</p>
            <div className="SmallDetails">
              <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Release Date: {release_date}</h2>
              <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Rating: {vote_average}</h2>
            </div>
          </div>
        </div>
        <br></br>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
        <Button variant="warning" type="submit" style={{marginRight: '10px'}} onClick={handleUpdateClick}>
          Update
        </Button>
        <Button variant="danger" type="submit" onClick={handleDeleteClick}>
          Delete
        </Button>
        </div>
      </div>
      );
      } else {
        return (
          <div id="MainContainerDetails" style={{ background: '#f1f1f1', padding: '20px' }}>
        <div
          id="MovieDetails"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px',
            background: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <img
            src={`${poster_path}`}
            alt="movie1"
            style={{ width: '270px', marginRight: '20px' }}
          />
          <div className="Details">
            <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>{title}</h1>
            <p style={{ fontSize: '16px', marginBottom: '20px' }}>{overview}</p>
            <div className="SmallDetails">
              <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Release Date: {release_date}</h2>
              <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Rating: {vote_average}</h2>
            </div>
          </div>
        </div>
        <br></br>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
        </div>
      </div>
      );
      }
    
}

export default MovieId;
