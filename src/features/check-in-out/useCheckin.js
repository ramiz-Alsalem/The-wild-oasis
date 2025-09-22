import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateBooking } from '../../services/apiBookings';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isCheckingIn, mutate: checkin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: ({ id: bookingId }) => {
      toast.success(`Booking #${bookingId} has been successfully checked in.`);
      queryClient.invalidateQueries({
        active: true,
      });
      navigate('/');
    },
    onError: () => {
      toast.error('There was an error while checking in.');
    },
  });

  return { isCheckingIn, checkin };
}
