import {React,useState,useEffect }from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    width: '200px',
    height: '250px',
    margin: '10px',
    display: 'inline-block',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    cursor: 'move',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  gif: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  overlay: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayImage: {
    maxWidth: '80%',
    maxHeight: '80%',
  },
});

const DraggableCard = ({ id, text, index, onDrop, gifUrl }) => {
  const classes = useStyles();
  const [showOverlay, setShowOverlay] = useState(false);
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => {
      onDrop(item.index, index); 
    },
  });
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.keyCode === 27) {
        setShowOverlay(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const handleCardClick = () => {
    setShowOverlay(true);
  };

  const handleOverlayClose = () => {
    setShowOverlay(false);
  };

  return (
    <>
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div ref={drop}>
        <Card className={classes.card} onClick={handleCardClick}>
          <CardContent>
            <Typography className={classes.title}>{text}</Typography>
            <img src={gifUrl} alt="GIF" className={classes.gif} />
   
          </CardContent>
        </Card>
      </div>
    </div>
    {showOverlay && (
      <div className={classes.overlay} onClick={handleOverlayClose}>
        <img className={classes.overlayImage} src={gifUrl} alt="Overlay" style={{ maxWidth: '80%', maxHeight: '80%' }} />
      </div>
  
    )}
  </>  
  );
};

export default DraggableCard;
