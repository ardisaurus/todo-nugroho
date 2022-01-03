import DialogTitle from "./customs/DialogTitle";
import DialogContent from "./customs/DialogContent";
import DialogActions from "./customs/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { useAppDispatch } from "../../redux/hooks";
import { addTask } from "../../redux/task";
import RandomNumber from "../../utils/randomNumber";
import formatDate from "../../utils/formatDate";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Insert title"),
  description: Yup.string().required("Insert description"),
  date: Yup.date().required("Insert Date"),
});

interface UpdateModalProps {
  open: boolean;
  handleClose: () => void;
}

const UpdateModal: FunctionComponent<UpdateModalProps> = ({
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
    onSubmit: ({ title, description, date }, { resetForm }) => {
      dispatch(
        addTask({
          id: RandomNumber(),
          status: 0,
          title,
          description,
          createdAt: formatDate(date),
        })
      );
      resetForm();
      handleClose();
    },
  });

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Add Task
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
                format="dd/MM/yyyy"
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
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModal;
