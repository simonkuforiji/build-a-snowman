import React, { useState, useRef, useCallback } from 'react';
import Draggable from 'react-draggable';
import { CgCloseO, CgZoomIn, CgZoomOut } from 'react-icons/cg';

import { AccessoryBox } from './Components';

// snowball
import snowball1 from './assets/images/snowball-1.png';
import snowball2 from './assets/images/snowball-2.png';
import snowball3 from './assets/images/snowball-3.png';
import snowball4 from './assets/images/snowball-4.png';

// hat
import hat1 from './assets/images/hat-1.png';
import hat2 from './assets/images/hat-2.png';

// scarf
import scarf1 from './assets/images/scarf-1.png';
import scarf2 from './assets/images/scarf-2.png';
// svg
import scarf3 from './assets/images/scarf-3.svg';

// eyes
import eyes1 from './assets/images/eyes-1.png';

// nose
import nose1 from './assets/images/nose-1.png';

// mouth
import mouth1 from './assets/images/mouth-1.png';
import mouth2 from './assets/images/mouth-2.png';

// buttons
import button1 from './assets/images/button-1.png';
import button2 from './assets/images/button-2.png';

// hands
import handsLeft1 from './assets/images/hands-left-1.png';
import handsRight1 from './assets/images/hands-right-1.png';

// background
import background1 from './assets/images/background-1.jpg';

import './App.css';

const allAccessories = {
  snowball1: { src: snowball1, name: 'snowball1', size: 50, x: 0, y: 0 },
  snowball2: { src: snowball2, name: 'snowball2', size: 50, x: 0, y: 0 },
  snowball3: { src: snowball3, name: 'snowball3', size: 50, x: 0, y: 0 },
  snowball4: { src: snowball4, name: 'snowball4', size: 50, x: 0, y: 0 },

  scarf1: {  src: scarf1, name: 'scarf1', size: 40, x: 0, y: 0 },
  scarf2: {  src: scarf2, name: 'scarf2', size: 40, x: 0, y: 0 },
  scarf3: {  src: scarf3, name: 'scarf3', size: 40, x: 0, y: 0 },

  hat1: {  src: hat1, name: 'hat1', size: 40, x: 0, y: 0 },
  hat2: {  src: hat2, name: 'hat2', size: 40, x: 0, y: 0 },

  nose1: {  src: nose1, name: 'nose1', size: 40, x: 0, y: 0 },

  eyes1: {  src: eyes1, name: 'eyes1', size: 40, x: 0, y: 0 },

  handsLeft1: {  src: handsLeft1, name: 'handsLeft1', size: 40, x: 0, y: 0 },
  handsRight1: {  src: handsRight1, name: 'handsRight1', size: 40, x: 0, y: 0 },

  button1: {  src: button1, name: 'button1', size: 40, x: 0, y: 0 },
  button2: {  src: button2, name: 'button2', size: 40, x: 0, y: 0 },

  mouth1: {  src: mouth1, name: 'mouth1', size: 40, x: 0, y: 0 },
  mouth2: {  src: mouth2, name: 'mouth2', size: 40, x: 0, y: 0 },
}

const App = () => {
  const [snowman, setSnowman] = useState({
    accessories: [],
  });
  // eslint-disable-next-line no-unused-vars
  const [sizefactor, setSizeFactor] = useState(10);
  const [activeAcc, setActiveAcc] = useState(null);

  // Object to store refs for each accessory
  const draggableRefs = useRef({});

  const addAccessory = useCallback((name) => {
    const newId = Date.now();
    setSnowman((prev) => ({
      ...prev,
      accessories: [...prev.accessories, { ...allAccessories[name], id: newId }],
    }));
    // Initialize ref for the new accessory
    draggableRefs.current[newId] = React.createRef();
  }, []);

  const resizeAccessory = useCallback((e, id, delta) => {
    e.stopPropagation();
    setSnowman((prev) => ({
      ...prev,
      accessories: prev.accessories.map((acc) =>
        acc.id === id ? { ...acc, size: Math.max(5, acc.size + delta) } : acc
      ),
    }));
  }, []);

  // Delete accessory
  const deleteAccessory = useCallback((e, id) => {
    e.stopPropagation();
    setSnowman((prev) => ({
      ...prev,
      accessories: prev.accessories.filter((acc) => acc.id !== id)
    }));
  }, []);

  const handleDisplayAccOptions = useCallback((e, id) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    };
    if (e && typeof e.stopPropagation === "function") {
        e.stopPropagation();
    };
    setActiveAcc(id === activeAcc ? null : id);
  }, [activeAcc]);

    // Handle dragging
    const handleDrag = useCallback((id, e, data) => {
      setSnowman((prev) => ({
        ...prev,
        accessories: prev.accessories.map((acc) =>
          acc.id === id ? { ...acc, x: data.x, y: data.y } : acc
        ),
      }));
    }, []);

    // Handle dragging with debouncing
    // const handleDrag = useCallback(
    //   debounce((id, e, data) => {
    //     setSnowman((prev) => ({
    //       ...prev,
    //       accessories: prev.accessories.map((acc) =>
    //         acc.id === id ? { ...acc, x: data.x, y: data.y } : acc
    //       ),
    //     }));
    //   }, 16), // ~60fps
    //   []
    // );
    
    // // Debounce utility (add this outside the component)
    // function debounce(func, wait) {
    //   let timeout;
    //   return (...args) => {
    //     clearTimeout(timeout);
    //     timeout = setTimeout(() => func(...args), wait);
    //   };
    // }

  return (
    <div className="App">
      <h1 className="title">Build Your Snowman</h1>
      <div
        className="canvas"
        style={{
          backgroundImage: `url(${background1})`
        }}
      >
        {snowman.accessories.map((acc) => (
          <Draggable
            nodeRef={draggableRefs.current[acc.id]}
            key={'accessory-' + acc.id}
            onStart={() => {}}
            onDrag={(e, data) => handleDrag(acc.id, e, data)}
            onStop={() => {}}
            position={{ x: acc.x, y: acc.y }} // Controlled position
          >
            <div
              ref={draggableRefs.current[acc.id]}
              className="acc-single"
            >
              <div className={`acc-icon-stack ${activeAcc === acc.id ? '' : 'hide-icon-stack'}`}  >
                <CgZoomIn
                  className="add-icon" 
                  size={15} 
                  style={{ color: '#007bff' }} 
                  onClick={(e) => resizeAccessory(e, acc.id, sizefactor)} 
                  onTouchStart={(e) => resizeAccessory(e, acc.id, sizefactor)} 
                />
                <CgZoomOut
                  className="add-icon" 
                  size={15} 
                  style={ { color: '#007bff' }} 
                  onClick={(e) => resizeAccessory(e, acc.id, (sizefactor * -1))} 
                  onTouchStart={(e) => resizeAccessory(e, acc.id, (sizefactor * -1))}  
                />
                <CgCloseO 
                  className="add-icon" 
                  size={13} 
                  style={{ color: '#007bff' }} 
                  onClick={(e) => deleteAccessory(e, acc.id)} 
                  onTouchStart={(e) => deleteAccessory(e, acc.id)}
                />
              </div>
              <img
                src={acc.src}
                alt={acc.name + '-img'}
                style={{
                  width: acc.size,
                  height: 'min-content'
                }}
                onClick={(e) => handleDisplayAccOptions(e, acc.id)}
                onTouchStart={(e) => handleDisplayAccOptions(e, acc.id)} // For mobile
              />
            </div>
          </Draggable>
        ))}
      </div>
    
      <div className="controls">
        {Object.keys(allAccessories).map((accessory, index) => (
          <AccessoryBox backgroundImage={allAccessories[accessory].src} addAccessory={() => addAccessory(allAccessories[accessory].name)} keyzz={`${allAccessories[accessory].name}-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default App;
