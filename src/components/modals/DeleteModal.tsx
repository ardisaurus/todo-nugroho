import Typography from "@material-ui/core/Typography";
import DialogTitle from "./customs/DialogTitle";
import DialogContent from "./customs/DialogContent";
import DialogActions from "./customs/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { FunctionComponent } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { removeTask } from "../../redux/task";

interface DeleteModalProps {
  id: number;
  open: boolean;
  handleClose: () => void;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
  id,
  open,
  handleClose,
}) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(removeTask(id));
    handleClose();
  };

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
          onClick={handleDelete}
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
