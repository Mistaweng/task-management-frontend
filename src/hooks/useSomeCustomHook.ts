import { useState } from "react";

export const useSomeCustomHook = () => {
  const [value, setValue] = useState<string>("");

  const updateValue = (newValue: string) => {
    setValue(newValue);
  };

  return { value, updateValue };
};
