import React, { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState(null); // Initialise data à null
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const jsonData = await response.json();
          Array.isArray(jsonData) ? setData(jsonData) : setData([jsonData]);
          setIsLoading(false);
        } else {
          throw new Error("Erreur lors de la récupération des données");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setIsLoading(false);
      }
    };

    getData();
  }, [url]);

  return [data, setData, isLoading];
};

export default useFetchData;
