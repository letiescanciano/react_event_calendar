import React from "react";
import PropTypes from "prop-types";

import { Field, Formik, Form } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import { Grid, makeStyles, Button } from "@material-ui/core";
import { DatePicker } from "../../../Atoms/DatePicker";
import { Debug } from "../Debug";

// import PropTypes from "prop-types";
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    padding: "20px",
  },
  flex: {
    display: "flex",
    "justify-content": "space-between",
  },
  mr30: {
    "margin-right": "30px",
  },
  fullWidth: {
    width: "100%",
  },
  w80: {
    width: "80%",
  },
  w50: {
    width: "50%",
  },

  mt10: {
    "margin-top": "10px",
  },
}));

const EventForm = (props) => {
  console.log("EventForm props", props);
  const { variant, initialValues, handlers } = props;
  const classes = useStyles();
  const eventSchema = Yup.object().shape({
    title: Yup.string().required("Required field"),
    description: Yup.string().required("Required field"),
    start: Yup.date()
      .default(() => new Date())
      .required("Required field"),
    end: Yup.date()
      .default(() => new Date())
      .required("Required field"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={eventSchema}
      onSubmit={(values, { resetForm }) => {
        // console.log("Values onSubmit", values);
        if (variant === "add") {
          handlers.createEvent(values);
          resetForm = {
            title: "",
            description: "",
            start: null,
            end: null,
          };
          handlers.onClose();
        } else if (variant === "edit") {
          handlers.editOpportunity(values);
          handlers.onClose();
        }
      }}
    >
      {({ values, isValid, isSubmitting }) => {
        // console.log("Values in render", values);
        return (
          <Form data-cy="add-event" className={classes.form}>
            <Grid container className={classes.root}>
              <Grid item md={12}>
                <Field
                  data-cy="title"
                  name="title"
                  key="title"
                  label="Title"
                  component={TextField}
                  className={classes.fullWidth}
                  margin="normal"
                  variant="outlined"
                />
                <Field
                  data-cy="description"
                  name="description"
                  key="description"
                  label="Description"
                  component={TextField}
                  className={classes.fullWidth}
                  margin="normal"
                  variant="outlined"
                />
                <Grid item md={12} className={classes.flex}>
                  <Field
                    name="start"
                    key="start"
                    data-cy="start"
                    label={"Start date"}
                    component={DatePicker}
                    className={[classes.w80, classes.mr30].join(" ")}
                    // value={values.start}
                  />
                  <Field
                    name="end"
                    key="end"
                    data-cy="end"
                    label={"End date"}
                    component={DatePicker}
                    className={classes.w80}
                    // value={values.end}
                  />
                </Grid>
              </Grid>

              <Grid
                item
                md={12}
                className={[classes.flex, classes.mt10].join(" ")}
              >
                <Button
                  data-cy="cancel"
                  size="medium"
                  className={[classes.w80, classes.mr30].join(" ")}
                  color="secondary"
                  variant="outlined"
                  onClick={handlers.onClose}
                >
                  Cancel
                </Button>
                <Button
                  data-cy="submit"
                  size="medium"
                  color="primary"
                  variant="outlined"
                  className={classes.w80}
                  disabled={!isValid || isSubmitting}
                  type="submit"
                >
                  {variant === "add" ? "Add" : "Save"}
                </Button>
              </Grid>

              <Debug />
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
export { EventForm };

EventForm.propTypes = {
  data: PropTypes.object,
  handlers: PropTypes.object,
  variant: PropTypes.oneOf(["add", "edit"]),
};
