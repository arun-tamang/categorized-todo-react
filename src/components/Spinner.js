import React from 'react';
import Spinner from 'react-spinkit';
// export default ({ color = '#26A65B', size = '16px', margin = '4px' }) => (
//   <RingLoader color={color} size={size} margin={margin} />
// );

export default () => (
  <div style={{ textAlign: 'center', paddingLeft: '50%', paddingTop: '20%' }}>
    <Spinner name="pacman" color="#d14a8e" fadeIn="quarter" />;
  </div>
);
