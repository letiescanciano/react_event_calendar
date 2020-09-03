import React from "react";
import PropTypes from "prop-types";

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import "moment/locale/es";

const DatePicker = ({
  format,
  label,
  id,
  margin,
  variant,
  field,
  disableToolbar,
  form,
  disablePast,
  disableFuture,
  time,
  ...other
}) => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale="es">
      <KeyboardDateTimePicker
        onError={console.log}
        ampm={false}
        name={field.name}
        disableToolbar={disableToolbar}
        inputVariant={variant}
        format={"DD/MM/YYYY HH:mm"}
        margin={margin}
        id={id}
        label={label}
        value={field.value}
        autoOk
        disablePast={disablePast}
        disableFuture={disableFuture}
        invalidDateMessage={"Incorrect date"}
        onChange={(date) => date && form.setFieldValue(field.name, date, true)}
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};
DatePicker.propTypes = {
  /** Values coming from Formik*/
  disableToolbar: PropTypes.bool,
  variant: PropTypes.oneOf(["standard", "outlined", "filled"]),
  format: PropTypes.string,
  margin: PropTypes.oneOf(["normal"]),
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.instanceOf(Date),
};

DatePicker.defaultProps = {
  format: "DD/MM/YYYY",
  variant: "outlined",
  margin: "normal",
};

export { DatePicker };
