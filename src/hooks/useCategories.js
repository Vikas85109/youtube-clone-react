import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/videoApi';

// Query keys
export const categoryKeys = {
  all: ['categories'],
};

// Get all categories
export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60, // 1 hour - categories don't change often
  });
};
