export const saveToLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to local storage:", error);
  }
};

export const loadFromLocalStorage = (key: string) => {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return null;
    return JSON.parse(storedValue);
  } catch (error) {
    console.error("Error loading from local storage:", error);
    return null;
  }
};
