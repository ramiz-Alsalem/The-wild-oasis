import { useSearchParams } from 'react-router-dom';

export function useUrl() {
  const [searchParams, setSearchParams] = useSearchParams();

  function getUrlQuery(fieldName) {
    return searchParams.get(fieldName);
  }

  function updateUrlQuery(fieldName, value) {
    searchParams.set(fieldName, value);
    setSearchParams(searchParams);
  }

  return {
    getUrlQuery,
    updateUrlQuery,
  };
}
