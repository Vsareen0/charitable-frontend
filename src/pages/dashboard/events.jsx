import { useEffect, useState } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Ripple } from "@progress/kendo-react-ripple";
import { Notification } from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";
import { deleteEvent, getByUsername } from "../../_services/events";
import MiniCard from "../../components/MiniCard";
import image from "../../assets/random-1.svg";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [visibleDialog, setVisibleDialog] = useState(false);

  useEffect(() => {
    getByUsername()
      .then((res) => {
        if (res.status === 200) {
          const { events, message } = res.data;
          setMessage(message);
          setEvents(events);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const items = [
    { text: "Edit", icon: "pencil" },
    { text: "Delete", icon: "trash" },
  ];

  const handleItemClick = (e) => {
    setDeleteId(e);
    setVisibleDialog(true);
  };

  const handleDelete = () => {
    deleteEvent(deleteId)
      .then((res) => {
        setMessage(res.data.message);
        setSuccess(true);
        setVisibleDialog(false);
      })
      .catch((err) => {
        setError(true);
      });
  };

  return (
    <>
      <div className="container m-5 sm:m-10 w-11/12">
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
              {events.map((card, index) => {
                return (
                  <div key={index}>
                    <MiniCard
                      image={image}
                      data={card}
                      iconType={"cog"}
                      items={items}
                      handleItemClick={handleItemClick}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <hr />
        <div className="donated h-52 sm:h-96">
          <h2 className="font-semibold leading-6 text-xl mt-5 sm:m-5 sm:text-2xl">
            Contributions
            <span className="k-icon k-i-heart text-red-500"></span>
          </h2>
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
    </>
  );
};

export default Events;
