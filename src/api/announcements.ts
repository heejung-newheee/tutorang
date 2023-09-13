import supabase from '../supabase';
import { UpdatingTables } from '../supabase/database.types';

export const ANNOUNCEMENTS_TABLE = 'announcements';
export const ANNOUNCEMENTS_QUERY_KEY = 'allAnnouncements';
export const ONE_ANNOUNCEMENT_QUERY_KEY = 'oneTargetAnnouncement';

export const getAllAnnouncements = async () => {
  const { data, error } = await supabase.from(ANNOUNCEMENTS_TABLE).select();

  if (error) throw error;
  return data;
};

export const getOneAnnouncement = async (announcementId: string) => {
  const { data, error } = await supabase.from(ANNOUNCEMENTS_TABLE).select().eq('id', announcementId).limit(1).single();

  if (error) throw error;
  return data;
};

export const insertNewAnnouncement = async (newAnnouncement: UpdatingTables<'announcements'>) => {
  const { error } = await supabase.from(ANNOUNCEMENTS_TABLE).insert(newAnnouncement);

  if (error) console.log(error);
};

export const deleteAnnouncement = async (announcementId: string) => {
  const { error } = await supabase.from(ANNOUNCEMENTS_TABLE).delete().eq('id', announcementId);

  if (error) throw error;
};

export const editAnnouncement = async (announcementId: string, updatedAnnouncement: UpdatingTables<'announcements'>) => {
  const { error } = await supabase.from(ANNOUNCEMENTS_TABLE).update(updatedAnnouncement).eq('id', announcementId);

  if (error) throw error;
};
