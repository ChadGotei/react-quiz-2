const DB_NAME = "QuizAppDB";
const DB_VERSION = 2;
const STORE_NAME = "quizHistory";

// create or open db
const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
};

// post results
export const saveQuizResult = async (history, score, name) => {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    await store.add({
        id: Date.now(),
        name,
        history,
        score,
        timestamp: new Date().toISOString(),
    });

    // console.log("Saved quiz result successfully.");
};

// get results
export const getQuizResults = async () => {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => {
            // console.log("Fetched results:", request.result);
            resolve(request.result);
        };
        request.onerror = () => reject(request.error);
    });
};


// get results by id
export const getQuizResultById = async (id) => {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    return new Promise((resolve, reject) => {
        const request = store.get(Number(id));
        request.onsuccess = () => {
            resolve(request.result ? [request.result] : []);
        };
        request.onerror = () => reject(request.error);
    });
};

