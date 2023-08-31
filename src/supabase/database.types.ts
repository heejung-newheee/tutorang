export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      board: {
        Row: {
          content: string | null;
          created_at: string;
          id: number;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: number;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: number;
          title?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'board_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'board_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'matching_tutor_data';
            referencedColumns: ['tutor_id'];
          },
          {
            foreignKeyName: 'board_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'most_review_tutor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'board_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'tutor_info_join';
            referencedColumns: ['tutor_id'];
          },
        ];
      };
      bookmark: {
        Row: {
          id: number;
          tutor_id: string | null;
          user_id: string;
        };
        Insert: {
          id?: number;
          tutor_id?: string | null;
          user_id: string;
        };
        Update: {
          id?: number;
          tutor_id?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      chat_messages: {
        Row: {
          content: string | null;
          created_at: string;
          data: Json | null;
          message_id: string;
          room_id: string;
          type: string;
          user_id: string;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          data?: Json | null;
          message_id?: string;
          room_id: string;
          type?: string;
          user_id?: string;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          data?: Json | null;
          message_id?: string;
          room_id?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_messages_room_id_fkey';
            columns: ['room_id'];
            referencedRelation: 'chat_rooms';
            referencedColumns: ['room_id'];
          },
          {
            foreignKeyName: 'chat_messages_room_id_fkey';
            columns: ['room_id'];
            referencedRelation: 'chat_room_view';
            referencedColumns: ['room_id'];
          },
          {
            foreignKeyName: 'chat_messages_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_messages_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'matching_tutor_data';
            referencedColumns: ['tutor_id'];
          },
          {
            foreignKeyName: 'chat_messages_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'most_review_tutor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_messages_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'tutor_info_join';
            referencedColumns: ['tutor_id'];
          },
        ];
      };
      chat_room_participants: {
        Row: {
          created_at: string;
          room_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          room_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          room_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_room_participants_room_id_fkey';
            columns: ['room_id'];
            referencedRelation: 'chat_rooms';
            referencedColumns: ['room_id'];
          },
          {
            foreignKeyName: 'chat_room_participants_room_id_fkey';
            columns: ['room_id'];
            referencedRelation: 'chat_room_view';
            referencedColumns: ['room_id'];
          },
          {
            foreignKeyName: 'chat_room_participants_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_room_participants_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'matching_tutor_data';
            referencedColumns: ['tutor_id'];
          },
          {
            foreignKeyName: 'chat_room_participants_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'most_review_tutor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_room_participants_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'tutor_info_join';
            referencedColumns: ['tutor_id'];
          },
        ];
      };
      chat_rooms: {
        Row: {
          created_at: string | null;
          name: string | null;
          room_id: string;
        };
        Insert: {
          created_at?: string | null;
          name?: string | null;
          room_id?: string;
        };
        Update: {
          created_at?: string | null;
          name?: string | null;
          room_id?: string;
        };
        Relationships: [];
      };
      city: {
        Row: {
          id: number;
          sido: string;
          sigungu: string | null;
        };
        Insert: {
          id?: number;
          sido: string;
          sigungu?: string | null;
        };
        Update: {
          id?: number;
          sido?: string;
          sigungu?: string | null;
        };
        Relationships: [];
      };
      city2: {
        Row: {
          city: Json | null;
          id: number;
        };
        Insert: {
          city?: Json | null;
          id?: number;
        };
        Update: {
          city?: Json | null;
          id?: number;
        };
        Relationships: [];
      };
      like: {
        Row: {
          id: number;
          liked_id: string;
          user_id: string | null;
        };
        Insert: {
          id?: number;
          liked_id: string;
          user_id?: string | null;
        };
        Update: {
          id?: number;
          liked_id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'like_liked_id_fkey';
            columns: ['liked_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'like_liked_id_fkey';
            columns: ['liked_id'];
            referencedRelation: 'matching_tutor_data';
            referencedColumns: ['tutor_id'];
          },
          {
            foreignKeyName: 'like_liked_id_fkey';
            columns: ['liked_id'];
            referencedRelation: 'most_review_tutor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'like_liked_id_fkey';
            columns: ['liked_id'];
            referencedRelation: 'tutor_info_join';
            referencedColumns: ['tutor_id'];
          },
          {
            foreignKeyName: 'like_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'like_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'matching_tutor_data';
            referencedColumns: ['tutor_id'];
          },
          {
            foreignKeyName: 'like_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'most_review_tutor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'like_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'tutor_info_join';
            referencedColumns: ['tutor_id'];
          },
        ];
      };
      matching: {
        Row: {
          created_at: string;
          id: string;
          matched: boolean | null;
          status: string | null;
          tutor_id: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          matched?: boolean | null;
          status?: string | null;
          tutor_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          matched?: boolean | null;
          status?: string | null;
          tutor_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'matching_tutor_id_fkey';
            columns: ['tutor_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'matching_tutor_id_fkey';
            columns: ['tutor_id'];
            referencedRelation: 'matching_tutor_data';
            referencedColumns: ['tutor_id'];
          },
          {
            foreignKeyName: 'matching_tutor_id_fkey';
            columns: ['tutor_id'];
            referencedRelation: 'most_review_tutor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'matching_tutor_id_fkey';
            columns: ['tutor_id'];
            referencedRelation: 'tutor_info_join';
            referencedColumns: ['tutor_id'];
          },
          {
            foreignKeyName: 'matching_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'matching_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'matching_tutor_data';
            referencedColumns: ['tutor_id'];
          },
          {
            foreignKeyName: 'matching_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'most_review_tutor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'matching_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'tutor_info_join';
            referencedColumns: ['tutor_id'];
          },
        ];
      };
      profiles: {
        Row: {
          age: number | null;
          avatar_url: string | null;
          birth: string | null;
          deleted_at: string | null;
          email: string | null;
          gender: string | null;
          id: string;
          location1_gugun: string | null;
          location1_sido: string | null;
          location2_gugun: string | null;
          location2_sido: string | null;
          role: string | null;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          age?: number | null;
          avatar_url?: string | null;
          birth?: string | null;
          deleted_at?: string | null;
          email?: string | null;
          gender?: string | null;
          id: string;
          location1_gugun?: string | null;
          location1_sido?: string | null;
          location2_gugun?: string | null;
          location2_sido?: string | null;
          role?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          age?: number | null;
          avatar_url?: string | null;
          birth?: string | null;
          deleted_at?: string | null;
          email?: string | null;
          gender?: string | null;
          id?: string;
          location1_gugun?: string | null;
          location1_sido?: string | null;
          location2_gugun?: string | null;
          location2_sido?: string | null;
          role?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      review: {
        Row: {
          author: string | null;
          content: string | null;
          created_at: string;
          id: number;
          rating: number | null;
          reviewed_id: string | null;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          author?: string | null;
          content?: string | null;
          created_at?: string;
          id?: number;
          rating?: number | null;
          reviewed_id?: string | null;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          author?: string | null;
          content?: string | null;
          created_at?: string;
          id?: number;
          rating?: number | null;
          reviewed_id?: string | null;
          title?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'review_reviewed_id_fkey';
            columns: ['reviewed_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'review_reviewed_id_fkey';
            columns: ['reviewed_id'];
            referencedRelation: 'matching_tutor_data';
            referencedColumns: ['tutor_id'];
          },
          {
            foreignKeyName: 'review_reviewed_id_fkey';
            columns: ['reviewed_id'];
            referencedRelation: 'most_review_tutor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'review_reviewed_id_fkey';
            columns: ['reviewed_id'];
            referencedRelation: 'tutor_info_join';
            referencedColumns: ['tutor_id'];
          },
          {
            foreignKeyName: 'review_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'review_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'matching_tutor_data';
            referencedColumns: ['tutor_id'];
          },
          {
            foreignKeyName: 'review_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'most_review_tutor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'review_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'tutor_info_join';
            referencedColumns: ['tutor_id'];
          },
        ];
      };
      tutor_info: {
        Row: {
          certification_image: string | null;
          class_info: string | null;
          class_level: string[] | null;
          created_at: string;
          enrollmentStatus: string | null;
          id: number;
          major: string | null;
          personality: string[] | null;
          speaking_language: string[] | null;
          tuition_fee_offline: number | null;
          tuition_fee_online: number | null;
          university: string | null;
          update: string | null;
          user_id: string | null;
        };
        Insert: {
          certification_image?: string | null;
          class_info?: string | null;
          class_level?: string[] | null;
          created_at?: string;
          enrollmentStatus?: string | null;
          id?: number;
          major?: string | null;
          personality?: string[] | null;
          speaking_language?: string[] | null;
          tuition_fee_offline?: number | null;
          tuition_fee_online?: number | null;
          university?: string | null;
          update?: string | null;
          user_id?: string | null;
        };
        Update: {
          certification_image?: string | null;
          class_info?: string | null;
          class_level?: string[] | null;
          created_at?: string;
          enrollmentStatus?: string | null;
          id?: number;
          major?: string | null;
          personality?: string[] | null;
          speaking_language?: string[] | null;
          tuition_fee_offline?: number | null;
          tuition_fee_online?: number | null;
          university?: string | null;
          update?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'tutor_info_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'tutor_info_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'matching_tutor_data';
            referencedColumns: ['tutor_id'];
          },
          {
            foreignKeyName: 'tutor_info_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'most_review_tutor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'tutor_info_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'tutor_info_join';
            referencedColumns: ['tutor_id'];
          },
        ];
      };
    };
    Views: {
      chat_room_view: {
        Row: {
          created_at: string | null;
          last_message: string | null;
          name: string | null;
          participants: string[] | null;
          room_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          last_message?: never;
          name?: string | null;
          participants?: never;
          room_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          last_message?: never;
          name?: string | null;
          participants?: never;
          room_id?: string | null;
        };
        Relationships: [];
      };
      matching_tutor_data: {
        Row: {
          created_at: string | null;
          id: string | null;
          matched: boolean | null;
          status: string | null;
          student_img: string | null;
          student_lc_1_gugun: string | null;
          student_lc_1_sido: string | null;
          student_lc_2_gugun: string | null;
          student_lc_2_sido: string | null;
          student_name: string | null;
          tutor_id: string | null;
          tutor_img: string | null;
          tutor_lc_1_gugun: string | null;
          tutor_lc_1_sido: string | null;
          tutor_lc_2_gugun: string | null;
          tutor_lc_2_sido: string | null;
          tutor_name: string | null;
          user_id: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'matching_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'matching_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'matching_tutor_data';
            referencedColumns: ['tutor_id'];
          },
          {
            foreignKeyName: 'matching_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'most_review_tutor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'matching_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'tutor_info_join';
            referencedColumns: ['tutor_id'];
          },
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['tutor_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      most_review_tutor: {
        Row: {
          id: string | null;
          review_count: number | null;
          username: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      tutor_info_join: {
        Row: {
          class_info: string | null;
          class_level: string[] | null;
          created_at: string | null;
          location1_gugun: string | null;
          location1_sido: string | null;
          location2_gugun: string | null;
          location2_sido: string | null;
          major: string | null;
          personality: string[] | null;
          speaking_language: string[] | null;
          tuition_fee_offline: number | null;
          tuition_fee_online: number | null;
          tutor_id: string | null;
          tutor_img: string | null;
          tutor_info_id: number | null;
          tutor_name: string | null;
          university: string | null;
          update: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['tutor_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Functions: {
      get_two_person_chat_room: {
        Args: {
          user1_id: string;
          user2_id: string;
        };
        Returns: {
          room_id: string;
          name: string;
          created_at: string;
        }[];
      };
      is_room_participant: {
        Args: {
          room_id: string;
          user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Views<T extends keyof Database['public']['Views']> = Database['public']['Views'][T]['Row'];

export type TTutorWithUser = Pick<Tables<'tutor_info'>, 'id' | 'created_at' | 'class_info' | 'tuition_fee_offline' | 'tuition_fee_online'> & {
  profiles: Pick<Tables<'profiles'>, 'id' | 'username' | 'avatar_url'>;
};

export type BookMarkType = Pick<Tables<'like'>, 'liked_id' | 'user_id'>;
export type reviews = Pick<Tables<'review'>, 'title' | 'content' | 'user_id' | 'author' | 'reviewed_id' | 'rating'>;
export type updateReviews = Pick<Tables<'review'>, 'title' | 'content' | 'rating'>;
export type RoomType = Tables<'chat_rooms'> & {
  chat_room_participants: (Tables<'chat_room_participants'> & { profiles: Tables<'profiles'> })[];
};

export type RoomWithLastMessageType = RoomType & {
  last_message: Tables<'chat_messages'>[];
};
// export type TutorLists<T extends keyof Database['public']['Tables']['tutor_info']['Row']> = Database['public']['Tables']['tutor_info']['Row'][T];
