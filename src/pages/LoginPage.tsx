import React from 'react'

const LoginPage = () => {
  return (
<div className="main">
  <h3>Enter your login credentials</h3>
  <form action="">
    <label htmlFor="first">Username:</label>
    <input
      type="text"
      id="first"
      name="first"
      placeholder="Enter your Username"
     
    /> <br />
    <label htmlFor="password">Password:</label>
    <input
      type="password"
      id="password"
      name="password"
      placeholder="Enter your Password"
     
    />
    <div className="wrap">
      <button type="submit">Login</button>
    </div>
  </form>
  <p>
    Not registered?
    <a href="#" style={{ textDecoration: "none" }}>
      Create an account
    </a>
  </p>
</div>

  )
}

export default LoginPage
