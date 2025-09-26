import { useLocationStore } from '../store/locationStore';

export const useLocation = () => {
  const store = useLocationStore();
  return store;
};