import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getAllProjects, getAllUsers, getIssues } from "../../api/api";
import BlankProjectBoard from "./ProjectBoard/blankProjectBoard";
import Button from "@clayui/button";
import ClayButton from "@clayui/button";
import moment from "moment-timezone";
import "./../../styles/Home/projectBoard.scss";
import { changeSelectedProject } from "../../redux/storeSlices/projectSlice";
import IssueCard from "./ProjectBoard/issueCard";
import { issueStatus } from "../../utils/constants";
import { ClayDropDownWithItems } from "@clayui/drop-down";
import { Issue, filterIssues } from "../../redux/storeSlices/issuesSlice";

const ProjectBoard: React.FC = () => {
  const projects = useAppSelector((state) => state.projects);
  const users = useAppSelector((state) => state.users);
  const issues = useAppSelector((state) => state.issues);

  const dispatch = useAppDispatch();
  const [assigneeId, setAssigneeId] = useState<number | undefined>(undefined);
  const [low, setLow] = useState<boolean>(true);
  const [medium, setMedium] = useState<boolean>(true);
  const [high, setHigh] = useState<boolean>(true);
  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getAllUsers({}));
  }, []);
  useEffect(() => {
    dispatch(
      getIssues({ projectID: projects.selected?.projectID, issueID: null }),
    );
    setAssigneeId(0);
  }, [projects.selected]);
  useEffect(() => {
    dispatch(filterIssues({ assigneeId, low, medium, high }));
  }, [assigneeId, low, medium, high]);

  if (projects.loading) {
    return <div>Loading...</div>;
  } else if (!projects.loading && projects.error) {
    return <div>Error: {projects.error}</div>;
  } else if (!projects.loading && projects.projects.length === 0) {
    return <BlankProjectBoard />;
  } else if (!projects.loading && projects.projects.length !== 0) {
    return (
      <div className="projectBoardContainer">
        <div className="headingBox">
          <h4 className="projectHeading">Project Details</h4>
          <Button className="viewInsightsButton">VIEW INSIGHTS</Button>
        </div>
        <div className="projectDetailsBox">
          <div className="selectOptionsWrapper">
            <div className="form-group">
              <label htmlFor="regularSelectElement">Project Name</label>
              <select
                className="form-control"
                id="regularSelectElement"
                value={projects.selected?.projectID}
                onChange={(e) =>
                  dispatch(
                    changeSelectedProject(
                      projects.projects.find(
                        (item) => item.projectID === e.target.value,
                      ),
                    ),
                  )
                }
              >
                {projects.projects.map((project) => (
                  <option key={project.projectID} value={project.projectID}>
                    {project.projectName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="regularSelectedElement">Project Owner</label>
              <select
                className="form-control"
                disabled
                id="regularSelectElement"
                value={projects.selected?.projectOwner.name}
              >
                <option>{projects.selected?.projectOwner.name}</option>
              </select>
            </div>
          </div>
          <div className="projectTimeline">
            {"Start Date : " +
              moment(projects.selected?.projectStartDate).format("DD-MM-YYYY")}
            &nbsp;&nbsp;
            {" | "}&nbsp;&nbsp;
            {"End Date : " +
              moment(projects.selected?.projectEndDate).format("DD-MM-YYYY")}
          </div>
          <div className="filterIssuesDropdown">
            <div className="form-group">
              <select
                className="form-control"
                id="assigneeId"
                value={assigneeId}
                onChange={(e) => setAssigneeId(Number(e.target.value))}
              >
                <option value={0}>Select</option>
                {users.users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <label htmlFor="assigneeId">Filter Assignee</label>
            </div>

            <div className="form-group">
              <ClayDropDownWithItems
                alignmentPosition={4}
                items={[
                  {
                    checked: true,
                    label: "HIGH",
                    onChange: () => setHigh(!high),
                    type: "checkbox",
                  },
                  {
                    checked: true,
                    label: "MEDIUM",
                    onChange: () => setMedium(!medium),
                    type: "checkbox",
                  },
                  {
                    checked: true,
                    label: "LOW",
                    onChange: () => setLow(!low),
                    type: "checkbox",
                  },
                ]}
                trigger={
                  <ClayButton className="form-control" id="filterPriority">
                    {"Select"}
                  </ClayButton>
                }
              />

              <label htmlFor="filterPriority">Filter Priority</label>
            </div>
          </div>
        </div>
        <div className="issueContainer">
          {issues.filteredIssues.length === 0 ? (
            <div className="c-empty-state c-empty-state-animation">
              <div className="c-empty-state-image">
                <div className="c-empty-state-aspect-ratio">
                  <img
                    alt="empty-state-image"
                    className="aspect-ratio-item aspect-ratio-item-fluid"
                    src={require("./../../assets/Home/success_state.gif")}
                  />
                </div>
              </div>
              <div className="c-empty-state-title">
                <span className="text-truncate-inline">
                  <span className="text-truncate">No Issues Available</span>
                </span>
              </div>
            </div>
          ) : (
            Object.entries(issueStatus).map(([key, value], index) => (
              <div key={index} className="issueStatusBlock">
                <div className="issueStatusHeading">
                  {key.replace("_", " ")}
                </div>
                {issues.filteredIssues
                  .filter((issue) => issue.status === value)
                  .sort((a, b) => moment(a.updatedOn).isBefore(moment(b.updatedOn)) ? 1 : -1)
                  .map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
              </div>
            ))
          )}
        </div>
      </div>
    );
  } else return <div>OOPs: Something Went Wrong !!!</div>;
};

export default ProjectBoard;
