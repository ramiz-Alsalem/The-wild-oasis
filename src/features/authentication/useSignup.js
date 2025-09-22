import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi({ email, password, fullName }),
    onSuccess: user => {
      toast.success(
        "Account successfully created, please verify the email account from the user's email address"
      );
    },
    onError: error => {
      toast.error('The provided email or password are incorrect');
    },
  });

  return { signup, isLoading };
}
