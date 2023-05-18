import classes from "./Addmovie.module.css";

import React, { useRef } from "react";

const Addmovie = (props) => {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  async function submitHandler(event) {
    event.preventDefault();

    const movies = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };
    console.log(movies);
    props.onAddMovie(movies);
  }

  
  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="openingText">Opening Text</label>
        <textarea
          rows="5"
          type="text"
          id="openingText"
          name="openingText"
          ref={openingTextRef}
        ></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="releaseDate">Release Date</label>
        <input type="text" id="releaseDate" name="releaseDate" ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>&nbsp;
    </form>
  );
};

export default Addmovie;

//     const title = event.target.elements.title.value
//     const opening = event.target.elements.opening.value
//     const date = event.target.elements.date.value

//     const data = {
//       title,
//       opening,
//       date,
//     }
//     console.log('AddMovie Data',data);
// try {
//   const response = await fetch('https://movie-fetch-f6002-default-rtdb.firebaseio.com/data.json', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });

//     const results = await response.json();
//     console.log('firebase id',results); //getting firebase id
// } catch (error) {
//   console.error('ERROR', error);
// }
