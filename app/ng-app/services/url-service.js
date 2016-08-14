/**
 * Creates the service
 * @constructor
 *
 * @param {any} $http HTTP service
 */
function UrlService($http) {
    const
        DB_NAME = 'hurler_v1',
        INDEXED_DB = 'indexedDB',
        READ_ONLY = 'readonly',
        READ_WRITE = 'readwrite',
        URLS_OBJECT_STORE = 'urls';

    this._database = null;
    this._idbSupport = false;
    this._repository = {};

    if (INDEXED_DB in window) {
        this._idbSupport = true;
    }
    if (this._idbSupport) {
        var openRequest = indexedDB.open(DB_NAME, 1);

        openRequest.onupgradeneeded = (event) => {
            var thisDB = event.target.result;
            if (!thisDB.objectStoreNames.contains(URLS_OBJECT_STORE)) {
                thisDB.createObjectStore(URLS_OBJECT_STORE,
                    {
                        'keyPath': 'url'
                    });
            }
        };
        openRequest.onsuccess = (event) => {
            this._database = event.target.result;
        };
        openRequest.onerror = (event) => {
            console.dir(e);
        };
    }

    var retVal = Object.defineProperties(this, {
        'database': {
            'get': () => {
                return this._database;
            }
        },
        'all': {
            'value': (callback) => {
                var items = [];
                var transaction = this._database.transaction([URLS_OBJECT_STORE], READ_ONLY);
                var objectStore = transaction.objectStore(URLS_OBJECT_STORE);
                var ob = objectStore.get(query);
                ob.onsuccess = function (event) {
                    if (cursor) {
                        items.push(cursor.value);

                        return cursor.continue();
                    }

                    return callback(null, items);
                };
            }
        },
        'query': {
            'value': (id, callback) => {
                var transaction = this._database.transaction([URLS_OBJECT_STORE], READ_ONLY);
                var objectStore = transaction.objectStore(URLS_OBJECT_STORE);
                var ob = objectStore.get(id);
                ob.onsuccess = (event) => {
                    var result = event.target.result;
                    callback(null, result);
                };
            }
        },
        'add': {
            'value': (url, callback) => {
                var request = db.transaction([URLS_OBJECT_STORE], READ_WRITE)
                    .objectStore(URLS_OBJECT_STORE)
                    .add(url);
                request.onsuccess = (event) => {
                    callback(null, url);
                };
                request.onerror = (event) => {
                    callback(event.error, null);
                };
            }
        },
        'update': {
            'value': (url, callback) => {
                var request = db.transaction([URLS_OBJECT_STORE], READ_WRITE)
                    .objectStore(URLS_OBJECT_STORE)
                    .update(url);
                request.onsuccess = (event) => {
                    callback(null, url);
                };
                request.onerror = (event) => {
                    callback(event.error, null);
                };
            }
        },
        'remove': {
            'value': (url, callback) => {
                var request = db.transaction([URLS_OBJECT_STORE], READ_WRITE)
                    .objectStore(URLS_OBJECT_STORE)
                    .remove(url);
                request.onsuccess = (event) => {
                    callback(null, url);
                };
                request.onerror = (event) => {
                    callback(event.error, null);
                };
            }
        }
    });

    return retVal;
}

angular
    .module('app')
    .service('UrlService', UrlService);

UrlService.$inject = ['$http'];