import supabase from '../supabase';

export type TypeNewInquiry = {
  title: string;
  user_id?: string;
  content: string;
  isReplied?: boolean;
};

export type TypeUpdatedInquiry = {
  title: string;
  content: string;
};

export const CUSTOMER_SUPPORT_TABLE = 'customer_support';
export const CUSTOMER_SUPPORT_QUERY_KEY = 'allCustomerSupport';
export const ONE_CUSTOMER_INQUIRY_QUERY_KEY = 'oneTargetInquiry';

// export const getAllInquiry = async (id: string) => {
//   const { data, error } = await supabase.from(CUSTOMER_SUPPORT_TABLE).select(`*,user_id (profiles: id, username)`).eq('user_id', id).order('created_at', { ascending: false });

//   if (error) throw error;
//   return data;
// };
export const getAllInquiry = async (id: string) => {
  const { data, error } = await supabase.from(CUSTOMER_SUPPORT_TABLE).select(`*, profiles(inquiryUsername : username), customer_support_reply(*)`).eq('user_id', id).order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getOneInquiry = async (inquiryId: string) => {
  const { data, error } = await supabase.from(CUSTOMER_SUPPORT_TABLE).select(`*, profiles(inquiryUsername : username), customer_support_reply(*)`).eq('id', inquiryId).limit(1).single();

  if (error) throw error;
  return data;
};

export const insertNewInquiry = async (newInquiry: TypeNewInquiry) => {
  const { error } = await supabase.from(CUSTOMER_SUPPORT_TABLE).insert(newInquiry);
  if (error) console.log(error);
};

export const deleteInquiry = async (inquiryId: string) => {
  const { error } = await supabase.from(CUSTOMER_SUPPORT_TABLE).delete().eq('id', inquiryId);
  if (error) console.log(error);
};

export const editInquiry = async (inquiryId: string, updatedInquiry: TypeUpdatedInquiry) => {
  const { error } = await supabase.from(CUSTOMER_SUPPORT_TABLE).update(updatedInquiry).eq('id', inquiryId);
  if (error) console.log(error);
};
