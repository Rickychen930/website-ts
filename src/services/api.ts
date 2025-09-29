const apiUrl = process.env.REACT_APP_API_URL;

export async function getUsers() {
  const res = await fetch(`${apiUrl}/api/users`);
  return res.json();
}
