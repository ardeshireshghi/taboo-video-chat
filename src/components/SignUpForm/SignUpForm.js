import React, { useState } from 'react';
import { Form, FormInput, FormGroup } from 'shards-react';
import { Controller, useForm } from 'react-hook-form';
import { ButtonWithLoading } from '../shared/ButtonWithLoading';
import styled from 'styled-components';
import { semanticColorTokens } from '../../styles/colors';

const ErrorMessage = styled.div`
  color: ${semanticColorTokens.signupErrorMessage};
  font-size: 0.9rem;
`;

export default function SignUpForm({ onSubmit }) {
  const { control, handleSubmit } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const submitHandler = (data) => {
    setSubmitting(true);
    onSubmit(data);
  };

  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <FormGroup>
        <Controller
          control={control}
          name="name"
          rules={{
            required: true
          }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, error }
          }) => (
            <>
              <label htmlFor="#name">Name</label>

              <FormInput
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                name={name}
                id={`#${name}`}
                valid={isTouched && !invalid}
                invalid={invalid}
                placeholder="e.g. John"
                innerRef={ref}
              />
              {error && <ErrorMessage>Please tell us your name</ErrorMessage>}
            </>
          )}
        />
      </FormGroup>
      <FormGroup>
        <Controller
          control={control}
          name="email"
          rules={{
            required: true,
            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
          }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, error }
          }) => {
            return (
              <>
                <label htmlFor="#email">Email</label>
                <FormInput
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  name={name}
                  id={`#${name}`}
                  valid={isTouched && !invalid}
                  invalid={invalid}
                  placeholder="e.g. john@email.com"
                  innerRef={ref}
                />
                {error && error.type === 'required' && (
                  <ErrorMessage>Please tell us your email address</ErrorMessage>
                )}

                {error && error.type === 'pattern' && (
                  <ErrorMessage>Email address is not valid</ErrorMessage>
                )}
              </>
            );
          }}
        />
      </FormGroup>
      <FormGroup>
        <ButtonWithLoading
          block
          pill
          type="submit"
          theme="success"
          isLoading={submitting}
        >
          Sign up
        </ButtonWithLoading>
      </FormGroup>
    </Form>
  );
}
