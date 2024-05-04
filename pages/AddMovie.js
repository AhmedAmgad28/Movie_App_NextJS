import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';

const AddMoviePage = () => {

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

  const Router = useRouter();
  const [movieData, setMovieData] = useState({
    id: '',
    overview: '',
    poster_path: 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-768x1129.jpg',
    release_date: '',
    title: '',
    vote_average: 0,
  });

  const validateForm = () => {
    const { poster_path, overview, vote_average, release_date, title } = movieData;
    
    if (!poster_path.endsWith('.png') && !poster_path.endsWith('.jpg')) {
      alert('Poster Path must be a link to a PNG or JPG image.');
      return false;
    }
    if (overview.length < 100) {
      alert('Overview must be at least 100 characters.');
      return false;
    }
    if (vote_average > 10 || vote_average < 0) {
      alert('Vote average must be between 0 and 10.');
      return false;
    }
    if (isNaN(Date.parse(release_date))) {
      alert('Release date must be a valid date.');
      return false;
    }
    if (title.trim() === '') {
      alert('Title is required.');
      return false;
    }
    
    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    axios
      .post('/api/Movies', { movie: movieData })
      .then((response) => {
        console.log('Movie added successfully.');
        Router.push('/Home');
      })
      .catch((error) => {
        console.error(error);
        alert('Add failed.');
      });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  if (loading) return <div>Loading.....</div>
  else return (
    <div className="container" style={{ marginTop: '20px' }}>
      <h1>Add Movie</h1>
      <form onSubmit={handleFormSubmit} className="row g-3">
        <div className="col-12">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={movieData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="poster_path" className="form-label">
            Poster Path
          </label>
          <input
            type="text"
            className="form-control"
            id="poster_path"
            name="poster_path"
            value={movieData.poster_path}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="overview" className="form-label">
            Overview
          </label>
          <textarea
            className="form-control"
            id="overview"
            name="overview"
            value={movieData.overview}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="col-6">
          <label htmlFor="release_date" className="form-label">
            Release Date
          </label>
          <input
            type="date"
            className="form-control"
            id="release_date"
            name="release_date"
            value={movieData.release_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-6">
          <label htmlFor="vote_average" className="form-label">
            Vote Average
          </label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            id="vote_average"
            name="vote_average"
            value={movieData.vote_average}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary" style={{ marginBottom: '20px' }}>
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMoviePage;