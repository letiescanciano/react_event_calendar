import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";

const DeleteConfirmation = (props) => {
  // console.log("DeleteConfirmationDialog props", props);
  const { title, text, onCancel, onSubmit } = props;
  return (
    <>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        {text && <DialogContentText>{text}</DialogContentText>}
      </DialogContent>
      <DialogActions>
        <Button
          data-cy="cancel"
          onClick={onCancel}
          color="secondary"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          data-cy="cancel"
          onClick={onSubmit}
          color="secondary"
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </>
  );
};

export { DeleteConfirmation };

DeleteConfirmation.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
