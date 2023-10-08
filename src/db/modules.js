export const storeModules = async (modules) => {
  const request = indexedDB.open("zergdb");

  request.onerror = (event) => {
    console.error("Why didn't you allow my web app to use IndexedDB?!");
    console.log(event);
  };

  request.onsuccess = (event) => {
    const db = event.target.result;

    const transaction = db.transaction("modules", "readwrite");
    const objectStore = transaction.objectStore("modules");

    modules.forEach((module) => {
      objectStore.add(module);
    });
    db.close();
  };

  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    const objectStore = db.createObjectStore("modules", {
      keyPath: "id_module",
    });

    objectStore.createIndex("id_module", "id_module", { unique: true });
    // db.close();
  };
};
