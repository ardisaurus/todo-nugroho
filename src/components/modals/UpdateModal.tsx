import DialogTitle from "./customs/DialogTitle";
import DialogContent from "./customs/DialogContent";
import DialogActions from "./customs/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import UpdateIcon from "@material-ui/icons/Edit";
import { FunctionComponent, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { ITask } from "../../typings/Task";
import { useAppDispatch } from "../../redux/hooks";
import { updateTask } from "../../redux/task";
import formatDate from "../../utils/formatDate";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Insert title"),
  description: Yup.string().required("Insert description"),
  date: Yup.date().required("Insert Date"),
});

interface UpdateModalProps {
  data: ITask;
  open: boolean;
  handleClose: () => void;
}

const UpdateModal: FunctionComponent<UpdateModalProps> = ({
  data,
  open,
  handleClose,
}) => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: new Date(),
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: ({ title, description, date }) => {
      dispatch(
        updateTask({
          id: data.id,
          status: data.status,
          title,
          description,
          createdAt: formatDate(date),
        })
      );
      handleClose();
    },
  });

  useEffect(() => {
    if (open) {
      formik.setFieldValue("title", data.title);
      formik.setFieldValue("description", data.description);
      formik.setFieldValue("date", data.createdAt);
    }
    // eslint-disable-next-line
  }, [open]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Update Task
      </DialogTitle>
      <DialogContent dividers>
        <form id="update-form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            name="title"
            label="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.title) && formik.touched.title}
            helperText={formik.errors.title}
          />
          <TextField
            fullWidth
            name="description"
            label="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              Boolean(formik.errors.description) && formik.touched.description
            }
            helperText={formik.errors.description}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                name="date"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date"
                InputProps={{ readOnly: true }}
                value={formik.values.date}
                onChange={(val) => {
                  formik.setFieldValue("date", val);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                name="date"
                id="time-picker"
                label="Time"
                value={formik.values.date}
                InputProps={{ readOnly: true }}
                onChange={(val) => {
                  formik.setFieldValue("date", val);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          {Boolean(formik.errors.date) && formik.touched.date
            ? formik.errors.date
            : null}
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          color="primary"
          variant="contained"
          form="update-form"
          type="submit"
          startIcon={<UpdateIcon />}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModal;
