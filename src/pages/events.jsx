import * as React from "react";
import { useEffect, useState } from "react";
import { ListView } from "@progress/kendo-react-listview";
import {
  Filter,
  Operators,
  TextFilter,
  DateFilter,
} from "@progress/kendo-react-data-tools";
import { filterBy } from "@progress/kendo-data-query";
import { getEvents } from "../_services/events";
import { Loader } from "@progress/kendo-react-indicators";
import EventCard from "../components/Card";

const initialFilter = {
  logic: "and",
  filters: [],
};

const Donate = () => {
  const [data, setData] = useState([]);
  const [totals, setTotals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = React.useState(initialFilter);

  const onFilterChange = (event) => {
    setFilter(event.filter);
  };

  const EventCardItem = (props) => <EventCard {...props} totals={totals} />;

  useEffect(() => {
    setLoading(true);
    getEvents()
      .then((res) => {
        if (res.status === 200) {
          let { events, totals } = res.data;
          setData(events);
          setTotals(totals);
          setLoading(false);
        }
      })
      .catch((err) => setLoading(false));
  }, []);

  const scrollHandler = (event) => {
    const e = event.nativeEvent;
    if (
      e.target.scrollTop + 10 >=
      e.target.scrollHeight - e.target.clientHeight
    ) {
      const moreData = data.splice(0, 6);
      if (moreData.length > 0) {
        this.setState({ data: data.concat(moreData) });
      }
    }
  };

  return (
    <>
      {loading && (
        <div className="container w-full absolute z-40 h-screen flex justify-center items-center margin-auto backdrop-filter backdrop-grayscale backdrop-blur-sm backdrop-contrast-100 ">
          <Loader size="large" type="converging-spinner" />
        </div>
      )}
      <div className="m-10">
        <Filter
          value={filter}
          onChange={onFilterChange}
          className="filter-buttons"
          fields={[
            {
              name: "cause_name",
              label: "Title",
              filter: TextFilter,
              operators: Operators.text,
            },
            {
              name: "creator.name",
              label: "Created By",
              filter: TextFilter,
              operators: Operators.text,
            },
          ]}
        />
        <ListView
          onScroll={scrollHandler}
          data={filterBy(data, filter)}
          item={EventCardItem}
          pageable={true}
          style={{ width: "100%" }}
        />
      </div>
      <style>
        {`.k-listview-content {
            display: flex;
            flex-wrap: wrap;
        }
        .k-listview-content > * {
            margin: 20px;
        }
        .filter-buttons .k-button {
            background: #cfcfcf;
        }
       .filter-buttons .k-button.k-state-active {
            background-color: #ff545a;
       }
        `}
      </style>
    </>
  );
};

export default Donate;
