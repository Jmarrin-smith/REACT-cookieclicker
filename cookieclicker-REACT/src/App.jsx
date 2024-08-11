import { useState, useEffect } from "react";
import "./App.css";
import Upgrade from "./componants/upgrades";
import clicker from "./assets/cookie.png";

function App() {
  const [cookiecounter, setcookiecounter] = useState(
    JSON.parse(localStorage.getItem("cookiecounter")) || 0
  );
  const [cps, setcps] = useState(JSON.parse(localStorage.getItem("cps")) || 1);
  const [clickpower, setclickpower] = useState(
    JSON.parse(localStorage.getItem("clickpower")) || 1
  );

  useEffect(() => {
    localStorage.setItem("cookiecounter", JSON.stringify(cookiecounter));
    localStorage.setItem("cps", JSON.stringify(cps));
    localStorage.setItem("clickpower", JSON.stringify(clickpower));
  }, [cookiecounter, cps, clickpower]);

  useEffect(
    function () {
      const countinterval = setInterval(function () {
        setcookiecounter((curr) => curr + cps);
      }, 1000);

      return () => clearInterval(countinterval);
    },
    [cps]
  );

  function clickbutton() {
    setcookiecounter((curr) => curr + clickpower);
  }

  function upgradefunk(item) {
    const cost = JSON.parse(item.cost);
    const increase = JSON.parse(item.increase);
    if (cost <= cookiecounter) {
      setcookiecounter((curr) => curr - cost);
      setcps((curr) => curr + increase);
    }
  }

  return (
    <>
      <h1>cookie-clicker DEV</h1>
      <img src={clicker} onClick={clickbutton} alt="cookieclicker" />
      <h1>{cookiecounter}</h1>
      <h3>{cps}cps</h3>
      <Upgrade upgradefunk={upgradefunk} cookiecounter={cookiecounter} />
    </>
  );
}

export default App;
