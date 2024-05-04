import { Movies } from '@component/Data/Movies';

export default function handler(req, res) {
  const { MovieId } = req.query;

  if (req.method === "GET") {
    const movie = Movies.find((movie) => movie.id.toString() === MovieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.status(200).json(movie);
    
  } else if (req.method === "DELETE") {
    const index = Movies.findIndex((movie) => movie.id.toString() === MovieId);
    if (index === -1) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    Movies.splice(index, 1);
    return res.status(200).json(Movies);

  } else if (req.method === "PUT") {
    const index = Movies.findIndex((movie) => movie.id.toString() === MovieId);
    if (index === -1) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    const updatedMovie = { ...Movies[index], ...req.body };
    Movies[index] = updatedMovie;
    return res.status(200).json(updatedMovie);
  }

  res.status(405).end(`Method ${req.method} Not Allowed`);
}