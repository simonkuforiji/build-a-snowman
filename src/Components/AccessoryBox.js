import React from 'react';

const AccessoryBox = props => {
  const { addAccessory, backgroundImage, keyzz } = props;
  return(
    <div
      key={keyzz}
      className="accessory-box"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      onClick={addAccessory}
    />
  )
}

export default AccessoryBox;
