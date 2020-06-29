import React from 'react';
import axios from 'axios';
import { Formik, Form as FormFormik } from 'formik';
import * as yup from 'yup';
import * as Config from '../../services/config';

import FormGroup1 from '../../components/contents/utils-components/FormGroup1';
import LoadingTable from '../../components/contents/utils-components/LoadingTable';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default class MysqlUser2 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: false,
			showModal: false,
			errorMsg: "",
			dataUser: [],

			formCreate: {
				name: "",
				email: "",
				role: "",
			},

			formUpdate: {
				userId: "",
				name: "",
				email: "",
				role: "",
			},
		}

		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);

		this.handleCreate = this.handleCreate.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		this.setState({ isLoading: true });
		this.handleLoadDataUser();
	}

	showModal(userId) {
		this.handleCurrentDataUser(userId);
		this.setState({ showModal: true });
	}

	closeModal() {
		this.setState({ showModal: false });
	}

	handleDataUser() {
		axios.get(`${Config.BACKEND_HOST}/mysql/user/all`, {
			headers: {
				'Content-type': 'application/json'
			}
		}).then(result => {
			if (result.status === 200) {
				this.setState({ dataUser: result.data, isLoading: false });
			}
		}).catch(e => {
			this.setState({ errorMsg: e.toString(), isLoading: false });
		});
	}

	handleCurrentDataUser(userId) {
		axios.get(`${Config.BACKEND_HOST}/mysql/user/${userId}`, {
			headers: {
				'Content-type': 'application/json'
			}
		}).then(result => {
			if (result.status === 200) {
				this.setState({ 
					formUpdate: {
						userId: result.data.userId,
						name: result.data.name,
						email: result.data.email,
						role: result.data.role,
					}
				});
			}
		}).catch(e => {
			console.log(e);
		});
	}

	handleCreate() {
    	const {name,email,role} = this.state.formCreate;
        const data = {
            name,
            email,
            role,
        }

        axios.post(`${Config.BACKEND_HOST}/mysql/user`, data, {
			headers: {
				'Content-type': 'application/json'
			}
		}).then(result => {
			if (result.status === 201) {
				this.setState({ 
					formCreate: { 
						name: '', 
						email: '', 
						role: '' 
					} 
				});
				this.handleLoadDataUser();
			}
		}).catch(e => {
			console.log(e);
		});
    }

    handleUpdate() {
        const {userId,name,email,role} = this.state.formUpdate;
        const data = {
            name,
            email,
            role,
        }

        axios.put(`${Config.BACKEND_HOST}/mysql/user/${userId}`, data, {
			headers: {
				'Content-type': 'application/json'
			}
		}).then(result => {
			this.setState({ 
				formUpdate: {
					userId: '',
					name: '',
					email: '',
					role: '',
				}
			});
			this.closeModal();
			this.handleLoadDataUser();
		}).catch(e => {
			console.log(e);
		});
	}

	handleDelete(userId) {
		axios.delete(`${Config.BACKEND_HOST}/mysql/user/${userId}`, {
			headers: {
				'Content-type': 'application/json'
			}
		}).then(result => {
			this.handleLoadDataUser();
		}).catch(e => {
			console.log(e);
		});
	}

	handleLoadDataUser() {
		this.handleDataUser();
	}

	render() {
		const yupSchema = yup.object({
			name: yup.string().required("Wajib diisi"),
			email: yup.string().email("Email harus valid").required("Wajib diisi"),
			role: yup.string().required("Wajib diisi"),
		});

		return (
			<React.Fragment>
				<Row className="flex-lg-row-reverse">
					<Col lg={4}>
						<Card className="mb-3">
							<Card.Header className="font-weight-bold">CREATE USER</Card.Header>
							<Card.Body>
								<Formik
									enableReinitialize
									validationSchema={yupSchema}
									initialValues={this.state.formCreate}
									onSubmit={async (values, { setSubmitting }) => {
										console.log(values);
										await this.setState({ formCreate: values });
										this.handleCreate();
										setSubmitting(false);
									}}
								>
									<FormFormik>
										<FormGroup1 
											name="name" 
											ph="Name" 
										/>
										<FormGroup1 
											type="email" 
											name="email" 
											ph="Email" 
										/>
										<FormGroup1.Select name="role">
											<option value="" hidden>Choose Role</option>
											<option value="Admin">Admin</option>
											<option value="Maintainer">Maintainer</option>
										</FormGroup1.Select>
										
										<Row className="mt-3">
											<Col className="pr-2">
												<Button variant="outline-danger" type="reset" block>
													Reset
												</Button>	
											</Col>
											<Col className="pl-2">
												<Button variant="primary" type="submit" block>
													Create
												</Button>	
											</Col>
										</Row>
									</FormFormik>
								</Formik>
							</Card.Body>
						</Card>
					</Col>
					<Col lg={8} className="pr-lg-0">
						<Card className="mb-3">
							<Card.Header className="font-weight-bold">DATA USER</Card.Header>
							<Card.Body>
								<Table responsive>
									<thead>
										<tr>
											<th>#</th>
											<th>Name</th>
											<th>Email</th>
											<th>Role</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{	this.state.isLoading && <tr><td colSpan="5"><LoadingTable /></td></tr>	}
										{
											this.state.isLoading === false && 
											this.state.dataUser.length > 0 ? (
												this.state.dataUser.map((item,index) => (
													<tr key={index}>
														<td>{index+1}</td>
														<td className="text-left">{item.name}</td>
														<td className="text-left">{item.email}</td>
														<td>{item.role}</td>
														<td>
															<Button variant="warning" type="button" onClick={() => this.showModal(item.userId)}>
																Edit
															</Button>
															{" "}
															<Button variant="danger" type="button" onClick={() => this.handleDelete(item.userId)}>
																Delete
															</Button>
														</td>
													</tr>
												))
											) : this.state.isLoading === false && (
											<tr>
												<td colSpan="5" className="text-center">{this.state.errorMsg !== "" ? this.state.errorMsg : "Data Kosong"}</td>
											</tr>
											)
										}
									</tbody>
								</Table>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<Modal show={this.state.showModal} onHide={this.closeModal}>
					<Formik
						enableReinitialize
						validationSchema={yupSchema}
						initialValues={this.state.formUpdate}
						onSubmit={async (values, { setSubmitting }) => {
							console.log(values);
							await this.setState({ formUpdate: values });
							this.handleUpdate();
							setSubmitting(false);
						}}
					>
						<FormFormik>
							<Modal.Header closeButton>
								<Modal.Title>Update User</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<FormGroup1 
									name="userId" 
									ph="User ID" 
									readOnly
								/>
								<FormGroup1 
									name="name" 
									ph="Name" 
								/>
								<FormGroup1 
									type="email" 
									name="email" 
									ph="Email" 
								/>
								<FormGroup1.Select name="role">
									<option value="" hidden>Choose Role</option>
									<option value="Admin">Admin</option>
									<option value="Maintainer">Maintainer</option>
								</FormGroup1.Select>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={this.closeModal}>
									Close
								</Button>
								<Button type="submit" variant="primary">
									Save Changes
								</Button>
							</Modal.Footer>
						</FormFormik>
					</Formik>
				</Modal>
			</React.Fragment>
		);
	}
}
