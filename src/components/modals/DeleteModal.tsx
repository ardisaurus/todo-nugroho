import Typography from "@material-ui/core/Typography";
import DialogTitle from "./customs/DialogTitle";
import DialogContent from "./customs/DialogContent";
import DialogActions from "./customs/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { FunctionComponent } from "react";

interface DeleteModalProps {
  open: boolean;
  handleClose: () => void;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
  open,
  handleClose,
}) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Delete Task
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Are you sure want to remove this task?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleClose}
          color="secondary"
          variant="contained"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
