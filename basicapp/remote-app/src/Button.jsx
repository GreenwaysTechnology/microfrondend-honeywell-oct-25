import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} style={{ padding: '10px 14px', fontSize: 16 ,backgroundColor:'aquamarine' }}>
      {children || 'Remote Button'}
    </button>
  );
};

export default Button;
