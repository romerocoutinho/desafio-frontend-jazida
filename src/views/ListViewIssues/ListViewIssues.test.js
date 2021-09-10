import { render, screen } from "@testing-library/react";
import ListViewIssues from "./index";
import { Provider } from "react-redux";
import store from "../../store/index";

it("renders loading screen", () => {
  render(
    <Provider store={store}>
      <ListViewIssues />
    </Provider>
  );

  const filterOpenIssues = screen.getByText("Carregando", { exact: false });
  expect(filterOpenIssues).toBeInTheDocument();
});

it("renders issues if request succeeds", async () => {
  render(
    <Provider store={store}>
      <ListViewIssues />
    </Provider>
  );

  const listItemElements = await screen.findAllByTestId("issue");
  expect(listItemElements).not.toHaveLength(0);
  expect(screen.queryByText(/Carregando.../i)).not.toBeInTheDocument();
});

it("renders pagination if request succeeds", async () => {
  render(
    <Provider store={store}>
      <ListViewIssues />
    </Provider>
  );

  const paginateElements = await screen.findAllByRole("listitem");
  expect(paginateElements).not.toHaveLength(0);
});
