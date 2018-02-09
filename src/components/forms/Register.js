import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';

const Register = (props) => {
  const { handleSubmit } = props;
  return props.authenticated ? (
    <Redirect to='/' />
  ) : (
    <div className='container'>
      <form style={{ margin: '0 auto', width: '40%' }} onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>First Name</label>
          <div>
            <Field
              className='form-control'
              name='firstName'
              component='input'
              type='text'
              placeholder='First Name'
              required
            />
          </div>
        </div>
        <div className='form-group'>
          <label>Last Name</label>
          <div>
            <Field
              className='form-control'
              name='lastName'
              component='input'
              type='text'
              placeholder='Last Name'
              required
            />
          </div>
        </div>
        <div className='form-group'>
          <label>Email</label>
          <div>
            <Field
              className='form-control'
              name='email'
              component='input'
              type='email'
              placeholder='Email'
              required
            />
          </div>
        </div>
        <div className='form-group'>
          <label>Password</label>
          <div>
            <Field
              className='form-control'
              name='password'
              component='input'
              type='password'
              placeholder='Password'
              required
            />
          </div>
        </div>
        <div className='form-group'>
          <button
            type='submit'
            className='btn btn-block btn-primary btn-lg'
          >
          Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'register'
})(Register);
