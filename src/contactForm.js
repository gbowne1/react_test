import React from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { COUNTRIES } from './exports';
import PropTypes from 'prop-types';
import { addContact, editContact, getContacts } from './requests';
import { connect } from 'react-redux';
import { setContacts } from './actionCreators';
const schema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    region: yup.string().required('Region is required'),
    country: yup.string().required('Country is required').default('Afghanistan'),
    postalCode: yup
        .string()
        .when('country', {
            is: 'United States',
            then: yup.string().matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Invalid postal code'),
        })
        .when('country', {
            is: 'Canada',
            then: yup.string().matches(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, 'Invalid postal code'),
        })
        .required(),
    phone: yup
        .string()
        .when('country', {
            is: country => ["United States", "Canada"].includes(country),
            then: yup.string().matches(/^[2-9]\d{2}[2-9]\d{2}\d{4}$/, 'Invalid phone nunber')
        })
        .required(),
    email: yup.string().email('Invalid email').required('Email is required'),
    age: yup.number()
        .required('Age is required')
        .min(0, 'Minimum age is 0')
        .max(200, 'Maximum age is 200'),
}); function ContactForm({
    edit,
    onSave,
    setContacts,
    contact,
    onCancelAdd,
    onCancelEdit,
});
    const handleSubmit = async (evt) => {
        const isValid = await schema.validate(evt);
        if (!isValid) {
            return;
        }
        if (!edit) {
            await addContact(evt);
        }
        else {
            await editContact(evt);
        }
        const response = await getContacts();
        setContacts(response.data);
        onSave();
    ; (
        <div className="form">
            <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={contact || {}}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isInvalid,
                    errors,
                }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} md="12" controlId="firstName">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={values.firstName || ''}
                                        onChange={handleChange}
                                        isInvalid={touched.firstName && errors.firstName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.firstName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="lastName">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={values.lastName || ''}
                                        onChange={handleChange}
                                        isInvalid={touched.firstName && errors.lastName}
                                    /><Form.Control.Feedback type="invalid">
                                        {errors.lastName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <InputGroup>
                                        <Form.Control>
                                        </Form.Control>

type="text"
placeholder="Address"
aria-describedby="inputGroupPrepend"
name="address"
value={values.address || ''}
onChange={handleChange}
isInvalid={touched.address && errors.address}

<Form.Control.Feedback type="invalid">
                                            {errors.address}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="12" controlId="city">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="City"
                                        name="city"
                                        value={values.city || ''}
                                        onChange={handleChange}
                                        isInvalid={touched.city && errors.city}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.city}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="region">
                                    <Form.Label>Region</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Region"
                                        name="region"
                                        value={values.region || ''}
                                        onChange={handleChange}
                                        isInvalid={touched.region && errors.region}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.region}
                                    </Form.Control.Feedback>
                                </Form.Group><Form.Group as={Col} md="12" controlId="country">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        as="select"
                                        placeholder="Country"
                                        name="country"
                                        onChange={handleChange}
                                        value={values.country || ''}
                                        isInvalid={touched.region && errors.country}>
                                        {COUNTRIES.map(c =>
                                            <option key={c} value={c}>{c}
                                            </option>)}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.country}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="postalCode">
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Postal Code"
                                        name="postalCode"
                                        value={values.postalCode || ''}
                                        onChange={handleChange}
                                        isInvalid={touched.postalCode && errors.postalCode}
                                    /><Form.Control.Feedback type="invalid">
                                        {errors.postalCode}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="phone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Phone"
                                        name="phone"
                                        value={values.phone || ''}
                                        onChange={handleChange}
                                        isInvalid={touched.phone && errors.phone}
                                    /><Form.Control.Feedback type="invalid">
                                        {errors.phone}
                                    </Form.Control.Feedback>
                                </Form.Group><Form.Group as={Col} md="12" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        value={values.email || ''}
                                        onChange={handleChange}
                                        isInvalid={touched.email && errors.email}
                                    /><Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group><Form.Group as={Col} md="12" controlId="age">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Age"
                                        name="age"
                                        value={values.age || ''}
                                        onChange={handleChange}
                                        isInvalid={touched.age && errors.age}
                                    /><Form.Control.Feedback type="invalid">
                                        {errors.age}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Button type="submit" style={{ 'marginRight': '10px' }}>Save</Button>
                            <Button type="button" onClick={edit ? onCancelEdit : onCancelAdd}>Cancel</Button>
                        </Form>
                    )}
            </Formik>
        </div>
    );
}

ContactForm.propTypes = {
    edit: PropTypes.bool,
    onSave: PropTypes.func,
    onCancelAdd: PropTypes.func,
    onCancelEdit: PropTypes.func,
    contact: PropTypes.object
}
const mapStateToProps = state => {
    return {
        contacts: state.contacts,
    }
}
const mapDispatchToProps = dispatch => ({
    setContacts: contacts => dispatch(setContacts(contacts))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactForm);
