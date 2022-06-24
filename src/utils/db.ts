import { db } from '../services';
import { collection, addDoc } from 'firebase/firestore';

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

// TODO: Get all documents from collection

// TODO: Get document from collection

// TODO: Get document from collection by id

// TODO: Update document in collection by id

// TODO: Delete document from collection by id
