import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentView = () => {

  const username = localStorage.getItem('username');

  //localStorage에서 데이터 불러옴 
  return (
    <div>
      <h1>Student Information</h1>
      <p>Welcome, {username}!</p>  
      <p>Your role is: student</p>  
    </div>
  );
};

export default StudentView;
