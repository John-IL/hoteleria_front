export const storeSections = async (sections) => {
  const request = indexedDB.open("zergdb");

  request.onerror = (event) => {
    console.error("Why didn't you allow my web app to use IndexedDB?!");
    console.log(event);
  };

  request.onsuccess = (event) => {
    console.log("onsuccess");
    const db = event.target.result;

    if (!db.objectStoreNames.contains("sections")) {
      const objectStore = db.createObjectStore("sections", {
        keyPath: "section_id",
      });
      objectStore.createIndex("section_id", "section_id", { unique: true });
    } else {
      const transaction = db.transaction("sections", "readwrite");
      const objectStore = transaction.objectStore("sections");
      sections.forEach((section) => {
        objectStore.add(section);
      });
    }

    db.close();
  };

  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    const objectStore = db.createObjectStore("sections", {
      keyPath: "section_id",
    });

    objectStore.createIndex("section_id", "section_id", { unique: true });
    // db.close();
  };
};
