import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [editedUser, setEditedUser] = React.useState({}); // Initialize as an empty object

  React.useEffect(() => {
    setEditedUser(props.userData || {}); // Update when props.userData changes and handle undefined case
  }, [props.userData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleEdit = () => {
    // Call the edit function and pass the edited user data
    props.handleEdit(editedUser);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>Edit</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-dialog-title"
        aria-describedby="edit-dialog-description"
      >
        <DialogTitle id="edit-dialog-title">Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText id="edit-dialog-description">
            <input
              type="text"
              name="name"
              value={editedUser.name || ''}
              onChange={handleChange}
            />
            {/* Other input fields for editing user data */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEdit} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
