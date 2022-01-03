import Typography from "@material-ui/core/Typography";
import DialogTitle from "./customs/DialogTitle";
import DialogContent from "./customs/DialogContent";
import DialogActions from "./customs/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import UpdateIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { FunctionComponent } from "react";
import { ITask } from "../../typings/Task";
import { useAppDispatch } from "../../redux/hooks";
import { switchStatusTask } from "../../redux/task";

interface DetailsModalProps {
  data: ITask;
  open: boolean;
  handleClose: () => void;
  handleOpenUpdate: () => void;
  handleOpenDelete: () => void;
}

const DetailsModal: FunctionComponent<DetailsModalProps> = ({
  data,
  open,
  handleClose,
  handleOpenUpdate,
  handleOpenDelete,
}) => {
  const dispatch = useAppDispatch();
  const handleSwitchStatus = () => {
    dispatch(switchStatusTask(data));
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {data.title}
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="caption" gutterBottom color="textSecondary">
          {data.createdAt}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {data.description}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleSwitchStatus}
          color={data.status === 0 ? "primary" : "default"}
          variant="contained"
          startIcon={<CheckIcon />}
        >
          Mark as {data.status === 0 ? "C" : "Inc"}omplete
        </Button>
        <Button
          onClick={handleOpenUpdate}
          color="primary"
          variant="contained"
          startIcon={<UpdateIcon />}
        >
          Update
        </Button>
        {data.status === 0 && (
          <Button
            onClick={handleOpenDelete}
            color="secondary"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DetailsModal;
