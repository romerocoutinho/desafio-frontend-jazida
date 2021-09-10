import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useIsMountedRef from "../../hooks/useIsMountedRef";
import axios from "axios";
import ReactPaginate from "react-paginate";
import IssueItem from "./IssueItem";
import IssuesFilter from "./IssuesFilter";
import Card from "../../components/Card";

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

const Results = () => {
  const isMountedRef = useIsMountedRef();
  const filters = useSelector((state) => state.filter);

  const [issues, setIssues] = useState();
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState();
  const perPage = 10;

  const handlePageClick = (data) => {
    let selected = data.selected;

    setPage(selected);
  };

  const handleZeroPage = () => setPage(0);

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
      <Card>
        <IssuesFilter
          openLabel="Abertos"
          closedLabel="Fechados"
          tagLabel="Labels"
          orderingLabel="Ordenação"
          resetPage={handleZeroPage}
        />
        {issues.length ? (
          issues.map((issue) => <IssueItem key={issue.id} issue={issue} />)
        ) : (
          <p className="no-result">Nenhum resultado encontrado</p>
        )}
      </Card>

      {!!(issues.length && pageCount > 1) && (
        <ReactPaginate
          forcePage={page}
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      )}
    </>
  );
};

export default Results;
