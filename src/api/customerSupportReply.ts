import supabase from '../supabase';

export type TypeNewReplyToInquiry = {
  cs_table_id?: string;
  user_id?: string;
  content: string;
};

export type TypeReply = {
  content: string | null;
  created_at: string;
  cs_table_id: string | null;
  id: string;
  user_id: string | null;
};

const PAGE_LIMIT = 10;

export const CS_MANAGE_TABLE = 'customer_support';
export const CS_REPLY_TABLE = 'customer_support_reply';
export const CS_MANAGE_QUERY_KEY = 'allCSmanage';
export const CS_REPLY_QUERY_KEY = 'targetCSReply';

export const getAllCs = async (page: number) => {
  const {
    data: cs,
    error,
    count: totalCount,
  } = await supabase
    .from(CS_MANAGE_TABLE)
    .select(`*, profiles(*),customer_support_reply(*)`, { count: 'exact', head: false })
    .order('created_at', { ascending: false })
    .range((page - 1) * PAGE_LIMIT, page * PAGE_LIMIT - 1);

  if (error) throw error;
  if (!cs) throw new Error('data is null');
  if (totalCount === null) throw new Error('count is null');

  const count = cs.length;
  const currentPage = page;
  const hasNextPage = totalCount > page * PAGE_LIMIT;
  const hasPreviousPage = page > 1;
  const lastPage = Math.ceil(totalCount / PAGE_LIMIT);
  const rowsPerPage = PAGE_LIMIT;

  return { cs, count, totalCount, currentPage, hasNextPage, hasPreviousPage, lastPage, rowsPerPage };
};

export const getTargetCsReply = async (inquiryId: string) => {
  const { data: targetReply, error } = await supabase.from(CS_REPLY_TABLE).select().eq('cs_table_id', inquiryId);

  if (error) throw error;
  return targetReply;
};

export const insertNewReplyToInquiry = async (newReply: TypeNewReplyToInquiry) => {
  const { error } = await supabase.from(CS_REPLY_TABLE).insert(newReply);

  if (error) throw error;
};

export const deleteReplyToInquiry = async (replyId: string) => {
  const { error } = await supabase.from(CS_REPLY_TABLE).delete().eq('id', replyId);

  if (error) throw error;
};

export const editReplyToInquiry = async (replyId: string, content: string) => {
  const { error } = await supabase.from(CS_REPLY_TABLE).update({ content: content }).eq('id', replyId);

  if (error) throw error;
};
