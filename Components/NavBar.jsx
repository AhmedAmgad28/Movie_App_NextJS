import Link from 'next/link';
import React from 'react';
import {useSession} from "next-auth/react"

const NavBar = () => {
  const {data:session}=useSession()
  if (session){
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
<div className="container-fluid">
  <Link className="navbar-brand" href="/Home">Movies Blog</Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link" aria-current="page" href="/Home">Home(CSR)</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/AddMovie">Add Movie</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/Movies_SSR">Movies(SSR)</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/Movies_SSG">Movies(SSG)</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/About">About</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/ContactUs">ContactUs</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/Profile">Profile</Link>
      </li>
    </ul>
    
  </div>
</div>
</nav>

  );
  } else{
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
<div className="container-fluid">
  <Link className="navbar-brand" href="/Home">Movies Blog</Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link" aria-current="page" href="/Home">Home(CSR)</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/Movies_SSR">Movies(SSR)</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/Movies_SSG">Movies(SSG)</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/About">About</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/ContactUs">ContactUs</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/api/auth/signin">Github SignIn</Link>
      </li>
    </ul>
    
  </div>
</div>
</nav>

  );
  }
    
}

export default NavBar;
