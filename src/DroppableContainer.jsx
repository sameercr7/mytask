import React from 'react';
import { useDrop } from 'react-dnd';

const DroppableContainer = ({ children }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => {
      
      console.log('Item dropped:', item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} style={{ backgroundColor: isOver ? 'lightgray' : 'white', padding: '10px' }}>
      {children}
    </div>
  );
};

export default DroppableContainer;
