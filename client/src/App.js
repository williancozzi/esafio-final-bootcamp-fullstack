import React from "react";
import axios from "axios";
import Select from "./components/Select";
import Records from "./components/Records";

const api = axios.create({ baseURL: "api" });

export default function App() {
  const [periodSelected, setPeriodSelected] = React.useState({});
  const [dates, setDates] = React.useState([]);
  const [period, setPeriod] = React.useState(null);
  const [actualDate, setActualDate] = React.useState("");

  React.useEffect(() => {
    const fetchDatesForSelect = async () => {
      const { data } = await api.get("/transaction/dates");

      setDates(data);
    };

    const fetchPeriodSelected = async () => {
      const actualDate = new Date().toISOString().slice(0, 7);
      const { data } = await api.get(
        `/transaction/byperiod/${period ? period : actualDate}`
      );

      setActualDate(actualDate);
      setPeriodSelected(data);
    };

    fetchPeriodSelected();
    fetchDatesForSelect();
  }, [period, actualDate]);

  const handleDateSelect = (period) => {
    setPeriod(period);
  };

  return (
    <div>
      <div className="container">
        <h1 className="center">Desafio Final do Bootcamp Full Stack</h1>
        <Select
          initialValue={actualDate}
          dates={dates}
          onChangeSelect={handleDateSelect}
        />
      </div>

      <div>
        <Records header={periodSelected} />
      </div>
    </div>
  );
}
