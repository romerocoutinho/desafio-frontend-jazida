import { useSelector, useDispatch } from "react-redux";
import { filterActions } from "../../store/index";
import PropTypes from "prop-types";
import styled from "styled-components";

const FilterStyle = styled.div`
  align-items: center;
  background-color: #f6f8fa;
  display: flex;
  flex-direction: row;
  font-size: 0.9rem;
  height: 60px;
  justify-content: space-between;

  input[type="radio"],
  .label-row input[type="checkbox"] {
    display: none;
  }

  .box-l:nth-child(2) {
    padding-left: 10px;
  }

  .box-l label {
    margin-left: 10px;
  }

  .box-r label {
    display: block;
  }

  .box-r details {
    position: relative;
    display: inline-block;
    margin-right: 10px;
  }

  .label-row {
    font-weight: 700;
  }

  .label-row,
  .sort-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 15px;
    font-size: 0.7rem;
    height: 40px;
  }

  .label-row label,
  .sort-row label {
    width: 100%;
  }

  .label-row:hover,
  .sort-row:hover {
    background-color: rgba(234, 238, 242, 0.5);
  }

  .label-row:nth-child(n),
  .sort-row:nth-child(-n + 2) {
    border-bottom: 1px solid #d0d7de;
  }

  .label-row span:first-child,
  .sort-row span:first-child {
    width: 20px;
    height: 16px;
  }

  .label-row span,
  .sort-row span {
    margin-right: 8px;
  }

  a,
  label,
  details {
    color: #57606a;
  }

  a:active,
  a:hover,
  label:hover,
  details:hover {
    color: #24292f;
  }

  details {
    cursor: pointer;
    display: inline-block;
  }

  label {
    cursor: pointer;
  }

  details > summary {
    list-style: none;
  }
  summary::-webkit-details-marker {
    display: none;
  }

  details[open] summary:after,
  summary::after {
    content: " ▼";
    font-size: 0.9rem;
    vertical-align: baseline;
  }

  details[open] .label-dd-wrapper {
    height: 300px;
    overflow-y: auto;
  }

  details[open] .label-dd-wrapper,
  details[open] .sort-dd-wrapper {
    animation: fade-in 0.5s forwards;
    position: absolute;
    top: 30px;
    right: 0;
    z-index: 99;
    display: flex;
    flex-direction: column;
    pointer-events: auto;
    background-color: #fff;
    width: 220px;
    border: 1px solid #d0d7de;
    border-radius: 5px;
  }

  .label-row .colorLabel {
    border: 1px solid rgba(27, 31, 36, 0.15);
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    width: 0.5rem;
    height: 0.5rem;
    margin-top: 1px;
    margin-right: 8px;
    flex-shrink: 0;
  }

  .details-overlay[open] > summary::before {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 80;
    display: block;
    cursor: default;
    content: " ";
    background: transparent;
  }

  @keyframes fade-in {
    0% {
      transform: translateY(-20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  svg {
    display: inline-block;
    fill: currentColor;
    overflow: visible !important;
    vertical-align: text-top;
  }

  @media (max-width: 26rem) {
    .box-r {
      display: none;
    }
  }
`;

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

const IssuesFilter = ({
  openLabel,
  closedLabel,
  tagLabel,
  orderingLabel,
  resetPage,
}) => {
  const filters = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleLabelsChange = (event) => {
    event.persist();
    resetPage();

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
    resetPage();

    dispatch(filterActions.filterByState(event.target.value));
  };

  const handleSortChange = (event, direction) => {
    event.persist();
    resetPage();

    dispatch(
      filterActions.changeSort({
        sort: event.target.value,
        direction: direction,
      })
    );
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
            className="v-align-middle"
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

  return (
    <FilterStyle>
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
            className="mr2"
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
          {openLabel}
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
            className="mr2"
          >
            <path
              fillRule="evenodd"
              d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
            ></path>
          </svg>
          {closedLabel}
        </label>
      </div>
      <div className="box-r">
        <details className="details-overlay">
          <summary>{tagLabel}</summary>
          <div className="label-dd-wrapper">
            {labelsOptions.map((option, i) => (
              <div key={option.label} className="label-row">
                <CheckIcon checked={filters.labels.includes(option.label)} />
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
          <summary>{orderingLabel}</summary>
          <div className="sort-dd-wrapper">
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
    </FilterStyle>
  );
};

IssuesFilter.propTypes = {
  openLabel: PropTypes.string,
  closedLabel: PropTypes.string,
  tagLabel: PropTypes.string,
  orderingLabel: PropTypes.string,
  resetPage: PropTypes.func.isRequired,
};

IssuesFilter.defaultProps = {
  openLabel: "Abertos",
  closedLabel: "Fechados",
  tagLabel: "Labels",
  orderingLabel: "Ordenação",
};

export default IssuesFilter;
