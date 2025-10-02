"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const apiUrl = process.env.REACT_APP_API_URL;
async function getUsers() {
    const res = await fetch(`${apiUrl}/api/users`);
    return res.json();
}
exports.getUsers = getUsers;
