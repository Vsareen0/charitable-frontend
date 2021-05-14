import React, { useEffect, useState } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Ripple } from "@progress/kendo-react-ripple";
import { Notification } from "@progress/kendo-react-notification";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Fade } from "@progress/kendo-react-animation";
import { ListView } from "@progress/kendo-react-listview";
import { Pager } from "@progress/kendo-react-data-tools";
import { deleteEvent, getByUsername } from "../../_services/events";
import MiniCard from "../../components/MiniCard";
import { getAllPayments } from "../../_services/payment";
import dayjs from "dayjs";
import NoDataImg from "../../assets/no_data.svg";

class ReceiptCell extends React.Component {
  render() {
    const { field, dataItem } = this.props;

    return (
      <td>
        <a href={dataItem[field]} target="_blank" rel="noreferrer">
          <u className="text-blue-500">{"View Receipt"} </u>
        </a>
      </td>
    );
  }
}

class DateCell extends React.Component {
  render() {
    const { field, dataItem } = this.props;
    return <td>{dayjs.unix(dataItem[field]).format("DD-MM-YYYY")}</td>;
  }
}
const Events = () => {
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(3);
  const [events, setEvents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [visibleDialog, setVisibleDialog] = useState(false);

  useEffect(() => {
    getByUsername()
      .then((res) => {
        if (res.status === 200) {
          const { events } = res.data;
          setEvents(events);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getAllPayments()
      .then((res) => {
        if (res.status === 200) {
          const { payments } = res.data;
          setPayments(payments);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const items = [
    { text: "Edit", icon: "pencil" },
    { text: "Delete", icon: "trash" },
  ];

  const handleItemClick = (e, _id) => {
    if (e.item.text.toLowerCase() == "edit") {
      console.log(e.item.text.toLowerCase(), " ", _id);
    }
    if (e.item.text.toLowerCase() === "delete") {
      setDeleteId(_id);
      setVisibleDialog(true);
    }
  };

  const handlePageChange = (e) => {
    setSkip(e.skip);
    setTake(e.take);
  };

  const handleDelete = () => {
    deleteEvent(deleteId)
      .then((res) => {
        if (res.status === 202) {
          let newEvents = events.filter((event) => event._id !== deleteId);
          setEvents(newEvents);
          setSuccess(true);
          setVisibleDialog(false);
        }
      })
      .catch((err) => {
        setError(true);
      });
  };

  const MiniCardItem = (props) => (
    <MiniCard
      {...props}
      iconType={"cog"}
      items={items}
      handleItemClick={handleItemClick}
    />
  );

  const createFundraiser = (
    <div className="w-full flex justify-center items-center flex-col">
      <img src={NoDataImg} alt="Process Charitable" className="w-14 sm:w-16" />
      <span className="text-gray-600 italic mt-4 text-xs sm:text-base">
        We guess you have not found a cause to start something for.
      </span>
    </div>
  );

  return (
    <>
      <div className="container m-5 sm:m-10 sm:mt-0 w-11/12">
        <Fade enter={true} exit={true}>
          {error && (
            <Notification
              type={{ style: "error", icon: true }}
              closable={true}
              onClose={() => setError(false)}
            >
              <span>Oops! Something went wrong ...</span>
            </Notification>
          )}
          {success && (
            <Notification
              type={{ style: "success", icon: true }}
              closable={true}
              onClose={() => setSuccess(false)}
            >
              <span>Success !</span>
            </Notification>
          )}
        </Fade>
        <div className="text-right sm:mt-5">
          <Ripple>
            <button
              className="text-blueGray-700 hover:bg-gray-200 p-2 rounded-md
              text-xs sm:font-bold sm:text-sm"
            >
              <span className="k-icon k-i-plus"></span> Create Fundraiser{" "}
            </button>
          </Ripple>
        </div>
        <hr className="mt-5" />
        <div className="created h-52 sm:h-72">
          <h2 className="font-semibold leading-6 mt-5 text-xl sm:m-5 sm:text-2xl">
            Created By you{" "}
          </h2>
          <div className="mt-12 w-full flex justify-center ">
            <div className="flex flex-wrap w-full">
              {events.length == 0 && createFundraiser}
              {events.length > 0 && (
                <>
                  <ListView
                    data={events.slice(skip, skip + take)}
                    item={MiniCardItem}
                    style={{ border: "none", background: "none" }}
                  />
                  <Pager
                    skip={skip}
                    take={take}
                    onPageChange={handlePageChange}
                    total={events.length}
                    style={{ border: "none", background: "none" }}
                    className="w-full"
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <hr />
        <div className="donated h-52 sm:h-96">
          <h2 className="font-semibold leading-6 text-xl mt-5 sm:m-5 sm:text-2xl">
            Contributions
            <span className="k-icon k-i-heart text-red-500"></span>
          </h2>
          <div className="mt-12 w-full flex justify-center ">
            <div className="flex flex-wrap w-full">
              <Grid style={{ height: "300px" }} pageable={true} data={payments}>
                <GridColumn field="description" title="Description" />
                <GridColumn field="status" title="Status" />
                <GridColumn field="amount" title="Amount" />
                <GridColumn
                  field="receipt_url"
                  title="Receipt"
                  cell={ReceiptCell}
                />
                <GridColumn
                  field="linux_added_on"
                  title="Date"
                  cell={DateCell}
                />
              </Grid>
            </div>
          </div>
        </div>
        {visibleDialog && (
          <Dialog
            title={"Please confirm"}
            onClose={() => setVisibleDialog(false)}
          >
            <p style={{ margin: "25px", textAlign: "center" }}>
              Are you sure you want to continue?
            </p>
            <DialogActionsBar>
              <button
                className="p-2 rounded-md hover:bg-gray-200 bg-gray-100 text-black flex flex-1 justify-center"
                onClick={() => setVisibleDialog(false)}
              >
                No
              </button>
              <button
                className="p-2 rounded-md hover:bg-gray-200 bg-gray-100 text-black flex flex-1 justify-center"
                onClick={handleDelete}
              >
                Yes
              </button>
            </DialogActionsBar>
          </Dialog>
        )}
      </div>
      <style>{`
        .k-listview-content {
          display: flex; 
        }
      `}</style>
    </>
  );
};

export default Events;
