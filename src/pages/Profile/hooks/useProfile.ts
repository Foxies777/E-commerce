import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { $user, getUserFx } from '../index';

export const useProfile = () => {
  const [user, loading] = useUnit([$user, getUserFx.pending]);

  useEffect(() => {
    getUserFx();
  }, []);

  return [user, loading] as const;
};