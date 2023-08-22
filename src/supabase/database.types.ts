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
            referencedRelation: 'most_review_tutor';
            referencedColumns: ['id'];
          },
        ];
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
            referencedRelation: 'most_review_tutor';
            referencedColumns: ['id'];
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
            referencedRelation: 'most_review_tutor';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          birth: string | null;
          deleted_at: string | null;
          email: string | null;
          gender: string | null;
          id: string;
          language_level: string | null;
          location1: string | null;
          location2: string | null;
          role: string | null;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          birth?: string | null;
          deleted_at?: string | null;
          email?: string | null;
          gender?: string | null;
          id: string;
          language_level?: string | null;
          location1?: string | null;
          location2?: string | null;
          role?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          birth?: string | null;
          deleted_at?: string | null;
          email?: string | null;
          gender?: string | null;
          id?: string;
          language_level?: string | null;
          location1?: string | null;
          location2?: string | null;
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
          content: string | null;
          created_at: string;
          id: number;
          rating: number | null;
          reviewed_id: string | null;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: number;
          rating?: number | null;
          reviewed_id?: string | null;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
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
            referencedRelation: 'most_review_tutor';
            referencedColumns: ['id'];
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
            referencedRelation: 'most_review_tutor';
            referencedColumns: ['id'];
          },
        ];
      };
      tutor_info: {
        Row: {
          class_info: string | null;
          created_at: string;
          id: number;
          price: number | null;
          update: string | null;
          user_id: string | null;
        };
        Insert: {
          class_info?: string | null;
          created_at?: string;
          id?: number;
          price?: number | null;
          update?: string | null;
          user_id?: string | null;
        };
        Update: {
          class_info?: string | null;
          created_at?: string;
          id?: number;
          price?: number | null;
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
            referencedRelation: 'most_review_tutor';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
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
    };
    Functions: {
      [_ in never]: never;
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

export type TTutorWithUser = Pick<Tables<'tutor_info'>, 'id' | 'created_at' | 'class_info' | 'price'> & {
  profiles: Pick<Tables<'profiles'>, 'id' | 'username' | 'avatar_url'>;
};
