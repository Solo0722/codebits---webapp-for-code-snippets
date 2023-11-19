export const saveToLocalStorage = (key, value) => {
  const valueToString = JSON.stringify(value);

  try {
    localStorage.setItem(key, valueToString);
    return true;
  } catch (e) {
    return false;
  }
};

export const readFromLocalStorage = (key) => {
  const response = { data: null, error: null };
  try {
    const data = localStorage.getItem(key);
    response.data = JSON.parse(data);
    return response;
  } catch (error) {
    response.error = error;
    console.log("error with readFromLocalStorage", error);
    return response;
  }
};

export const clearFromLocalStorage = (key) => {
  const response = { data: null, error: null };
  try {
    localStorage.removeItem(key);
    response.data = "Success";
    return response;
  } catch (error) {
    response.error = error;
    console.log("error with readFromLocalStorage", error);
    return response;
  }
};
