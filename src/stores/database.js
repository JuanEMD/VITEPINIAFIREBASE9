import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { auth, db } from "../firebaseConfig";
import router from "../router";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    documents: [],
    loadingDoc: false,
  }),
  actions: {
    async obtenerUrls() {
      if (this.documents.length !== 0) {
        return;
      }
      this.loadingDoc = true;
      try {
        const q = query(
          collection(db, "urls"),
          where("user", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, doc.data())
          this.documents.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async AgregarUrl(name) {
      try {
        const objetoDoc = {
          name: name,
          short: nanoid(6),
          user: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "urls"), objetoDoc);
        // console.log(docRef.id)
        this.documents.push({
          ...objetoDoc,
          id: docRef.id,
        });
        console.log(this.documents);
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
    async obtenerUrl(id) {
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("Documento no existe");
        }

        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("Documento no e tuyo");
        }

        return docSnap.data().name;
      } catch (error) {
        console.log(error.message);
      } finally {
      }
    },
    async actualizarUrl(id, name) {
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("Documento no existe");
        }

        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("Documento no e tuyo");
        }

        await updateDoc(docRef, {
          name: name,
        });
        this.documents = this.documents.map((item) =>
          item.id === id ? { ...item, name: name } : item
        );
        router.push("/");
      } catch (error) {
        console.log(error.message);
      }
    },
    async borrarUrl(id) {
      try {
        const docRef = doc(db, "urls", id);

        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("Documento no existe");
        }

        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("Documento no e tuyo");
        }

        await deleteDoc(docRef);
        this.documents = this.documents.filter((item) => item.id !== id);
      } catch (error) {
        console.log(error.message);
      } finally {
      }
    },
  },
});
