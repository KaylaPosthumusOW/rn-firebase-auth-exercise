import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy,
  where
} from "firebase/firestore";
import { db } from "../firebase";

// Define the structure of our objects
export interface ObjectItem {
  id?: string;
  title: string;
  description: string;
  category: string;
  createdAt: Date;
  userId?: string;
}

// Collection name
const COLLECTION_NAME = "objects";

// Add a new object to the collection
export const addObject = async (objectData: Omit<ObjectItem, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...objectData,
      createdAt: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

// Get all objects from the collection
export const getAllObjects = async (): Promise<ObjectItem[]> => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"))
    );
    const objects: ObjectItem[] = [];
    
    querySnapshot.forEach((doc) => {
      objects.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
      } as ObjectItem);
    });
    
    return objects;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};

// Get objects by user ID
export const getObjectsByUser = async (userId: string): Promise<ObjectItem[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const objects: ObjectItem[] = [];
    
    querySnapshot.forEach((doc) => {
      objects.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
      } as ObjectItem);
    });
    
    return objects;
  } catch (error) {
    console.error("Error getting user documents: ", error);
    throw error;
  }
};

// Update an object
export const updateObject = async (id: string, updates: Partial<ObjectItem>) => {
  try {
    const objectRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(objectRef, updates);
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

// Delete an object
export const deleteObject = async (id: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    console.log("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};

// Listen to real-time updates
export const listenToObjects = (callback: (objects: ObjectItem[]) => void) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
  
  return onSnapshot(q, (querySnapshot) => {
    const objects: ObjectItem[] = [];
    querySnapshot.forEach((doc) => {
      objects.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
      } as ObjectItem);
    });
    callback(objects);
  });
};