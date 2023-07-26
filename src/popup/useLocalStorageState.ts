import { useEffect, useState } from "react";

export const useLocalStorageState = (
  key: string,
  defaultValue?: string | (() => string)
) => {
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    const loadValue = async () => {
      const loadedValue = await chrome.storage.local.get(key);

      if (loadedValue[key]) {
        setValue(loadedValue[key]);
      }
      if (value && !loadedValue[key]) {
        await chrome.storage.local.set({ [key]: value });
      }
    };
    loadValue();
  }, []);

  const updateValue = async (newValue: string) => {
    await chrome.storage.local.set({ [key]: newValue });
    setValue(newValue);
  };

  return [value, updateValue] as const;
};
