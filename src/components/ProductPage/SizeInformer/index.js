import React from 'react';


const SizeInformer = ({ className, h, w }) => {
  return (
    <div className={className}>
      Размер букета: <div>{h} см / {w} см</div>
    </div>
  );
};

export default SizeInformer;