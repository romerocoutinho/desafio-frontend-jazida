import { render, screen } from "@testing-library/react";
import userEven from "@testing-library/user-event";
import IssuesFilter from "./IssuesFilter";
import { Provider } from "react-redux";
import store from "../../store/index";

it("renders filter open issues", async () => {
  render(
    <Provider store={store}>
      <IssuesFilter resetPage={() => {}} />
    </Provider>
  );

  const buttonElement = await screen.findByText("Aberto", { exact: false });
  userEven.click(buttonElement);

  const filterOpenIssues = await screen.findByText("Aberto", { exact: false });
  expect(filterOpenIssues).toBeInTheDocument();
});

it("renders filter closed issues", async () => {
  render(
    <Provider store={store}>
      <IssuesFilter resetPage={() => {}} />
    </Provider>
  );

  const buttonElement = await screen.findByText("Fechado", { exact: false });
  userEven.click(buttonElement);

  const filterOpenIssues = await screen.findByText("Fechado", { exact: false });
  expect(filterOpenIssues).toBeInTheDocument();
});

it("renders filter labels issues", async () => {
  render(
    <Provider store={store}>
      <IssuesFilter resetPage={() => {}} />
    </Provider>
  );

  const filterLabelsElement = await screen.findByText("Labels", {
    exact: false,
  });
  userEven.click(filterLabelsElement);

  const filterLabelsIssues = await screen.findByText("Labels", {
    exact: false,
  });
  expect(filterLabelsIssues).toBeInTheDocument();
});

it("renders filter ordering issues", async () => {
  render(
    <Provider store={store}>
      <IssuesFilter resetPage={() => {}} />
    </Provider>
  );

  const filterOrderingElement = await screen.findByText("Ordenação", {
    exact: false,
  });
  userEven.click(filterOrderingElement);

  const filterOrderingIssues = await screen.findByText("Ordenação", {
    exact: false,
  });
  expect(filterOrderingIssues).toBeInTheDocument();
});
