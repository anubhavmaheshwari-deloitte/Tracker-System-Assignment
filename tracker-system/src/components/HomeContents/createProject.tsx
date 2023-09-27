import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ClayAlert from "@clayui/alert";
import * as Yup from "yup";
import moment from "moment-timezone";
import { createProject } from "../../api/api";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { changeTab } from "../../redux/storeSlices/tabSlice";
import { tabs } from "../../utils/constants";

interface projectData {
  projectName: string;
  projectOwner: number;
  projectStartDate: string;
  projectEndDate: string;
}
const CreateProject: React.FC = () => {
  const createdProject = useAppSelector((state) => state.createProject);
  //const tabs = useAppSelector((state) => state.tabs);
  const dispatch = useAppDispatch();
  const validationSchema = Yup.object().shape({
    projectName: Yup.string().required("Project Name is Required"),
    projectOwner: Yup.number()
      .required("Project Owner is Required")
      .lessThan(11, "Invalid User")
      .moreThan(0, "Invalid User"),
    projectStartDate: Yup.date().required("Project Start Date is Required"),
    projectEndDate: Yup.date()
      .required("Project End Date is Required")
      .when("projectStartDate", (projectStartDate, schema) => {
        return schema.min(
          Yup.ref("projectStartDate"),
          "Project End Date must be greater than Project Start Date",
        );
      }),
  });

  const handleSubmit = (data: projectData) => {
    data = {
      ...data,
      projectOwner: Number(data.projectOwner),
      projectStartDate: moment(data.projectStartDate, "YYYY-MM-DD")
        .utc()
        .format(),
      projectEndDate: moment(data.projectEndDate, "YYYY-MM-DD").utc().format(),
    };
    dispatch(createProject({ data }));
    dispatch(changeTab(tabs.PROJECT_BOARD));
    //console.log(JSON.stringify(data, null, 2));
  };

  const initialValues: projectData = {
    projectName: "",
    projectOwner: 0,
    projectStartDate: "",
    projectEndDate: "",
  };
  useEffect(() => {
    console.log(createdProject);
    //if (!createdProject && createdProject.response !== null)
    //  alert(
    //    "Response After Project Data Response : " + createdProject.response,
    //  );
  }, [createdProject]);
  return (
    <div className="register-form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, resetForm }) => (
          <Form>
            <div className="form-group">
              <label>Project Name</label>
              <Field
                name="projectName"
                type="text"
                className={
                  "form-control" +
                  (errors.projectName && touched.projectName
                    ? " is-invalid"
                    : "")
                }
              />
              <ErrorMessage
                name="projectName"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="projectOwner">Owner</label>
              <Field
                name="projectOwner"
                type="dropdown"
                className={
                  "form-control" +
                  (errors.projectOwner && touched.projectOwner
                    ? " is-invalid"
                    : "")
                }
              />
              <ErrorMessage
                name="projectOwner"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="projectStartDate">Project Start Date</label>
              <Field
                name="projectStartDate"
                type="date"
                className={
                  "form-control" +
                  (errors.projectStartDate && touched.projectStartDate
                    ? " is-invalid"
                    : "")
                }
              />
              <ErrorMessage
                name="projectStartDate"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="projectEndDate">Project End Date</label>
              <Field
                name="projectEndDate"
                type="date"
                className={
                  "form-control" +
                  (errors.projectEndDate && touched.projectEndDate
                    ? " is-invalid"
                    : "")
                }
              />
              <ErrorMessage
                name="projectEndDate"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
              <button
                type="button"
                onClick={() => resetForm()}
                className="btn btn-warning float-right"
              >
                Reset
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {/* <ClayAlert displayType="success" title="Success" hideCloseIcon={false}>
        Project Created Successfully.
      </ClayAlert> */}
    </div>
  );
};

export default CreateProject;
