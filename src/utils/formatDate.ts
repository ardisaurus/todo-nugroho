import moment from "moment";

export default function formatDate(value: any) {
  return moment(value).format("YYYY-MM-DD HH:mm");
}
