import React, { useState, useCallback } from 'react';

const Content = () => {
  const [isClick, setIsClick] = useState(false);

  const handleButtonClick = useCallback(() => {
    setIsClick(true);
  }, []);

  return (
    <div>
      <h1>Content</h1>
      <button onClick={handleButtonClick}>Display content?</button>
      {isClick && <p>This is the content.</p>}
    </div>
  );
};

export default Content;