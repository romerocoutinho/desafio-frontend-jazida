import moment from "moment";
import styled from "styled-components";

const Labels = styled.span`
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 300;
  margin: 1px;
  padding: 2px 7px;
  white-space: nowrap;
  color: #ffffff;

  &::first-child {
    margin-left: 5px;
  }
`;

const RowIssue = ({ issue }) => {
  return (
    <div key={issue.id} className="box-row b-top">
      <div className="col-1">
        {issue.state === "open" ? (
          <svg
            className="issue-icon open"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
            <path
              fillRule="evenodd"
              d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
            ></path>
          </svg>
        ) : (
          <svg
            className="issue-icon closed"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path d="M11.28 6.78a.75.75 0 00-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l3.5-3.5z"></path>
            <path
              fillRule="evenodd"
              d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-1.5 0a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
            ></path>
          </svg>
        )}
      </div>
      <div className="col-2">
        <a href={issue.html_url}>{issue.title}</a>
        {!!issue.labels.length &&
          issue.labels.map((label) => (
            <Labels
              key={label.id}
              href={label.url}
              style={{
                backgroundColor: "#" + label.color,
                borderColor: "#" + label.color,
              }}
            >
              {label.name}
            </Labels>
          ))}
        <span>{`#${issue.number} created ${moment(
          issue.created_at
        ).fromNow()} by ${issue.user.login}`}</span>
      </div>
      {!!issue.comments && (
        <div className="col-3">
          <a href={issue.url}>
            <svg
              aria-hidden="true"
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              data-view-component="true"
              className="issue-icon mr2 v-align-middle"
            >
              <path
                fillRule="evenodd"
                d="M2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75zM1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.457 1.457 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25v-7.5z"
              ></path>
            </svg>
            <span>{issue.comments}</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default RowIssue;
