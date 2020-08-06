import React from 'react';

import './styles.css';

function Loader() {
  return (
    <div id="loader">
      <div className="loader-content">
        <div className="loader-spin"></div>
      </div>
    </div>
  );
}

export default Loader;