import addGroup from "./EventFunctions/AddTimeBox/addGroup";

$((): void => {
  $("body").on("click", ".add, .add-group", addGroup);
});
