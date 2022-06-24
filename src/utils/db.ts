import { db } from '../services';
import { collection, doc, deleteDoc, query, where, addDoc, getDocs, setDoc } from 'firebase/firestore';
import { AppError } from '../types';

/**
 * It creates a document in a collection
 * @param {string} collectionPath - The path to the collection you want to create a document in.
 * @param {T} documentData - The data you want to add to the document.
 * @returns A promise that resolves to a string. Or an error if is rejected.
 */
export const createDocument = async <T>(collectionPath: string, documentData: T): Promise<string | AppError> => {
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
 * @returns An array of objects. Or an error.
 */
export const getDocuments = async (collectionPath: string): Promise<object[] | AppError> => {
  try {
    const data: object[] = [];
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

/**
 * Get all documents from a collection where a field equals a value
 * @param {string} collectionPath - The path to the collection you want to query.
 * @param {string} documentField - The field in the document that you want to query by.
 * @param {string} fieldValue - The value of the field you want to query by.
 * @returns An array of objects.
 */
export const getDocumentsByField = async (
  collectionPath: string,
  documentField: string,
  fieldValue: string
): Promise<object[] | string> => {
  try {
    const data: object[] = [];
    const q = query(collection(db, collectionPath), where(documentField, '==', fieldValue));
    const querySnapshot = await getDocs(q);

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

/**
 * It takes a collection path, a document ID, and a new document data object, and then updates the
 * document with the new data
 * @param {string} collectionPath - The path to the collection you want to update the document in.
 * @param {string} documentId - The ID of the document to update.
 * @param {T} newDocumentData - This is the new data that you want to update the document with.
 * @returns A promise that resolves to a message string. Or an error if is rejected.
 */
export const updateDocument = async <T>(collectionPath: string, documentId: string, newDocumentData: T): Promise<string | AppError> => {
  try {
    const docRef = await doc(db, collectionPath, documentId);

    await setDoc(docRef, newDocumentData, { merge: true });

    return Promise.resolve(`Document ${documentId} updated successfully.`);
  } catch (error) {
    return Promise.reject(`Error updating document: ${error}`);
  }
};

/**
 * It takes a collection path and a document ID as arguments, and returns a promise that resolves to a
 * string
 * @param {string} collectionPath - The path to the collection you want to delete the document from.
 * @param {string} documentId - The ID of the document to delete.
 * @returns A promise that resolves to a string. Or an error if is rejected.
 */
export const deleteDocument = async (collectionPath: string, documentId: string): Promise<string | AppError> => {
  try {
    const docRef = await doc(db, collectionPath, documentId);

    await deleteDoc(docRef);

    return Promise.resolve(`Document ${documentId} deleted successfully.`);
  } catch (error) {
    return Promise.reject(`Error deleting document: ${error}`);
  }
};
