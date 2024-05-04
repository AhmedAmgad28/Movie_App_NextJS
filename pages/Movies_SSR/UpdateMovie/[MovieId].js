import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';

const UpdateMovie = () => {
    const router = useRouter();
    const {MovieId} = router.query 
    const [movieData, setMovieData] = useState({});
    const[loading , setLoading]=useState(true)
    useEffect(()=>{
        const securePage=async()=>{
              const session=await getSession()
              if (!session)
                   signIn();
                else setLoading(false)
        }
        securePage()
    },[])

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!poster_path.endsWith('.png') && !poster_path.endsWith('.jpg')) {
        alert('Poster Path must be a link to a PNG or JPG image.');
        return;
      }
      if (movieData.overview.length < 100) {
        alert('Overview must be at least 100 characters.');
        return;
      }
      if (movieData.vote_average > 10 || movieData.vote_average < 0) {
        alert('Vote average must be between 0 and 10.');
        return;
      }
      if (isNaN(Date.parse(movieData.release_date))) {
        alert('Release date must be a valid date.');
        return;
      }

    axios
      .put(`http://localhost:3000/api/Movies/${MovieId}`, movieData)
      .then((response) => {
        console.log('Movie updated successfully.');
        router.push(`/Movies_SSR/${MovieId}`);
      })
      .catch((error) => {
        console.error(error);
        alert('Update failed.');
      });
  };

  if (!movieData) {
    return <div>Loading...</div>;
  }

  const { title, poster_path, overview, release_date, vote_average } = movieData;

    if (loading) return <div>Loading.....</div>
    else return (
    <div className="container" style={{ marginTop: '20px' }}>
    <h1>Update Movie</h1>
    <form onSubmit={handleFormSubmit} className="form-horizontal">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setMovieData({ ...movieData, title: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="poster">Poster URL</label>
        <input
          type="text"
          className="form-control"
          id="poster"
          value={poster_path}
          onChange={(e) => setMovieData({ ...movieData, poster_path: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="overview">Overview</label>
        <textarea
          className="form-control"
          id="overview"
          value={overview}
          onChange={(e) => setMovieData({ ...movieData, overview: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="release-date">Release Date</label>
        <input
          type="date"
          className="form-control"
          id="release-date"
          value={release_date}
          onChange={(e) => setMovieData({ ...movieData, release_date: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="vote-average">Vote Average</label>
        <input
          type="number"
          className="form-control"
          id="vote-average"
          value={vote_average}
          onChange={(e) => setMovieData({ ...movieData, vote_average: e.target.value })}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Update</button>
    </form>
  </div>
  );
};

export default UpdateMovie;
