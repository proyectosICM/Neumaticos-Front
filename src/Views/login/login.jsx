import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "./useAuth";
import { LogoutToken } from "../../hooks/logoutToken";
import "./login.css";

// Login component using React Hook Form for form validation and custom useAuth hook for authentication logic
export function Login() {
  // Initialize form handling with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // Custom hook to manage login logic
  const { login, isLoading, error } = useAuth();

  // Handle form submission
  const onSubmit = (data) => {
    login(data.username, data.password);
  };


  const navigate = useNavigate();
  // Retrieve token from local storage to check user's authentication status
  const token = localStorage.getItem("token");

  // Redirect user if already logged in
  useEffect(() => {
    if (token) {
      navigate("/menu");
    }
  }, [navigate, token]);

  // Check token's validity and logout if it's invalid or expired
  LogoutToken();

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Iniciar sesión</h1>
        <h1>
          <FaUserCircle />
        </h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Username input field */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="text" placeholder="Ingresa el usuario" {...register("username", { required: true })} />
            {errors.username && <span>Este campo es obligatorio</span>}
          </Form.Group>

          {/* Password input field */}
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Ingresa la contraseña" {...register("password", { required: true })} />
            {/* Display error message if password field is empty */}
            {errors.password && <span>Este campo es obligatorio</span>}
          </Form.Group>

          {/* Submit button */}
          <Button variant="primary" type="submit" disabled={isLoading}>
            Iniciar sesión
          </Button>
          {/* Display error message if login fails */}
          {error && <div>{error}</div>}
        </Form>
      </div>
    </div>
  );
}
