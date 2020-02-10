import React from 'react';


const SizeInformer = ({ className, circle }) => {
  return (
    <div className={className}>
      Размер букета: <div>{circle} см в окружности</div>
    </div>
  );
};

export default SizeInformer;