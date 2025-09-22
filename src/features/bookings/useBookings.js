import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useUrl } from '../../hooks/useUrl';
import { PAGE_SIZE } from '../../utils/consts';

export function useBookings() {
  const queryClient = useQueryClient();
  const { getUrlQuery } = useUrl();

  // FILTER
  const filterValue = getUrlQuery('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };
  // :  { field: 'status', value: filterValue, method: 'eq' };
  // : { field: 'totalPrice', value: 4000, method: 'gte' };

  // SORTBY

  const sortByRaw = getUrlQuery('sortBy') || 'startDate-desc';

  const [field, direction] = sortByRaw.split('-');

  const sortBy = { field, direction };

  // PAGINATION

  const page = !getUrlQuery('page') ? 1 : +getUrlQuery('page');

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, error, count };
}
