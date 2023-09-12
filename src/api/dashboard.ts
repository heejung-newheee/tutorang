import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PENDING_TUTOR_REGISTRATION_DASHBOARD_QUERY_KEY, PENDING_TUTOR_REGISTRATION_TABLE } from '../constants/query.constant';
import supabase from '../supabase';

export const getTutorApplyInfo = async () => {
  const { data, error } = await supabase.from(PENDING_TUTOR_REGISTRATION_TABLE).select(
    `*,
    profiles (  id, avatar_url, username)
    `,
  );

  if (error) throw error;
  return data;
};

export const getTutorDetailInfo = async (userId: string) => {
  const { data, error } = await supabase.from(PENDING_TUTOR_REGISTRATION_TABLE).select().eq('user_id', userId);

  if (error) throw error;
  return data;
};

export const changeStateTutorApply = async (state: string, id: number) => {
  const { data, error } = await supabase.from(PENDING_TUTOR_REGISTRATION_TABLE).update({ state: state }).eq('id', id);
  if (error) throw error;
  return data;
};

type changeStateTutorApplyPropsData = {
  state: string;
  id: number;
};
export const useChangeStateTutorApply = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((updateData: changeStateTutorApplyPropsData) => changeStateTutorApply(updateData.state, updateData.id), {
    onMutate: async (newData: changeStateTutorApplyPropsData) => {
      await queryClient.cancelQueries(PENDING_TUTOR_REGISTRATION_DASHBOARD_QUERY_KEY);

      const previousState = queryClient.getQueryData(PENDING_TUTOR_REGISTRATION_DASHBOARD_QUERY_KEY);

      queryClient.setQueryData(PENDING_TUTOR_REGISTRATION_DASHBOARD_QUERY_KEY, newData);

      return { previousState };
    },
    onError: (error, _, context) => {
      if (context?.previousState) {
        queryClient.setQueriesData(PENDING_TUTOR_REGISTRATION_DASHBOARD_QUERY_KEY, context.previousState);
      }

      throw error;
    },

    onSettled: () => {
      queryClient.invalidateQueries(PENDING_TUTOR_REGISTRATION_DASHBOARD_QUERY_KEY);
    },
  });

  return mutate;
};
