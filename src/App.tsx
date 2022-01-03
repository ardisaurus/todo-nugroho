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

const data = [
  {
    id: 1,
    title: "Make a meal",
    description: "lorem ipsum",
    status: 0,
    createdAt: "2019-11-15 18:00",
  },
  {
    id: 2,
    title: "Dinner with family",
    description: "lorem ipsum",
    status: 0,
    createdAt: "2019-11-16 18:00",
  },
  {
    id: 3,
    title: "Watch scary movie",
    description: "lorem ipsum",
    status: 0,
    createdAt: "2019-11-15 13:00",
  },
  {
    id: 4,
    title: "Learn something new",
    description: "lorem ipsum",
    status: 1,
    createdAt: "2019-11-15 08:00",
  },
  {
    id: 5,
    title: "Make a phone call to mom",
    description: "lorem ipsum",
    status: 1,
    createdAt: "2019-11-15 04:00",
  },
];

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function App() {
  const classes = useStyles();
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
          {data.map((item) => (
            <ItemCard data={item} />
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <ItemCard /> */}
        </TabPanel>
      </Paper>
    </>
  );
}

export default App;
