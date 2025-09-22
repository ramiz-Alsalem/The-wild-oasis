import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditCabin } from '../../services/apiCabins';

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('New cabin successfully Edited.');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { updateCabin, isUpdating };
}
