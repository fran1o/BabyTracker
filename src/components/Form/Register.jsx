import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { fetchCities, fetchDepartments, loginUser, registerUser } from '../../slices/userSlice';

const Register = () => {
	const dispatch = useDispatch();
	const { loading, error, departments, cities } = useSelector((state) => state.user);

	const [userData, setUserData] = useState({
		usuario: '',
		password: '',
		idDepartamento: '',
		idCiudad: '',
	});

	const [user, setUser] = useLocalStorage('user', null);

	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchDepartments());
	}, [dispatch]);

	useEffect(() => {
		if (userData.idDepartamento) {
			dispatch(fetchCities(userData.idDepartamento));
		}
	}, [dispatch, userData.idDepartamento]);

	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await dispatch(registerUser(userData));
		if (result.meta.requestStatus === 'fulfilled') {
			setModalMessage('Usuario registrado correctamente');
			setShowModal(true);
			await dispatch(
				loginUser({
					usuario: userData.usuario,
					password: userData.password,
				})
			);
			setUser(result.payload);
		}
	};

	const handleCloseModal = () => {
		setShowModal(false);
		navigate('/');
	};

	return (
		<Container className='d-flex justify-content-center align-items-center min-vh-100'>
			<Row className='w-100'>
				<Col xs={12} md={8} lg={6} className='mx-auto'>
					<h4 className='text-center mb-4'>Registro</h4>
					{error && <p className='text-danger'>{error}</p>}
					<Form onSubmit={handleSubmit}>
						<Form.Group className='mb-3' controlId='formUsuario'>
							<Form.Label>Nombre de Usuario</Form.Label>
							<Form.Control type='text' name='usuario' value={userData.usuario} onChange={handleChange} required />
						</Form.Group>
						<Form.Group className='mb-3' controlId='formPassword'>
							<Form.Label>Contraseña</Form.Label>
							<Form.Control type='password' name='password' value={userData.password} onChange={handleChange} required />
						</Form.Group>
						<Form.Group className='mb-3' controlId='formDepartamento'>
							<Form.Label>Departamento</Form.Label>
							<Form.Control as='select' name='idDepartamento' value={userData.idDepartamento} onChange={handleChange} required>
								<option value=''>Seleccione un departamento</option>
								{departments.map((departamento) => (
									<option key={departamento.id} value={departamento.id}>
										{departamento.nombre}
									</option>
								))}
							</Form.Control>
						</Form.Group>
						<Form.Group className='mb-3' controlId='formCiudad'>
							<Form.Label>Ciudad</Form.Label>
							<Form.Control as='select' name='idCiudad' value={userData.idCiudad} onChange={handleChange} required>
								<option value=''>Seleccione una ciudad</option>
								{cities.map((ciudad) => (
									<option key={ciudad.id} value={ciudad.id}>
										{ciudad.nombre}
									</option>
								))}
							</Form.Control>
						</Form.Group>
						<div className='text-center mt-4'>
							<Button variant='secondary' type='submit' disabled={loading || !userData.usuario || !userData.password || !userData.idDepartamento || !userData.idCiudad}>
								Registrar
							</Button>
						</div>
					</Form>
					<div className='text-center mt-4'>
						<p>¿Ya tienes una cuenta?</p>
						<Button variant='link' onClick={() => navigate('/login')} className='text-dark text-decoration-none'>
							Iniciar sesión
						</Button>
					</div>
				</Col>
			</Row>
			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>Registro</Modal.Title>
				</Modal.Header>
				<Modal.Body>{modalMessage}</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleCloseModal}>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default Register;
