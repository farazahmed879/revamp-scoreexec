import React from 'react';
import '../utils/logo.css'; 

export default function Logo() {
  return (
    <div className="logo-container">
      <img src="https://i.pinimg.com/originals/39/66/dc/3966dc8db92abaca02d06bec5758c810.jpg" alt="logo"
       className="logo-image" />
      <span className="logo-name">ScoreXEC</span>
    </div>
  );
}
