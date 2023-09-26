import React, { useEffect } from "react";
import { Issue } from "../../../redux/storeSlices/issuesSlice";
import moment from "moment-timezone";
import "./../../../styles/Home/ProjectBoard/issueCard.scss";
import { issuePriority } from "../../../utils/constants";

const IssueCard = ({ issue }: { issue: Issue }) => {
  return (
    <div className="card card-rounded issueCard">
      <div className="card-body">
        <div className="card-row issueCardHeader">
          <h5 className="card-title card-col">ID: {issue.id}</h5>
          <h6 className="card-subtitle mb-2 text-muted card-col">
            {moment(issue.createdOn).format("DD-MM-YYYY")}
          </h6>
        </div>
        <h4 className="card-title text-truncate">{issue.summary}</h4>
        <p className="card-text" style={{ height: "50px" }}>
          {issue.description}
        </p>
        <div className="card-type-asset-icon issueCardFooter">
          <span className="sticker sticker-secondary sticker-user-icon">
            <span className="sticker-overlay">
              <img
                alt="thumbnail"
                className="sticker-img"
                src={require("./../../../assets/Home/user-icon.png")}
              />
            </span>
          </span>
          <h4 className="card-title text-truncate issueCardAssignee">{issue.assignee.name}</h4>
          <div className="issueCardPriority">
            <p className="card-subtitle mb-2 text-muted card-col">Priority</p>
            {issue.priority === issuePriority.LOW && (
              <span className="label label-inverse-success">
                <span className="label-item label-item-expand">Low</span>
              </span>
            )}
            {issue.priority === issuePriority.MEDIUM && (
              <span className="label label-inverse-warning">
                <span className="label-item label-item-expand">Medium</span>
              </span>
            )}
            {issue.priority === issuePriority.HIGH && (
              <span className="label label-inverse-danger">
                <span className="label-item label-item-expand">High</span>
              </span>
            )}
          </div>
        </div>
      </div>
      {/* {issue.id} - {issue.projectID} - {issue.summary} - {issue.type} -{" "}
      {issue.priority} - {issue.status} */}
    </div>
  );
};

export default IssueCard;
