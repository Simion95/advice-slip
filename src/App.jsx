import './App.css';
import PauseIcon from '@mui/icons-material/Pause';
import CasinoIcon from '@mui/icons-material/Casino';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteAdvicesModal from './components/FavoriteAdvicesModal/FavoriteAdvicesModal';
import { useState} from 'react';

const App = () => {
  const [advice, setAdvice] = useState({
    id: 117,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur repellat esse quibusdam a asperiores quos.',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [favoriteAdvices, setFavoriteAdvices] = useState([]);
  const [isInFavorites, setIsInFavorites] = useState(false);

  const handleGenerateAdvice = async () => {
    setIsLoading(true);

    const serverResponse = await fetch('https://api.adviceslip.com/advice');
    const data = await serverResponse.json();

    setIsLoading(false);

    const newAdvice = {
      id: data.slip.id,
      content: data.slip.advice,
    };

    setAdvice(newAdvice);
    setIsInFavorites(false);
  };

  
  const getAdviceIndex = () => {
    const adviceIndex = favoriteAdvices.findIndex(
      favoriteAdvice => favoriteAdvice.id === advice.id,
    );

    return adviceIndex;
  };

  const handleAddAdviceToFavorites = () => {
    const adviceIndex = getAdviceIndex();
    if (adviceIndex >= 0) {
      // elimina advice
      const newFavoriteAdvices = [...favoriteAdvices];
      
      newFavoriteAdvices.splice(adviceIndex, 1);
      
     
      setFavoriteAdvices(newFavoriteAdvices);
      setIsInFavorites(false);
    } else {
      // adauga advice
      const newFavoriteAdvices = [
        ...favoriteAdvices,
        {
          id: advice.id,
          content: advice.content,
          dateAdded: new Date(),
        },
      ];
      setFavoriteAdvices(newFavoriteAdvices);
      setIsInFavorites(true);
    }
  };

  const handleModalOpening = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  
  const handleDeleteAdvice = (id) => {
    const newFavoriteAdvices = favoriteAdvices.filter(advice => advice.id !== id);

    setFavoriteAdvices(newFavoriteAdvices);
    setIsInFavorites(false);
  };
  return (
    <section className="app-container">
      <button onClick={handleModalOpening} className="show-favorites">
        Show favorites
      </button>
      {isOpen === true ? (
  <FavoriteAdvicesModal
    advices={favoriteAdvices}
    setIsOpen={closeModal}
    onDeleteAdvice={handleDeleteAdvice}
  />
) : null}

      <div className="advice-slip-container">
        <button
          onClick={handleAddAdviceToFavorites}
          className="toggle-favorite-button"
        >
           {isInFavorites ? (
            <FavoriteIcon style={{ color: '#52ffa8' }} />
          ) : (
            <FavoriteBorderIcon style={{ color: '#52ffa8' }} />
          )} 
          </button>
        <p className="advice-id"> ADVICE #{advice.id} </p>
        <p className="advice-content"> "{advice.content}" </p>
        <div className="separator-container">
          <hr />
          <PauseIcon style={{ color: '#cee3e9' }} />
          <hr />
        </div>
        <button
          onClick={handleGenerateAdvice}
          className="advice-button"
          disabled={isLoading === true ? true : false}
        >
          {isLoading === true ? (
            <div className="spinner"></div>
          ) : (
            <CasinoIcon fontSize={'large'} />
          )}
        </button>
      </div>
    </section>
  );
};

export default App;
