import { useState } from "react";

export default function useForceUpdate() {
  let [value, setState] = useState(true);
  return () => setState(!value);
}
