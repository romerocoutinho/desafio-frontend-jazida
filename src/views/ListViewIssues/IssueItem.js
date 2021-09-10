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

const RowStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 60px;
  padding: 10px;
  border-top: 1px solid #d0d7de;

  .col-2 {
    flex-grow: 1;
    padding: 0 10px;
    word-break: break-word;

    span:last-child {
      color: #57606a;
      display: block;
      font-size: 0.85rem;
      margin-top: 8px;
    }

    a {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 0.6rem;
      margin-right: 5px;
    }

    a:hover {
      color: #0969da;
    }
  }

  .col-3 {
    font-size: 0.8rem;
    font-weight: 700;
    min-width: 50px;
    text-align: right;

    a {
      color: #57606a;
    }

    a:hover {
      color: #0969da;
    }

    a > svg {
      display: inline-block;
      margin-right: 3px;
    }
  }

  .comment-icon {
    margin-right: 0.5rem;
    vertical-align: middle;
  }

  &:nth-child(odd) {
    background-color: #f6f8fa;
  }

  svg {
    display: inline-block;
    fill: currentColor;
    overflow: visible !important;
    vertical-align: text-top;
  }

  .open {
    color: #1a7f37;
  }

  .closed {
    color: #cf222e;
  }

  @media (max-width: 26rem) {
    .col-3 {
      display: none;
    }
  }
`;

const OpenIcon = () => {
  return (
    <svg
      className="open"
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
  );
};

const ClosedIcon = () => {
  return (
    <svg
      className="closed"
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
  );
};

const CommentIcon = () => {
  return (
    <svg
      aria-hidden="true"
      height="16"
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      data-view-component="true"
      className="comment-icon"
    >
      <path
        fillRule="evenodd"
        d="M2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75zM1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.457 1.457 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25v-7.5z"
      ></path>
    </svg>
  );
};

const RowIssue = ({ issue }) => {
  return (
    <RowStyle data-testid="issue">
      <div className="col-1">
        {issue.state === "open" ? <OpenIcon /> : <ClosedIcon />}
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
            <CommentIcon />
            <span>{issue.comments}</span>
          </a>
        </div>
      )}
    </RowStyle>
  );
};

export default RowIssue;
