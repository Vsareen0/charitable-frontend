import { BehaviorSubject } from "rxjs";
import { authenticate } from "./user";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);
const currentLocaleSubject = new BehaviorSubject(
  localStorage.getItem("locale")
);

export const authenticationService = {
  login,
  logout,
  onLocaleChange,
  currentUser: currentUserSubject.asObservable(),
  currentLocale: currentLocaleSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
  get currentLocaleValue() {
    return currentLocaleSubject.value;
  },
};

function onLocaleChange(data) {
  localStorage.setItem("locale", data);
  currentLocaleSubject.next(data);
}

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
