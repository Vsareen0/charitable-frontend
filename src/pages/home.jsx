import { useState, useEffect } from "react";
import { ListView } from "@progress/kendo-react-listview";
import { Pager } from "@progress/kendo-react-data-tools";
import EventCard from "../components/Card";
import IntroSection from "../components/intro.jsx";
import { getEvents } from "../_services/events";

const Home = () => {
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(3);
  const [events, setEvents] = useState([]);
  const [totals, setTotals] = useState([]);

  useEffect(() => {
    getEvents()
      .then((res) => {
        if (res.status === 200) {
          let { events, totals } = res.data;
          setEvents(events);
          setTotals(totals);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handlePageChange = (e) => {
    setSkip(e.skip);
    setTake(e.take);
  };

  const EventCardItem = (props) => <EventCard {...props} totals={totals} />;

  return (
    <>
      <IntroSection />
      <hr />
      <div className="container p-5 sm:py-12 sm:px-5 bg-white text-center">
        <h1 className="text-3xl sm:text-4xl font-lighter ">
          Current <span className="text-charity underline">Events</span>
        </h1>
        <div className="mt-12 w-full flex justify-center ">
          <div className="flex flex-wrap justify-evenly w-full sm:w-8/12">
            {events.length > 0 && (
              <>
                <ListView
                  data={events.slice(skip, skip + take)}
                  item={EventCardItem}
                  style={{ border: "none", background: "none" }}
                />
                <Pager
                  skip={skip}
                  take={take}
                  onPageChange={handlePageChange}
                  total={events.length}
                  style={{ border: "none", background: "none" }}
                  className="w-full justify-center"
                />
              </>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .k-listview-content {
          display: flex; 
        }
        .k-label {
          display: none
        }
      `}</style>
    </>
  );
};

export default Home;
