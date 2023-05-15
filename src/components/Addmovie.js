import classes from "./Addmovie.module.css";

import React, { useRef } from "react";

const Addmovie = (props) => {
  const titleRef = useRef();
  const openingTextRef = useRef();
  const releaseDateRef = useRef();

  function submitHandler(e) {
    e.preventDefault();

    const movies = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };
    props.onAddMovie(movies)
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea rows="5" type="text" id="opening-text" ref={openingTextRef}></textarea> 
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input type="text" id="date" ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>
    </form>
  );
};

export default Addmovie;
