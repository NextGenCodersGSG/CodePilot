import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/localStorageUtils";

export function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [data, setData] = useState<T>(initialValue);

  useEffect(() => {
    const stored = getFromLocalStorage<T>(key, initialValue);
    setData(stored);
  }, [key]);

  useEffect(() => {
    setToLocalStorage(key, data);
  }, [data, key]);

  return [data, setData];
}
