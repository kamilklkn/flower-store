import React from 'react';


const SizeInformer = ({ h, w }) => {
  return (
    <div>
      Размер букета:
      <h6>{h} см / {w} см</h6>
    </div>
  );
};

export default SizeInformer;