import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import {
  Toast,
  Text,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
} from '@chakra-ui/react';
function PasswordForget(props) {
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [state, setState] = useState({ email: '', error: null });

  const handleChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = () => {
    props.firebase
      .doPasswordReset(state.email)
      .then(() => {
        setState({ email: '', error: null });
        handleClose();
        setOpenAlert(true);
      })
      .catch(error => {
        setState({ error });
      });
  };

  const isInvalid = state.email === '';

  return (
    <div>
      <Link to="" onClick={handleClickOpen}>
        Forgot password?
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="form-Modal-title"
      >
        <ModalHeader id="form-Modal-title">Reset my password</ModalHeader>
        <ModalBody>
          <Text>
            To reset your password, please enter your email address here. We
            will you instructions on how to reset your password shortly after.
          </Text>
          <Input
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            fullWidth
          />
          {state.error && <p style={{ color: 'red' }}>{state.error.message}</p>}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isInvalid}
            type="submit"
            color="primary"
          >
            Reset password
          </Button>
        </ModalFooter>
      </Modal>

      <Toast
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={openAlert}
        autoHideDuration={6000}
        message="Password reset link successfully sent"
      />
    </div>
  );
}

export default withFirebase(PasswordForget);
