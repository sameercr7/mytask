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

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
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
    [updatedCards[dragIndex], updatedCards[dropIndex]] = [
      updatedCards[dropIndex],
      updatedCards[dragIndex],
    ];

    setCards(updatedCards);
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
    </div>
  );
};

export default App;
