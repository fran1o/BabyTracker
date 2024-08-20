import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from '../../slices/eventSlice';
import './EventForm.css';

const EventForm = ({ onEventAdded }) => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.user);
	const { error } = useSelector((state) => state.event);
	const { categories } = useSelector((state) => state.categories);
	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState('');

	const [eventData, setEventData] = useState({
		idCategoria: '',
		idUsuario: userInfo?.id || '',
		detalle: '',
		fecha: new Date(),
	});

	const handleChange = (value, name) => {
		setEventData({
			...eventData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await dispatch(addEvent(eventData));
		if (result.meta.requestStatus === 'fulfilled') {
			setModalMessage(result.payload.mensaje);
			setShowModal(true);
			onEventAdded(); //Funcion que recibimos por props desde dashboard
		}
	};

	return (
		<>
			<Form className='form eventForm' onSubmit={handleSubmit}>
				{error && <p className='text-danger mt-3'>Usuario o contraseña incorrecta</p>}
				<h3 className='form-title'>Agregar Evento</h3>
				<Form.Group>
					<Form.Label>Categoría:</Form.Label>
					<Form.Control as='select' name='idCategoria' value={eventData.idCategoria} onChange={(category) => handleChange(category.target.value, 'idCategoria')} required>
						<option value=''>Seleccione una categoría</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.tipo} ({category.id})
							</option>
						))}
					</Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label>Detalle:</Form.Label>
					<Form.Control type='text' name='detalle' value={eventData.detalle} onChange={(detail) => handleChange(detail.target.value, 'detalle')} required />
				</Form.Group>
				<Form.Group>
					<Form.Label className='d-block w-100'>Fecha y Hora:</Form.Label>
					<DatePicker
						className='form-control datepicker w-100'
						selected={eventData.fecha}
						onChange={(date) => handleChange(date, 'fecha')}
						showTimeSelect
						timeFormat='HH:mm'
						timeIntervals={15}
						dateFormat='yyyy-MM-dd HH:mm'
						name='fecha'
						required
					/>
				</Form.Group>
				<Form.Group>
					<Button className='mt-3 mb-3 btn btn-secondary btn-md btn active data-bs-toggle=button aria-pressed=true' type='submit'>
						Agregar Evento
					</Button>
				</Form.Group>
			</Form>

			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Resultado</Modal.Title>
				</Modal.Header>
				<Modal.Body>{modalMessage}</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={() => setShowModal(false)}>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default EventForm;
