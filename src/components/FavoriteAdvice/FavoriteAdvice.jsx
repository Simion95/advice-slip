import React from 'react';
import './FavoriteAdvice.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const FavoriteAdvice = (props) => {

  return (
<div className='fav-advice-container' key={props.advice.id}>
  <p className='fav-advice-id'> #{props.advice.id} </p>
  <p> {props.advice.content} </p>
  <p className='fav-advice-date'>{props.advice.dateAdded.toLocaleString()}</p>
  <button className='fav-advice-delete-button' onClick={() => props.onDelete(props.advice.id)}><DeleteForeverIcon /></button>

</div>

  );
};

export default FavoriteAdvice;
