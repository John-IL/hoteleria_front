import navigationModules from "@/navigation/vertical/index"

const getNavigationByModule = (moduleId) => {
  const keys = Object.keys(navigationModules)
  if (!(moduleId === undefined)) {
    if (keys.includes(moduleId.toString())) {
      const navs = navigationModules[moduleId]
      return navs;
    //   callback()
    }else{
        return [];
    }
  }
}

export { getNavigationByModule }