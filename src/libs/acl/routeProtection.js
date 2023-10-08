export const canNavigate = (to, modules) =>
  to.matched.some((route) => {
    // if (!modules) {
    //   indexedDB.deleteDatabase("zergdb");
    //   localStorage.clear();
    //   return false;
    // }

    // let access = false;
    // access = modules.includes(route.meta.module);
    // return access;
    return true;
  });
