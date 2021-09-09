import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useIsMountedRef from "../hooks/useIsMountedRef";
import axios from "axios";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { filterActions } from "../store/index";
import RowIssue from "./RowIssue";

const labelsOptions = [
  {
    label: "accessibility",
    color: "#ffee8e",
  },
  {
    label: "bug: confirmed",
    color: "#ed2112",
  },
  {
    label: "bug: unconfirmed",
    color: "#ed2112",
  },
  {
    label: "CLA Signed",
    color: "#e7e7e7",
  },
  {
    label: "dependencies",
    color: "#0366d6",
  },
  {
    label: "difficulty: advanced",
    color: "#006b75",
  },
  {
    label: "difficulty: beginner",
    color: "#006b75",
  },
  {
    label: "difficulty: medium",
    color: "#006b75",
  },
  {
    label: "discussion",
    color: "#fbca04",
  },
  {
    label: "duplicate",
    color: "#cccccc",
  },
  {
    label: "external blocker",
    color: "#59d679",
  },
  {
    label: "feedback",
    color: "#fbca04",
  },
  {
    label: "good first issue",
    color: "#00bb22",
  },
  {
    label: "in-progress",
    color: "#5319e7",
  },
  {
    label: "invalid",
    color: "#c9ceff",
  },
  {
    label: "localization",
    color: "#fef2c0",
  },
  {
    label: "next release: don't merge",
    color: "#ff7cd3",
  },
  {
    label: "question",
    color: "#fbca04",
  },
  {
    label: "react core team",
    color: "#ededed",
  },
  {
    label: "type: documentation",
    color: "#1d76db",
  },
  {
    label: "type: example",
    color: "#1d76db",
  },
  {
    label: "type: infra",
    color: "#1d76db",
  },
  {
    label: "type: website",
    color: "#1d76db",
  },
];

const sortOptions = [
  {
    label: "Mais novos",
    value: "created",
    direction: "desc",
  },
  {
    label: "Mais antigos",
    value: "created",
    direction: "asc",
  },
  {
    label: "Mais comentados",
    value: "comments",
    direction: "desc",
  },
];

const CheckFilter = styled.input`
  &:checked + label {
    color: #000;
    font-weight: 700;
  }
`;

const CheckSort = styled.input`
  &:checked + label {
    color: #000;
    font-weight: 700;
  }
`;

const getTotalPages = (headers) => {
  if (!headers.link) {
    return 1;
  }

  const links = headers.link.split(",");
  const pageRegex = /&page=(\d+)/gm;
  const totalQuery = links
    .filter((lk) => lk.indexOf('rel="last"') !== -1)
    .toString()
    .split(";")[0];

  const totalPages = totalQuery.match(pageRegex)[0].split("=")[1];

  return parseInt(totalPages);
};

const CheckIcon = ({ checked }) => {
  return (
    <span>
      {checked && (
        <svg
          aria-hidden="true"
          height="16"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          data-view-component="true"
          className="issue-icon v-align-middle"
        >
          <path
            fillRule="evenodd"
            d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
          ></path>
        </svg>
      )}
    </span>
  );
};

const ListIssues = () => {
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const filters = useSelector((state) => state.filter);
  const [issues, setIssues] = useState();
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState();
  const perPage = 10;

  const handleLabelsChange = (event) => {
    event.persist();
    setPage(0);

    if (!filters.labels.includes(event.target.value)) {
      dispatch(
        filterActions.filterByLabel([...filters.labels, event.target.value])
      );
    } else {
      const oldLabels = [...filters.labels];
      const newLabels = oldLabels.filter(
        (label) => label !== event.target.value
      );

      dispatch(filterActions.filterByLabel(newLabels));
    }
  };

  const handleStateChange = (event) => {
    event.persist();
    setPage(0);

    dispatch(filterActions.filterByState(event.target.value));
  };

  const handleSortChange = (event, direction) => {
    event.persist();
    setPage(0);

    dispatch(
      filterActions.changeSort({
        sort: event.target.value,
        direction: direction,
      })
    );
  };

  const handlePageClick = (data) => {
    let selected = data.selected;

    setPage(selected);
  };

  const getIssues = useCallback(
    async (data) => {
      const newFilters = { ...filters, labels: filters.labels.join() };
      const queryString = new URLSearchParams(newFilters).toString();
      const url = `https://api.github.com/repos/reactjs/reactjs.org/issues?${queryString}&page=${
        page + 1
      }&per_page=${perPage}`;
      const method = "GET";

      try {
        const response = await axios({ method, url, data });

        if (isMountedRef.current) {
          setIssues(response.data);
          setPageCount(getTotalPages(response.headers));
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    },
    [isMountedRef, filters, page]
  );

  useEffect(() => {
    getIssues();
  }, [getIssues, filters]);

  if (!issues) {
    return <p className="no-result">Carregando...</p>;
  }

  return (
    <>
      <div className="box border-rd">
        <div className="box-header">
          <div className="box-l">
            <CheckFilter
              onChange={handleStateChange}
              value="open"
              id="open"
              type="radio"
              name="state"
            />
            <label htmlFor="open">
              <svg
                className="issue-icon mr2"
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
              Abertos
            </label>
            <CheckFilter
              onChange={handleStateChange}
              value="closed"
              id="closed"
              type="radio"
              name="state"
            />
            <label htmlFor="closed">
              <svg
                aria-hidden="true"
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                data-view-component="true"
                className="issue-icon mr2"
              >
                <path
                  fillRule="evenodd"
                  d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                ></path>
              </svg>
              Fechados
            </label>
          </div>
          <div className="box-r">
            <details className="details-overlay">
              <summary>Labels</summary>
              <div className="label-dd-wrapper border-rd">
                {labelsOptions.map((option, i) => (
                  <div key={option.label} className="label-row">
                    <CheckIcon
                      checked={filters.labels.includes(option.label)}
                    />
                    <span
                      className="colorLabel"
                      style={{ backgroundColor: option.color }}
                    ></span>
                    <input
                      id={`label${i}`}
                      type="checkbox"
                      name="label"
                      onChange={handleLabelsChange}
                      value={option.label}
                    />
                    <label htmlFor={`label${i}`}>{option.label}</label>
                  </div>
                ))}
              </div>
            </details>
            <details className="details-overlay">
              <summary>Ordenação</summary>
              <div className="sort-dd-wrapper border-rd">
                {sortOptions.map((option, i) => (
                  <div key={option.value + i} className="sort-row">
                    <CheckIcon
                      checked={
                        filters.sort.includes(option.value) &&
                        filters.direction.includes(option.direction)
                      }
                    />
                    <CheckSort
                      onChange={(e) => handleSortChange(e, option.direction)}
                      value={option.value}
                      id={`radio${i}`}
                      type="radio"
                      name="sort"
                      checked={
                        filters.sort.includes(option.value) &&
                        filters.direction.includes(option.direction)
                      }
                    />
                    <label htmlFor={`radio${i}`}>{option.label}</label>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
        {issues.length ? (
          issues.map((issue) => <RowIssue issue={issue} />)
        ) : (
          <p className="no-result">Nenhum resultado encontrado</p>
        )}
      </div>
      {!!(issues.length && pageCount > 1) && (
        <div className="pagination-container">
          <ReactPaginate
            forcePage={page}
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      )}
    </>
  );
};

export default ListIssues;
