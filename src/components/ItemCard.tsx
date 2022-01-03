import React from "react";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DetailsModal from "./modals/DetailsModal";
import UpdateModal from "./modals/UpdateModal";
import DeleteModal from "./modals/DeleteModal";
import { FunctionComponent } from "react";
import { ITask } from "../typings/Task";

interface ItemCardProps {
  data: ITask;
}

const ItemCard: FunctionComponent<ItemCardProps> = ({ data }) => {
  const [openModal, setOpenModal] = React.useState<
    null | "details" | "update" | "delete" | "add"
  >();

  const handleCloseModal = () => setOpenModal(null);

  return (
    <>
      <Card style={{ margin: "1em" }} elevation={3}>
        <CardActionArea onClick={() => setOpenModal("details")}>
          <CardContent>
            <Grid container justifyContent="space-between">
              <Typography variant="h5">{data.title}</Typography>
              <Chip
                color="primary"
                icon={<ScheduleIcon />}
                label={data.createdAt}
                variant="outlined"
              />
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
      <DetailsModal
        data={data}
        handleClose={handleCloseModal}
        handleOpenUpdate={() => setOpenModal("update")}
        handleOpenDelete={() => setOpenModal("delete")}
        open={openModal === "details"}
      />
      <UpdateModal
        data={data}
        handleClose={handleCloseModal}
        open={openModal === "update"}
      />
      <DeleteModal
        id={data.id}
        handleClose={handleCloseModal}
        open={openModal === "delete"}
      />
    </>
  );
};

export default ItemCard;
