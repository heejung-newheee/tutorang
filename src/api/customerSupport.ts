import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../supabase';

export type TypeNewInquery = {
  title: string;
  user_id: string;
  content: string;
  isReplied: boolean;
};

export const CUSTOMER_SUPPORT_TABLE = 'customer_support';
export const CUSTOMER_SUPPORT_QUERY_KEY = 'allCustomerSupport';

// export const getAllInquiry = async (id: string) => {
//   const { data, error } = await supabase.from(CUSTOMER_SUPPORT_TABLE).select(`*,user_id (profiles: id, username)`).eq('user_id', id).order('created_at', { ascending: false });

//   if (error) throw error;
//   return data;
// };
export const getAllInquiry = async (id: string) => {
  const { data, error } = await supabase.from(CUSTOMER_SUPPORT_TABLE).select(`*,profiles(inquiryUsername : username)`).eq('user_id', id).order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const insertNewInquiry = async (newInquiry: TypeNewInquery) => {
  const { error } = await supabase.from(CUSTOMER_SUPPORT_TABLE).insert(newInquiry);
  if (error) console.log(error);
};

export const deleteInquiry = async (inquiryId: string) => {
  const { error } = await supabase.from(CUSTOMER_SUPPORT_TABLE).delete().eq('id', inquiryId);
  if (error) console.log(error);
};

// [ ]  이거 밑으로 다 지울거임
export const useCreateInquiryMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(insertNewInquiry, {
    // onMutate: async (newInquiryData) => {
    //   await queryClient.cancelQueries([CUSTOMER_SUPPORT_QUERY_KEY]);

    //   const previousInquiry = queryClient.getQueriesData([CUSTOMER_SUPPORT_QUERY_KEY]);
    //   queryClient.setQueriesData([CUSTOMER_SUPPORT_QUERY_KEY], (old: any) => [...old, newInquiryData]);

    //   return { previousInquiry };
    // },

    // formData 들어가는 자리 => newInquiryData
    onMutate: async (newInquiryData) => {
      await queryClient.cancelQueries([CUSTOMER_SUPPORT_QUERY_KEY]);

      const previousInquiry = queryClient.getQueriesData([CUSTOMER_SUPPORT_QUERY_KEY]);
      queryClient.setQueriesData([CUSTOMER_SUPPORT_QUERY_KEY], [...previousInquiry, newInquiryData]);

      return { previousInquiry };
    },

    onError: (error, _, context) => {
      console.log(error);
      queryClient.setQueriesData([CUSTOMER_SUPPORT_QUERY_KEY], context?.previousInquiry);
    },

    onSettled: () => {
      queryClient.invalidateQueries([CUSTOMER_SUPPORT_QUERY_KEY]);
    },
  });

  return mutation;
};
// export const useDeleteInquiryMutation = () => {
//   const queryClient = useQueryClient();

//   const mutation = useMutation(deleteInquiry, {
//     onMutate: async (inquiryId) => {
//       await queryClient.cancelQueries([CUSTOMER_SUPPORT_QUERY_KEY]);

//       const previousInquiry = queryClient.getQueriesData([CUSTOMER_SUPPORT_QUERY_KEY]);

//       queryClient.setQueriesData([CUSTOMER_SUPPORT_QUERY_KEY], (old: any) =>
//         old.filter((item: any) => {
//           return item.id !== inquiryId;
//         }),
//       );
//     },
//   });
// };
