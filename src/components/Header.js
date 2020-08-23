import React, { useState } from 'react';

const Header = ({ userList }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const handleSelectChange = (event) => {

  }

  const handleUserLogin = (event) => {

  }

  const handleUserLogout = (event) => {

  }

  return (
    <header>
      <h1>Event Coordinator</h1>
      <form
        className="user-select"
        onSubmit ={ handleSubmit }>
        <select onChange={ handleSelectChange }>{
          userList.map(user => (
            <option key={ user.id } value={ user.id }>
              { user.username }
            </option>
          ))
        }
        </select>
        <button onClick={ handleUserLogin }>LOG IN</button>
        <button onClick={ handleUserLogout }>LOG OUT</button>
      </form>
    </header>
  )
}

export default Header;
