import {
  addDoc,
  collection,
  serverTimestamp,
  getFirestore,
  where,
  query,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { app } from "../config/firebase";

const db = getFirestore(app);

const WATCHLISTS_COLLECTION = "watchlists";

export async function addToWatchlist(user, movie) {
  await addDoc(collection(db, WATCHLISTS_COLLECTION), {
    userId: user.uid,
    movieId: movie.id,
    title: movie.title,
    posterPath: movie.imgPoster,
    genre: movie.genre,
    rating: movie.rating,
    year: movie.year,
    addedAt: serverTimestamp(),
  });
}

export async function removeFromWatchlist(user, movie) {
  try {
    // 1. create query to find match movie in watchlist
    const watchlistDocRef = collection(db, WATCHLISTS_COLLECTION);
    const q = query(
      watchlistDocRef,
      where("userId", "==", user.uid),
      where("movieId", "==", movie.id),
    );

    // 2. execute query
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No such document!");
      return;
    }

    // 3. Loop through querySnapshot
    querySnapshot.forEach(async (document) => {
      const docRef = doc(db, WATCHLISTS_COLLECTION, document.id);
      console.log(docRef);
      await deleteDoc(docRef);
      console.log(`Document with ID ${document.id} successfully deleted!`);
    });
  } catch (error) {
    console.error(error);
  }
}
