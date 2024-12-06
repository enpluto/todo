const baseUrl = "https://todolist-api.hexschool.io";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const fetchTodos = async (token: string) => {
  try {
    const response = await fetch(`${baseUrl}/todos`, {
      method: "GET",
      headers: {
        ...headers,
        Authorization: token,
      },
    });
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
};
