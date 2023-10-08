import useJwt from "@/auth/jwt/useJwt";

/**
 * Return if user is logged in
 * This is completely up to you and how you want to store the token in your frontend application
 * e.g. If you are using cookies to store the application please update this function
 */
// eslint-disable-next-line arrow-body-style
export const isUserLoggedIn = () => {
  return (
    localStorage.getItem("userData") &&
    localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
  );
};

export const getUserData = () => JSON.parse(localStorage.getItem("userData"));

export const getUserModules = () => {
  return true;
  // return new Promise((resolve, reject) => {
  //   const request = indexedDB.open("zergdb");
  //   let db = null;

  //   request.onerror = (event) => {
  //     console.error("Why didn't you allow my web app to use IndexedDB?!");
  //   };

  //   request.onsuccess = (event) => {
  //     db = event.target.result;
  //     // si el usuario es malcriado y borra la bd de indexeddb
  //     if (
  //       db.objectStoreNames.length === 0 ||
  //       !db.objectStoreNames.contains("modules")
  //     ) {
  //       indexedDB.deleteDatabase("zergdb");
  //       localStorage.clear();
  //       resolve(false);
  //     } else {
  //       const objectStore = db.transaction("modules").objectStore("modules");

  //       objectStore.getAll().onsuccess = (event) => {
  //         const modules = event.target.result;
  //         modules.push({ id_module: 0, name: "Menu" });
  //         const userModules = modules.map((module) => module.id_module);
  //         resolve(userModules);
  //       };
  //     }
  //   };
  // });
};

export const getUserToken = () => localStorage.getItem("accessToken");

/**
 * This function is used for demo purpose route navigation
 * In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 * Please note role field is just for showing purpose it's not used by anything in frontend
 * We are checking role just for ease
 * NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole) => {
  // if (typeof userRole === "object" && userRole !== null) {
  //   if (userRole.route) {
  //     return userRole.route;
  //   } else if (userRole.module) {
  //     return `/${userRole.module}`;
  //   }
  // }
  return "panel";

  // if (userRole === 'admin') return '/'
  // if (userRole === 'client') return { name: 'access-control' }
  // return { name: 'auth-login' }
};
