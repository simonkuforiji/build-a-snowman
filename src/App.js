import React, { useState, useRef, useCallback } from 'react';
import Draggable from 'react-draggable';
import { CgCloseO, CgZoomIn, CgZoomOut } from 'react-icons/cg';

import scarf from './assets/images/scarf.svg';
import scarfXmas from './assets/images/scarf-xmas.png';
import snowballImg from './assets/images/snowball3.png';

import './App.css';

// buttons, carrots, jackets, hats...
const allAccessories = {
  scarf: { name: 'scarf', x: 0, y: 0, src: scarf, size: 40 },
  scarfXmas: { name: 'scarfXmas', x: 0, y: 0, src: scarfXmas, size: 40 }
}

const App = () => {
  const [snowman, setSnowman] = useState({
    snowballs: [{ id: 1, size: 100, y: 0 }, { id: 2, size: 80, y: 0 }, { id: 3, size: 60, y: 0 }],
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

  const resizeSnowball = useCallback((id, delta) => {
    setSnowman((prev) => ({
      ...prev,
      snowballs: prev.snowballs.map((ball) =>
        ball.id === id ? { ...ball, size: Math.max(40, ball.size + delta) } : ball
      ),
    }));
  }, []);

  // Resize an accessory
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
      <div className="canvas">
        {snowman.snowballs.map((ball, index, snowmanArr) => {
          snowmanArr[index].y = index > 0 ? snowmanArr[index - 1].y + (0.8 * snowmanArr[index - 1].size) : 0;;
          return (
            <img
              src={snowballImg}
              key={'snowball-' + ball.id}
              alt="snowball"
              style={{
                width: ball.size,
                height: ball.size,
                position: 'absolute',
                bottom: snowmanArr[index].y,
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
          )
        })}

        {snowman.accessories.map((acc, index) => (
          <Draggable
            nodeRef={draggableRefs.current[acc.id]}
            key={'accessory-' + acc.id}
            onStart={() => {}}
            onDrag={(e, data) => handleDrag(acc.id, e, data)}
            onStop={() => {}}
            position={{ x: acc.x, y: acc.y }} // Controlled position
          >
            <div ref={draggableRefs.current[acc.id]} className="acc-single">
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
                }}
                onClick={(e) => handleDisplayAccOptions(e, acc.id)}
                onTouchStart={(e) => handleDisplayAccOptions(e, acc.id)} // For mobile
              />
            </div>
          </Draggable>
        ))}
      </div>
    
      <div className="controls">
        {Object.keys(allAccessories).map((accessory) => (
          <button className="button" onClick={() => addAccessory(allAccessories[accessory].name)}>Add {allAccessories[accessory].name}</button>
        ))}
        {snowman.snowballs.map((snowball) => (
          <button className="button" key={`grow-${snowball.id}`} onClick={() => resizeSnowball(snowball.id, sizefactor)}>Ball {snowball.id} + {sizefactor}</button>
        ))}
        {snowman.snowballs.map((snowball) => (
          <button className="button" key={`shrink-${snowball.id}`} onClick={() => resizeSnowball(snowball.id, (sizefactor * -1))}>Ball {snowball.id} - {sizefactor}</button>
        ))}
      </div>
    </div>
  );
};

export default App;

// eslint-disable-next-line no-lone-blocks
{/* <div
  key={'snowball-' + ball.id}
  style={{
    width: ball.size,
    height: ball.size,
    background: 'white',
    borderRadius: '50%',
    position: 'absolute',
    bottom: snowmanArr[index].y,
    left: '50%',
    transform: 'translateX(-50%)',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)',
  }}
/> */}