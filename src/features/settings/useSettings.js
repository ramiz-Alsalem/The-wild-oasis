import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';

export function useSettings() {
  const {
    data: settings,
    error,
    isLoading,
  } = useQuery({
    queryFn: getSettings,
    queryKey: ['settings'],
  });

  return { settings, error, isLoading };
}
