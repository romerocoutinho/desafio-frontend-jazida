import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
import Results from "./Results";
import useIsMountedRef from "../../hooks/useIsMountedRef";
import axios from "axios";

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

const ListViewIssues = () => {
  const filters = useSelector((state) => state.filter);
  const isMountedRef = useIsMountedRef();
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
      <header>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 510.24 147.32"
          width="150px"
          height="40px"
        >
          <title>Jazida</title>
          <g id="Layer_2" data-name="Layer 2" color="#2BB673">
            <g id="assinaturas" fill="currentcolor">
              <path
                className="path-2"
                d="M117.55,21.82,69,123.71H82.08L91.93,103h53.51l9.25, 20.67h21.82L127.81,21.82Zm-17.42,64,19.4-40.7,18.56,40.7Z"
              ></path>
              <polygon
                className="path-2"
                points="258.23 32.74 258.23 21.82 176.91 21.82 176.91 32.74 233.06 32.74 169.97 116.87 173.01 123.71 257.45 123.71 257.43 112.8 197.87 112.83 258.23 32.74"
              ></polygon>
              <path
                className="path-2"
                d="M19.14,0V10.91H41V85.85C41,120.74,36.51,139,2.74,139L0,146.31c.32.12, 29.23,5.18,45-8.59C57.21,127,60.65,110.32,60.65,85.85V0Z"
              ></path>
              <path
                className="path-2"
                d="M451.27,21.82,402.71,123.71h13.09L425.66,103h53.51l9.25,20.67h21.82L461.53, 21.82Zm-17.42,64,19.4-40.7,18.56,40.7Z"
              ></path>
              <path
                className="path-2"
                d="M355.46,21.82H316.33V123.71h39.13c28.3,0,51.3-18.9,51.3-50.94C406.76, 44.62,392.51,21.82,355.46,21.82Zm0,91H335.22V32.74h20.23c20.84,0,29.45, 22.42,29.48,40S376.3,112.8,355.46,112.8Z"
              ></path>
              <polygon
                className="path-2"
                points="296.82 46.72 296.82 21.82 277.18 21.82 277.18 32.74 296.82 46.72"
              ></polygon>
              <polygon
                className="path-2"
                points="277.18 72.77 277.18 123.71 296.82 123.71 296.82 46.72 277.18 72.77"
              ></polygon>
            </g>
          </g>
        </svg>
      </header>
      <div className="container">
        <Card>
          <div className="info">
            <h4 className="mb4">
              Prezado cliente, Seja bem vindo a lista de issues do Jazida
            </h4>
            <p>
              Acreditamos que transpar??ncia ?? e sempre ser?? a melhor forma de
              lidar com problemas. Por isso, disponibilizamos esse canal para
              acompanhamento detalhado do andamento de nossas issues.
            </p>
          </div>
        </Card>
        <Results
          issues={issues}
          pageNumber={page}
          pageCount={pageCount}
          onClickPage={handlePageClick}
          resetPageNumber={handleZeroPage}
        />
      </div>
    </>
  );
};

export default ListViewIssues;
