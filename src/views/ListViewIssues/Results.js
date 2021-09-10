import ReactPaginate from "react-paginate";
import IssueItem from "./IssueItem";
import IssuesFilter from "./IssuesFilter";
import Card from "../../components/Card";
import PropTypes from "prop-types";

const Results = ({
  issues,
  pageNumber,
  pageCount,
  onClickPage,
  resetPageNumber,
}) => {
  return (
    <>
      <Card>
        <IssuesFilter
          openLabel="Abertos"
          closedLabel="Fechados"
          tagLabel="Labels"
          orderingLabel="Ordenação"
          resetPage={resetPageNumber}
        />
        {issues.length ? (
          issues.map((issue) => <IssueItem key={issue.id} issue={issue} />)
        ) : (
          <p className="no-result">Nenhum resultado encontrado</p>
        )}
      </Card>

      {!!(issues.length && pageCount > 1) && (
        <ReactPaginate
          forcePage={pageNumber}
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={onClickPage}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      )}
    </>
  );
};

Results.propTypes = {
  issues: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
  pageCount: PropTypes.number,
  onClickPage: PropTypes.func.isRequired,
  resetPageNumber: PropTypes.func.isRequired,
};

export default Results;
