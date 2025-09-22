import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

import { useCabins } from './useCabins';
import { useUrl } from '../../hooks/useUrl';
import Empty from '../../ui/Empty';

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const { getUrlQuery } = useUrl();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  // 1. FILTER
  const filterValue = getUrlQuery('discount') || 'all';

  const filteredCabins =
    filterValue === 'all'
      ? cabins
      : filterValue === 'with-discount'
      ? cabins.filter(cabin => cabin.discount > 0)
      : cabins.filter(cabin => cabin.discount === 0);

  // 2. SORT

  const sortBy = getUrlQuery('sortBy') || 'regularPrice-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  /*
  const sortedCabins =
    direction === 'asc'
      ? filteredCabins.sort((a, b) => a[field] - b[field])
      : filteredCabins.sort((a, b) => b[field] - a[field]);
  */

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
