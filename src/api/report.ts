import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../supabase';
import { REPORT_DASHBOARD_QUERY_KEY } from '../constants/query.constant';

export const reportList = async () => {
  const { data, error } = await supabase.from('report').select(
    `*,
    profiles (id, avatar_url, username)
    `,
  );

  if (error) throw error;
  return data;
};

export const reportTutor = async (id: number) => {
  const { data, error } = await supabase
    .from('report')
    .select(
      `*,
  profiles (id, avatar_url, username)
  `,
    )
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

export const changeStateTutorReport = async (state: string, id: number) => {
  const { data, error } = await supabase.from('report').update({ state: state }).eq('id', id);
  if (error) throw error;
  return data;
};

type changeStateTutorReportPropsData = {
  state: string;
  id: number;
};
export const useChangeStateTutorReport = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((updateData: changeStateTutorReportPropsData) => changeStateTutorReport(updateData.state, updateData.id), {
    onMutate: async (newData: changeStateTutorReportPropsData) => {
      await queryClient.cancelQueries(REPORT_DASHBOARD_QUERY_KEY);

      const previousState = queryClient.getQueryData(REPORT_DASHBOARD_QUERY_KEY);

      queryClient.setQueryData(REPORT_DASHBOARD_QUERY_KEY, newData);

      return { previousState };
    },
    onError: (error, _, context) => {
      if (context?.previousState) {
        queryClient.setQueriesData(REPORT_DASHBOARD_QUERY_KEY, context.previousState);
      }

      throw error;
    },

    onSettled: () => {
      queryClient.invalidateQueries(REPORT_DASHBOARD_QUERY_KEY);
    },
  });

  return mutate;
};
