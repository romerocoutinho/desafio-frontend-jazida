import ListIssues from "./components/ListIssues";
import "./assets/css/main.css";

function App() {
  // fetch("https://api.github.com/repos/reactjs/reactjs.org/issues")
  //   .then(() => console.log("Deu certo"))
  //   .catch(() => console.log("Deu erri"))
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
          <g id="Layer_2" data-name="Layer 2">
            <g id="assinaturas">
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
      <main>
        <div className="info border-rd mb4">
          <h4 className="mb4">
            Prezado cliente, Seja bem vindo a lista de issues do Jazida
          </h4>
          <p>
            Acreditamos que transparência é e sempre será a melhor forma de
            lidar com problemas. Por isso, disponibilizamos esse canal para
            acompanhamento detalhado do andamento de nossas issues.
          </p>
        </div>
        <ListIssues />
      </main>
    </>
  );
}

export default App;
