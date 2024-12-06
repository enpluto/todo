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

export const createTodo = async (token: string, text: string) => {
  try {
    await fetch(`${baseUrl}/todos`, {
      method: "POST",
      headers: {
        ...headers,
        Authorization: token,
      },
      body: JSON.stringify({
        content: text,
      }),
    });
  } catch (error) {
    throw error;
  }
};
