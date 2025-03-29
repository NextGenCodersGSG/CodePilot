export function getFromLocalStorage<T>(key: string, initialValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error("Error reading localStorage:", error);
    return initialValue;
  }
}

export function setToLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error storing value for key:", key, e);
  }
}
