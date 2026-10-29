import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { app } from "../config/firebase";

const db = getFirestore(app);

const WATCHLISTS_COLLECTION = "watchlists";

function useWatchlistFirebase(user) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user?.uid) {
      return;
    }

    // 1. create a reference to the watchlists collection
    const watchlistsRef = collection(db, WATCHLISTS_COLLECTION);
    const q = query(watchlistsRef, where("userId", "==", user.uid));

    // 2. get the documents that match the query
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setItems(
        results.map((result) => ({
          ...result,
        })),
      );
    });

    return () => unsubscribe();
  }, [user?.uid]);

  return items;
}

export default useWatchlistFirebase;
