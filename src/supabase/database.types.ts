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
          user_id: number | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: number;
          title?: string | null;
          user_id?: number | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: number;
          title?: string | null;
          user_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'board_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      like: {
        Row: {
          id: number;
          liked_id: number | null;
          user_id: number | null;
        };
        Insert: {
          id?: number;
          liked_id?: number | null;
          user_id?: number | null;
        };
        Update: {
          id?: number;
          liked_id?: number | null;
          user_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'like_liked_id_fkey';
            columns: ['liked_id'];
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'like_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'user';
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
          reviewed_id: number | null;
          title: string | null;
          user_id: number | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: number;
          rating?: number | null;
          reviewed_id?: number | null;
          title?: string | null;
          user_id?: number | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: number;
          rating?: number | null;
          reviewed_id?: number | null;
          title?: string | null;
          user_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'review_reviewed_id_fkey';
            columns: ['reviewed_id'];
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'review_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      tutor_info: {
        Row: {
          class_info: string | null;
          created_at: string;
          id: number;
          location_1: string | null;
          location_2: string | null;
          price: number | null;
          update: string | null;
          user_id: number | null;
        };
        Insert: {
          class_info?: string | null;
          created_at?: string;
          id?: number;
          location_1?: string | null;
          location_2?: string | null;
          price?: number | null;
          update?: string | null;
          user_id?: number | null;
        };
        Update: {
          class_info?: string | null;
          created_at?: string;
          id?: number;
          location_1?: string | null;
          location_2?: string | null;
          price?: number | null;
          update?: string | null;
          user_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'tutor_info_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      user: {
        Row: {
          birth: string | null;
          created_at: string;
          delete_date: string | null;
          email: string | null;
          id: number;
          location_1: string | null;
          location_2: string | null;
          name: string | null;
          profile_img: string | null;
          role: string | null;
        };
        Insert: {
          birth?: string | null;
          created_at?: string;
          delete_date?: string | null;
          email?: string | null;
          id?: number;
          location_1?: string | null;
          location_2?: string | null;
          name?: string | null;
          profile_img?: string | null;
          role?: string | null;
        };
        Update: {
          birth?: string | null;
          created_at?: string;
          delete_date?: string | null;
          email?: string | null;
          id?: number;
          location_1?: string | null;
          location_2?: string | null;
          name?: string | null;
          profile_img?: string | null;
          role?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
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
