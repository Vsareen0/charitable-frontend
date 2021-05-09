import { BehaviorSubject } from "rxjs";
import { authenticate } from "./user";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

function login(data) {
  // console.log(data);
  return (
    authenticate(data)
      // .then(handleResponse)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          const { user } = res.data;
          localStorage.setItem("currentUser", JSON.stringify(user));
          localStorage.setItem("token", res.data.token);
          currentUserSubject.next(user);
        } else {
          currentUserSubject.next(null);
        }
      })
  );
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
