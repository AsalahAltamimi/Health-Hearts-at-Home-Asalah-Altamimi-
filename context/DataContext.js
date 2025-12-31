import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_PREFIX = "data_cache_";

const sectionToFile = {
  tutorials: () => require("../data/tutorials.json"),
  hospital: () => require("../data/hospital.json"),
  caregivers: () => require("../data/caregivers.json"),
  spiritual: () => require("../data/spiritual.json"),
  about_chd: () => require("../data/about_chd.json"),
  general_care: () => require("../data/general_care.json"),
  contacts: () => require("../data/contacts.json"),
};

export function useData(section) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const cacheKey = `${CACHE_PREFIX}${section}`;
        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (isMounted) setData(parsed);
        }
        const loader = sectionToFile[section];
        if (!loader) throw new Error(`Unknown section: ${section}`);
        const fresh = loader();
        if (isMounted) setData(fresh);
        await AsyncStorage.setItem(cacheKey, JSON.stringify(fresh));
      } catch (e) {
        if (isMounted) setError(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [section]);

  return { data, loading, error };
}



