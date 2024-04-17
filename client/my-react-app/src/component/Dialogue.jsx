import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {

  const [formValue,setFormValue]=React.useState([])

  React.useEffect(()=>{

  },[formValue])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log(formValue)
  };


  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleSubmit(formValue);
    props.handleClose();
  };
  return (
    <React.Fragment>

      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      > <form onSubmit={handleSubmit}>
 <DialogTitle id="edit-dialog-title">Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText id="edit-dialog-description">
           
            <input
              type="text"
              name="name"
              value={formValue.name}
              onChange={handleChange}
              placeholder="Name"
              className="edit-input"
            />
            <input
              type="email"
              name="email"
              value={formValue.email}
              onChange={handleChange}
              placeholder="Email"
              className="edit-input"
            />
            <input
              type="text"
              name="mobile"
              value={formValue.mobile}
              onChange={handleChange}
              placeholder="Number"
              className="edit-input"
            />
            <input
              type="password"
              name="password"
              value={formValue.password}
              onChange={handleChange}
              placeholder="Password"
              className="edit-input"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* Cancel and Save buttons */}
          <Button onClick={props.handleClose} variant="outlined">Cancel</Button>
          <Button 
        type='submit'
           variant="contained" autoFocus>Save</Button>
        </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
