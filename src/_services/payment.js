import { authenticationService } from "./authentication.service";
import { api } from "./index";

export const getAllPayments = async () => {
  const { email } = authenticationService.currentUserValue;
  return await api.get("/payments", { params: { email } });
};
