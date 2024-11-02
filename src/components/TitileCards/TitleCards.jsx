import React, { useEffect, useRef, useState,    } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import {Link}from 'react-router-dom'



const TitleCards = ({title,category}) => {

const [apiData,setApiData]= useState([]);
const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2E3ZGE4NWQxYTVmNjk3NDVkMjZlN2NiYmY0N2U4ZiIsIm5iZiI6MTcyOTkxNjYwMC43OTEzMjMsInN1YiI6IjY3MWE2NjZlNmU0MjEwNzgwZjc4Y2NhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EyBpJCnzp5Xe9HZ2z51XhumXarxZFYXdkotmth9F0RQ'
  }
};

fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));





const handlewheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;

}
useEffect(()=>{


  fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));




cardsRef.current.addEventListener('wheel',handlewheel);

},[])

  return (
    <div className='title-Cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards