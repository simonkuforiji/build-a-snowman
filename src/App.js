import React, { useState, useRef, useCallback } from 'react';
import Draggable from 'react-draggable';
import { 
  MdDelete, 
  MdZoomIn, 
  MdZoomOut, 
  MdDragHandle 
} from 'react-icons/md';

import './App.css';

// Existing imports for images
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
// eslint-disable-next-line no-unused-vars
import background1 from './assets/images/background-1.jpg';
import background2 from './assets/images/background-2.jpg';

const allAccessories = {
  snowball1: { src: snowball1, name: 'snowball1', size: 100, x: 10, y: 40 },
  snowball2: { src: snowball2, name: 'snowball2', size: 100, x: 10, y: 40 },
  snowball3: { src: snowball3, name: 'snowball3', size: 100, x: 10, y: 40 },
  snowball4: { src: snowball4, name: 'snowball4', size: 100, x: 10, y: 40 },

  scarf1: {  src: scarf1, name: 'scarf1', size: 100, x: 10, y: 40 },
  scarf2: {  src: scarf2, name: 'scarf2', size: 100, x: 10, y: 40 },
  scarf3: {  src: scarf3, name: 'scarf3', size: 100, x: 10, y: 40 },

  hat1: {  src: hat1, name: 'hat1', size: 100, x: 10, y: 40 },
  hat2: {  src: hat2, name: 'hat2', size: 100, x: 10, y: 40 },

  nose1: {  src: nose1, name: 'nose1', size: 100, x: 10, y: 40 },

  eyes1: {  src: eyes1, name: 'eyes1', size: 100, x: 10, y: 40 },

  handsLeft1: {  src: handsLeft1, name: 'handsLeft1', size: 100, x: 10, y: 40 },
  handsRight1: {  src: handsRight1, name: 'handsRight1', size: 100, x: 10, y: 40 },

  button1: {  src: button1, name: 'button1', size: 100, x: 10, y: 40 },
  button2: {  src: button2, name: 'button2', size: 100, x: 10, y: 40 },

  mouth1: {  src: mouth1, name: 'mouth1', size: 100, x: 10, y: 40 },
  mouth2: {  src: mouth2, name: 'mouth2', size: 100, x: 10, y: 40 },
}

const App = () => {
  const [snowman, setSnowman] = useState({
    accessories: [],
  });
  // eslint-disable-next-line no-unused-vars
  const [sizeFactor, setSizeFactor] = useState(10);
  const [activeAcc, setActiveAcc] = useState(null);
  const draggableRefs = useRef({});

  // Existing methods remain the same
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

  // Delete accessory
  const resetCanvas = useCallback(() => {
    setSnowman((prev) => ({
      ...prev,
      accessories: []
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


  return (
    <div className="snowman-builder">
      <div className="snowman-builder__header">
        <h1>Build A Snowman</h1>
        <div className="snowman-builder__actions">
          <button className="btn btn-reset" onClick={resetCanvas}>Reset Canvas</button>
          <button className="btn btn-save" disabled >Save Design</button>
        </div>
      </div>

      <div 
        className="snowman-canvas"
        style={{ backgroundImage: `url(${background2})` }}
      >
        {snowman.accessories.map((acc) => (
          <Draggable
            key={`accessory-${acc.id}`}
            nodeRef={draggableRefs.current[acc.id]}
            onDrag={(e, data) => handleDrag(acc.id, e, data)}
            position={{ x: acc.x, y: acc.y }}
          >
            <div 
              ref={draggableRefs.current[acc.id]} 
              className={`snowman-accessory ${activeAcc === acc.id ? 'active' : ''}`}
            >
              <div className="accessory-controls">
                <MdDragHandle className="drag-handle" />
                <div className="accessory-actions">
                  <MdZoomIn 
                    onClick={(e) => resizeAccessory(e, acc.id, sizeFactor)}
                    title="Enlarge"
                  />
                  <MdZoomOut 
                    onClick={(e) => resizeAccessory(e, acc.id, -sizeFactor)}
                    title="Shrink"
                  />
                  <MdDelete 
                    onClick={(e) => deleteAccessory(e, acc.id)}
                    title="Remove"
                  />
                </div>
              </div>
              <img
                src={acc.src}
                alt={acc.name}
                style={{
                  width: acc.size,
                  height: 'auto',
                  maxHeight: '200px'
                }}
                onClick={(e) => handleDisplayAccOptions(e, acc.id)}
              />
            </div>
          </Draggable>
        ))}
      </div>
      
      <div className="accessory-selector">
        <h3>Accessories</h3>
        <div className="accessory-grid">
          {Object.keys(allAccessories).map((accessory) => (
            <div 
              key={accessory}
              className="accessory-item"
              onClick={() => addAccessory(allAccessories[accessory].name)}
            >
              <img 
                src={allAccessories[accessory].src} 
                alt={accessory} 
              />
              <span>{accessory}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
