import { api } from "./index";
import { authenticationService } from "./authentication.service";

export const create = async (data) => {
  const { username } = authenticationService.currentUserValue;
  return await api.post("/events", { ...data }, { headers: { username } });
};

export const getByUsername = async () => {
  const { username } = authenticationService.currentUserValue;
  return await api.get("/events/findBy", {
    params: { creator: username },
  });
};

export const getEvents = async () => {
  return await api.get("/events");
};

export const deleteEvent = async (id) => {
  const token = localStorage.getItem("token") || null;
  return await api.delete("/events", {
    headers: {
      "x-auth-token": token,
    },
    data: {
      id,
    },
  });
};

export const checkout = async (data) => {
  const { email, _id } = authenticationService.currentUserValue;

  return await api.post(
    `/events/checkout-session`,
    {
      data,
    },
    {
      headers: { email, _id },
    }
  );
};
