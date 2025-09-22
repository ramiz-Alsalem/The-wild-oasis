import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateBooking } from '../../services/apiBookings';

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isPending: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: bookingId =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: ({ id: bookingId }) => {
      toast.success(`Booking #${bookingId} has been successfully checked out.`);
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: () => {
      toast.error('There was an error while checking out.');
    },
  });

  return { isCheckingOut, checkout };
}
