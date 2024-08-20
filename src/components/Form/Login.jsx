import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { loginUser } from '../../slices/userSlice';

const Login = () => {
  const [loginData, setLoginData] = useState({
    usuario: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(true);

  const [user, setUser] = useLocalStorage("user", null);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

	const handleCheckboxChange = (e) => {
		setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(loginData));
    if (result.meta.requestStatus === "fulfilled") {
			if (rememberMe) {
				setUser(result.payload);
			}
      navigate("/");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <h4 className="text-center mb-4">Login</h4>
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsuario">
              <Form.Control
                type="text"
                name="usuario"
                value={loginData.usuario}
                onChange={handleChange}
                placeholder="Usuario"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center text-center">
              <Form.Check
                className="form-check-input form-switch border-0"
                type="checkbox"
                id="rememberMe"
                label="Recordar sesión?"
                checked={rememberMe}
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="text-center">
              <Button variant="secondary" type="submit" disabled={loading || !loginData.usuario || !loginData.password}>
                Login
              </Button>
            </div>
          </Form>
          <div className="text-center mt-4">
            <p>¿No tienes una cuenta?</p>
            <Button variant="link" onClick={() => navigate("/register")} className="text-dark text-decoration-none">
              Regístrate
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
