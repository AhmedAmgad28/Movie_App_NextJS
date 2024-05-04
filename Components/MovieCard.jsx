import { useRouter } from 'next/router';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const MovieCard = ({ movie }) => {
    const Router = useRouter();
    const handleDetailsClick = () => {
        Router.push(`Movies_SSR/${movie.id}`)
      };
  return (
    <Card style={{ width: '18rem', margin: '1rem', height: '100%' }}>
      <Card.Img variant="top" src={movie.poster_path} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text style={{ maxHeight: '9rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {movie.overview}
        </Card.Text>
        <Button variant="primary" onClick={handleDetailsClick}>Details</Button>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;