import { useEffect, useState } from "react";
import { useDiagnosticStore } from "./store";

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const finish = () => setHydrated(true);
    if (useDiagnosticStore.persist.hasHydrated()) {
      finish();
      return;
    }
    const unsub = useDiagnosticStore.persist.onFinishHydration(finish);
    return unsub;
  }, []);
  return hydrated;
}
