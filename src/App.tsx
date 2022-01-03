import AppBar from "./components/Appbar";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { TabPanel, a11yProps } from "./components/TabPanel";
import ItemCard from "./components/ItemCard";
import AddIcon from "@material-ui/icons/Add";
import AddModal from "./components/modals/AddModal";
import { useAppSelector } from "./redux/hooks";
import TaskList from "./components/TaskList";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function App() {
  const classes = useStyles();

  const { task } = useAppSelector((state) => state.task);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const [openModal, setOpenModal] = React.useState(false);

  return (
    <>
      <AppBar />
      <Paper className={classes.root} elevation={0}>
        <AddModal handleClose={() => setOpenModal(false)} open={openModal} />
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="To Do" {...a11yProps(0)} />
          <Tab label="Completed" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <div style={{ margin: "1em" }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenModal(true)}
            >
              Add Task
            </Button>
          </div>
          <TaskList tasks={task} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TaskList tasks={task} status="complete" />
        </TabPanel>
      </Paper>
    </>
  );
}

export default App;
