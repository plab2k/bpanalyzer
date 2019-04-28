var app = app || {};
app.db = (function() {
  "use strict";
  let _instance, _transaction;
  return {
    instance: function() {
      return _instance;
    },
    init: function() {
      return new Promise(function(resolve, reject) {
        if (!("indexedDB" in window))
          return reject(new Error("indexedDB is not supported"));
        var o = indexedDB.open("logs");
        o.onerror = function(e) {
          console.error("Database error: " + e.target.errorCode);
          return reject(e.target.errorCode);
        };
        o.onsuccess = function(e) {
          _instance = e.target.result;
          return resolve(this._instance);
        };
        o.onupgradeneeded = function(e) {
          const o = e.target.result;
          o.objectStoreNames.contains("task") ||
            o
              .createObjectStore("task", {
                autoIncrement: !0
              })
              .createIndex("time", "time", {
                unique: !1
              });
        };
      });
    },
    setData: () => {
      const storeName = "task";
      const transaction = _instance.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      for (let index = 0; index < 10; index++) {
        store.add({
          time: 155617272800 + index,
          kind: 6,
          kindName: "taskCostSpent",
          task: index,
          source: "a70f20cc-77ac-4c3c-b600-0c6d7c1" + index,
          sourceName: "Менеджер по работе с клиентами",
          sum: 114.83
        });
      }
    },
    getData: name => {
      return new Promise((resolve, reject) => {
        const transaction = _instance.transaction(name);
        const loadrequest = transaction.objectStore(name).getAll();
        loadrequest.onerror = event => reject(event.target.error);
        loadrequest.onsuccess = event => {
          let result = event.target.result;
          transaction.close;
          resolve(result);
        };
      });
    },
    getTableNames: () => {
      //Filter service table names started at _
      return Array.from(_instance.objectStoreNames).filter(e => {
        return e[0] != "_";
      });
    },
    putData: (name, data) => {
      return new Promise((resolve, reject) => {
        /* if (app.db.getTableNames().indexOf(name) == -1) {
                    _instance.createObjectStore(name);
                } */
        //TODO remove harcoded storeName
        let objname = "task";
        const transaction = _instance.transaction(objname, "readwrite");
        const store = transaction.objectStore(objname);
        for (let i = 0; i < data.length; i++) {
          store.put(data[i]);
        }
        transaction.close;
        resolve(data.length);
      });
    }
  };
})();
