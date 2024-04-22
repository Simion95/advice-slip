import './FavoriteAdvicesModal.css';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FavoriteAdvice from '../FavoriteAdvice/FavoriteAdvice';

const FavoriteAdvicesModal = props => {

  return (
    // HTML + JS = JSX
    <>
      <div onClick={props.setIsOpen} className="overlay"></div>
      <div className="favorite-advices-container">
        <div className="favorite-advices-title">
          <h2> My Favorite Advices </h2>
          <AutoAwesomeIcon />
        </div>
        <div className="favorite-advices-container">
          {/* mai jos generam un div pentru fiecare advice... */}
          {props.advices.map(advice => (
        <FavoriteAdvice key={advice.id} advice={advice}  onDelete={props.onDeleteAdvice} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoriteAdvicesModal;
