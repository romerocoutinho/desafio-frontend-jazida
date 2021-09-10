import { render, screen } from "@testing-library/react";
import IssueItem from "./IssueItem";

const issue = {
  id: "123",
  state: "open",
  html_url: "https://www.teste.com",
  title: "Title",
  labels: [
    { id: "1", color: "#000000", url: "url_label1", name: "label1" },
    { id: "2", color: "#FFFFFF", url: "url_label2", name: "label2" },
  ],
  number: "321",
  created_at: "2021-09-09T17:32:36Z",
  comments: [],
  user: { login: "user1" },
};

describe("Item issue Component", () => {
  it("renders issue item", () => {
    render(<IssueItem issue={issue} />);

    const ItemElement = screen.getByTestId("issue");
    expect(ItemElement).toBeInTheDocument();
  });

  it("deve conter titulo da issue", () => {
    render(<IssueItem issue={issue} />);

    const titleElement = screen.queryByText(issue.title);
    expect(titleElement).toBeInTheDocument();
  });

  it("deve conter data de criação da issue", () => {
    render(<IssueItem issue={issue} />);

    const dateElement = screen.getByText("created", { exact: false });
    expect(dateElement).toBeInTheDocument();
  });
});
