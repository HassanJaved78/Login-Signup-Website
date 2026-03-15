import { getDB } from "../config.js/db.js";

export function getUsersCollection() {
    const db = getDB();
    return db.collection('users');
}