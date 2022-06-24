import { db } from '../services';
import { collection, addDoc, getDocs } from 'firebase/firestore';

/**
 * It creates a document in a collection
 * @param {string} collectionPath - The path to the collection you want to create a document in.
 * @param {T} documentData - The data you want to add to the document.
 * @returns A promise that resolves to a string.
 */
export const createDocument = async <T>(collectionPath: string, documentData: T): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, collectionPath), documentData);
    return Promise.resolve(`Document ${docRef.id} created successfully.`);
  } catch (error) {
    return Promise.reject(`Error creating document: ${error}`);
  }
};

/**
 * It takes a collection path as an argument, and returns a promise that resolves to an array of
 * documents, or rejects with an error message
 * @param {string} collectionPath - The path to the collection you want to get documents from.
 * @returns An array of objects.
 */
export const getDocuments = async (collectionPath: string): Promise<unknown[] | string> => {
  try {
    const data: unknown[] = [];
    const querySnapshot = await getDocs(collection(db, collectionPath));

    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(`Error getting documents: ${error}`);
  }
};

// TODO: Get document from collection

// TODO: Get document from collection by id

// TODO: Update document in collection by id

// TODO: Delete document from collection by id
