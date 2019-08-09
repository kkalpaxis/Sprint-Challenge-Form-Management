import React, { useState } from 'react';
import './App.css';
import FormComponent from './Form';

function App() {
  const [users, setUsers] = useState([]);
  const addUser = user => {
    setUsers([...users, user]);
  };
  return (
    <div className="App">
      <h1>Form</h1>
      <FormComponent addUser={addUser} />
      {users.map(user => <div key={user.id}>{JSON.stringify(user)}</div>)}
    </div>
  );
}

export default App;
