import React, { useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { EventForm } from "../../../Molecules/Forms/Event";

const EventDialog = (props) => {
  // console.log("EventDialog props", props);

  const { mode, initialValues, handlers, open, ...rest } = props;
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
