import Select from './Select';
import { useUrl } from '../hooks/useUrl';

function SortBy({ options }) {
  const { getUrlQuery, updateUrlQuery } = useUrl();

  const sortBy = getUrlQuery('sortBy') || '';

  function handleChange(e) {
    updateUrlQuery('sortBy', e.target.value);
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
