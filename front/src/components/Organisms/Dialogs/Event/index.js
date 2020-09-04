import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { EventForm } from "../../../Molecules/Forms/Event";

const EventDialog = (props) => {
  // console.log("EventDialog props", props);

  const { mode, initialValues, handlers, open } = props;
  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={handlers.onClose}>
      <DialogTitle>Add new event</DialogTitle>
      <EventForm
        mode={mode}
        handlers={handlers}
        initialValues={initialValues}
      />
    </Dialog>
  );
};

export { EventDialog };

EventDialog.propTypes = {
  mode: PropTypes.oneOf(["add", "edit"]),
  initialValues: PropTypes.string,
  handlers: PropTypes.object,
  open: PropTypes.bool,
};
