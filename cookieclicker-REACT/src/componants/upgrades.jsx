import { useState, useEffect } from "react";
import afford from "../assets/cookiebtn.png";
import notafford from "../assets/redX.png";

function Upgrade(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://cookie-upgrade-api.vercel.app/api/upgrades"
      );
      const data = await response.json();
      setItems(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Items</h1>
      <ul className="upgradebox">
        {items.map((item) => (
          <li
            key={item.id}
            className="upgrade"
            onClick={() => props.upgradefunk(item)}
          >
            <p>{item.name}</p>
            <p>cost {item.cost}</p>
            <p>cps increase{item.increase}</p>
            {props.cookiecounter >= item.cost ? (
              <img src={afford} />
            ) : (
              <img src={notafford} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Upgrade;
