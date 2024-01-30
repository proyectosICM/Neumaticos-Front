import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./login.css";
import axios from "axios";
import { base, loginURL } from "../../api/apiurl";
import "bootstrap/dist/css/bootstrap.min.css";
import { LogoutToken } from "../../hooks/logoutToken";

// Creating an instance of axios with base URL and credentials
const axiosInstance = axios.create({
  baseURL: base,
  withCredentials: true,
});

/**
 * Login component for user authentication.
 * It allows users to input their credentials and handles the login process.
 */
export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /**
   * Function to handle the login process.
   * @param {Object} e - The event object.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(loginURL, {
        username,
        password,
      });
      setError("");
      const { token, Username } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("Username", Username);
      navigate("/welcome", { state: { username: Username } });
    } catch (error) {
      setError("Error en la autenticación");
      console.log(error);
    }
  };

  // Checking if a token is present in localStorage
  const token = localStorage.getItem("token");

  // useEffect hook to automatically navigate to the welcome page if a token is present
  useEffect(() => {
    if (token) {
      //navigate("/redirect");
      navigate("/welcome");
    }
  }, [navigate]);

  LogoutToken();

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Iniciar sesión</h1>
        <h1>
          <FaUserCircle />
        </h1>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="text" placeholder="Ingresa el usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Ingresa la contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" className="login-button">
            Iniciar sesión
          </Button>
        </Form>
        {error && <p>{error}</p>}
      </div>

      <div className="login-info">
        <h2>Gestiona y analiza el funcionamiento de tus baterías de camiones</h2>
        <Link to="/contratar">Contratar</Link>
      </div>
    </div>
  );
}
