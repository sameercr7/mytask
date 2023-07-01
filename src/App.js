import React, { useState, useEffect } from 'react';
import DraggableCard from './DraggableCard';
import DroppableContainer from './DroppableContainer';
import Spinner from './Spinner';

const App = () => {
  const gifUrls = [
    'https://media.tenor.com/OeswMjtpFdQAAAAd/cat.gif',
    'https://media.tenor.com/fTTVgygGDh8AAAAC/kitty-cat-sandwich.gif',
    'https://media.tenor.com/wL59aqQiwzAAAAAd/cat-kitty.gif',
    'https://media.tenor.com/U3ctZ-oyAZEAAAAC/cat.gif',
    'https://media.tenor.com/aVC6ggUOKGIAAAAC/lets-chat-cats.gif',
  ];

  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);

    fetch('http://localhost:3001/data')
      .then((response) => response.json())
      .then((responseData) => {
        const updatedCards = responseData.data.map((card, index) => ({
          id: `card${index + 1}`,
          text: card.title,
          color: card.color,
          gifUrl: gifUrls[index],
        }));
        setCards(updatedCards);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

  const handleDrop = (dragIndex, dropIndex) => {
    if (dragIndex === dropIndex) return;

    const updatedCards = [...cards];
    const draggedCard = updatedCards[dragIndex];

    // Check if positions are different
    if (dragIndex < dropIndex) {
      for (let i = dragIndex; i < dropIndex; i++) {
        updatedCards[i] = updatedCards[i + 1];
      }
    } else {
      for (let i = dragIndex; i > dropIndex; i--) {
        updatedCards[i] = updatedCards[i - 1];
      }
    }

    updatedCards[dropIndex] = draggedCard;
    setCards(updatedCards);

    // Update timer
    setTimer(Date.now());
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <DroppableContainer>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {isLoading ? (
            <Spinner />
          ) : (
            cards.slice(0, 3).map((card, index) => (
              <DraggableCard
                key={card.id}
                id={card.id}
                text={card.text}
                color={card.color}
                gifUrl={card.gifUrl}
                index={index}
                onDrop={handleDrop}
              />
            ))
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {isLoading ? (
            <Spinner />
          ) : (
            cards.slice(3).map((card, index) => (
              <DraggableCard
                key={card.id}
                id={card.id}
                text={card.text}
                color={card.color}
                gifUrl={card.gifUrl}
                index={index + 3}
                onDrop={handleDrop}
              />
            ))
          )}
        </div>
      </DroppableContainer>

      <div style={{ position: 'fixed', bottom: 10, left: 0, width: '100%', textAlign: 'center' }}>
        {timer !== 0 && <p>Last position change: {new Date(timer).toLocaleTimeString()}</p>}
      </div>
    </div>
  );
};

export default App;
