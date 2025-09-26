import { useAlertStore } from '../store/alertStore';

export const useAlerts = () => {
  const store = useAlertStore();
  return store;
};