
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  
  "graphql_public": {
          Tables: {
            [_ in never]: never
          }
          Views: {
            [_ in never]: never
          }
          Functions: {
            "graphql":
{ Args: { "extensions"?: Json,"operationName"?: string,"query"?: string,"variables"?: Json }; Returns: Json
                           }
          }
          Enums: {
            [_ in never]: never
          }
          CompositeTypes: {
            [_ in never]: never
          }
        },"public": {
          Tables: {
            "answers": {
                  Row: {
                    "answered_at": string,"attempt_id": string,"chosen_index": number,"is_correct": boolean,"question_id": string
                  }
                  ComputedFields: never
                  Insert: {
                    "answered_at"?: string,"attempt_id": string,"chosen_index": number,"is_correct"?: boolean,"question_id": string
                  }
                  Update: {
                    "answered_at"?: string,"attempt_id"?: string,"chosen_index"?: number,"is_correct"?: boolean,"question_id"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "answers_attempt_id_fkey"
      columns: ["attempt_id"]
isOneToOne: false
      referencedRelation: "attempts"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "answers_question_id_fkey"
      columns: ["question_id"]
isOneToOne: false
      referencedRelation: "questions"
      referencedColumns: ["id"]
    }
                  ]
                },"attempts": {
                  Row: {
                    "finished_at": string | null,"id": string,"paper_id": string,"started_at": string,"user_id": string
                  }
                  ComputedFields: never
                  Insert: {
                    "finished_at"?: string | null,"id"?: string,"paper_id": string,"started_at"?: string,"user_id"?: string
                  }
                  Update: {
                    "finished_at"?: string | null,"id"?: string,"paper_id"?: string,"started_at"?: string,"user_id"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "attempts_paper_id_fkey"
      columns: ["paper_id"]
isOneToOne: false
      referencedRelation: "paper_summaries"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "attempts_paper_id_fkey"
      columns: ["paper_id"]
isOneToOne: false
      referencedRelation: "papers"
      referencedColumns: ["id"]
    }
                  ]
                },"grade_subjects": {
                  Row: {
                    "grade": number,"position": number,"subject": string
                  }
                  ComputedFields: never
                  Insert: {
                    "grade": number,"position"?: number,"subject": string
                  }
                  Update: {
                    "grade"?: number,"position"?: number,"subject"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "grade_subjects_grade_fkey"
      columns: ["grade"]
isOneToOne: false
      referencedRelation: "grades"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "grade_subjects_subject_fkey"
      columns: ["subject"]
isOneToOne: false
      referencedRelation: "subjects"
      referencedColumns: ["id"]
    }
                  ]
                },"grades": {
                  Row: {
                    "id": number,"name": string
                  }
                  ComputedFields: never
                  Insert: {
                    "id": number,"name": string
                  }
                  Update: {
                    "id"?: number,"name"?: string
                  }
                  Relationships: [
                    
                  ]
                },"papers": {
                  Row: {
                    "created_at": string,"exam_type": Database["public"]['Enums']["exam_type"],"grade": number,"id": string,"legacy_id": string | null,"semester": number | null,"size_bytes": number,"storage_path": string,"subject": string,"year": number
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"exam_type": Database["public"]['Enums']["exam_type"],"grade": number,"id"?: string,"legacy_id"?: string | null,"semester"?: number | null,"size_bytes": number,"storage_path": string,"subject": string,"year": number
                  }
                  Update: {
                    "created_at"?: string,"exam_type"?: Database["public"]['Enums']["exam_type"],"grade"?: number,"id"?: string,"legacy_id"?: string | null,"semester"?: number | null,"size_bytes"?: number,"storage_path"?: string,"subject"?: string,"year"?: number
                  }
                  Relationships: [
                    {
      foreignKeyName: "papers_grade_fkey"
      columns: ["grade"]
isOneToOne: false
      referencedRelation: "grades"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "papers_subject_fkey"
      columns: ["subject"]
isOneToOne: false
      referencedRelation: "subjects"
      referencedColumns: ["id"]
    }
                  ]
                },"profiles": {
                  Row: {
                    "created_at": string,"daily_goal_minutes": number,"display_name": string,"grade": number | null,"id": string,"onboarded_at": string | null,"role": Database["public"]['Enums']["user_role"],"stream": Database["public"]['Enums']["stream"] | null
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"daily_goal_minutes"?: number,"display_name"?: string,"grade"?: number | null,"id": string,"onboarded_at"?: string | null,"role"?: Database["public"]['Enums']["user_role"],"stream"?: Database["public"]['Enums']["stream"] | null
                  }
                  Update: {
                    "created_at"?: string,"daily_goal_minutes"?: number,"display_name"?: string,"grade"?: number | null,"id"?: string,"onboarded_at"?: string | null,"role"?: Database["public"]['Enums']["user_role"],"stream"?: Database["public"]['Enums']["stream"] | null
                  }
                  Relationships: [
                    {
      foreignKeyName: "profiles_grade_fkey"
      columns: ["grade"]
isOneToOne: false
      referencedRelation: "grades"
      referencedColumns: ["id"]
    }
                  ]
                },"questions": {
                  Row: {
                    "body": string,"correct_index": number,"created_at": string,"explanation": string | null,"grade": number,"id": string,"legacy_id": string | null,"needs_review": boolean,"options": (string)[],"paper_id": string | null,"subject": string,"unit_id": string | null
                  }
                  ComputedFields: never
                  Insert: {
                    "body": string,"correct_index": number,"created_at"?: string,"explanation"?: string | null,"grade": number,"id"?: string,"legacy_id"?: string | null,"needs_review"?: boolean,"options": (string)[],"paper_id"?: string | null,"subject": string,"unit_id"?: string | null
                  }
                  Update: {
                    "body"?: string,"correct_index"?: number,"created_at"?: string,"explanation"?: string | null,"grade"?: number,"id"?: string,"legacy_id"?: string | null,"needs_review"?: boolean,"options"?: (string)[],"paper_id"?: string | null,"subject"?: string,"unit_id"?: string | null
                  }
                  Relationships: [
                    {
      foreignKeyName: "questions_grade_fkey"
      columns: ["grade"]
isOneToOne: false
      referencedRelation: "grades"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "questions_paper_id_fkey"
      columns: ["paper_id"]
isOneToOne: false
      referencedRelation: "paper_summaries"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "questions_paper_id_fkey"
      columns: ["paper_id"]
isOneToOne: false
      referencedRelation: "papers"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "questions_subject_fkey"
      columns: ["subject"]
isOneToOne: false
      referencedRelation: "subjects"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "questions_unit_id_fkey"
      columns: ["unit_id"]
isOneToOne: false
      referencedRelation: "units"
      referencedColumns: ["id"]
    }
                  ]
                },"subjects": {
                  Row: {
                    "id": string,"name": string,"name_am": string | null
                  }
                  ComputedFields: never
                  Insert: {
                    "id": string,"name": string,"name_am"?: string | null
                  }
                  Update: {
                    "id"?: string,"name"?: string,"name_am"?: string | null
                  }
                  Relationships: [
                    
                  ]
                },"units": {
                  Row: {
                    "exam_weight": string | null,"grade": number,"id": string,"position": number,"subject": string,"title": string
                  }
                  ComputedFields: never
                  Insert: {
                    "exam_weight"?: string | null,"grade": number,"id"?: string,"position": number,"subject": string,"title": string
                  }
                  Update: {
                    "exam_weight"?: string | null,"grade"?: number,"id"?: string,"position"?: number,"subject"?: string,"title"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "units_grade_fkey"
      columns: ["grade"]
isOneToOne: false
      referencedRelation: "grades"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "units_subject_fkey"
      columns: ["subject"]
isOneToOne: false
      referencedRelation: "subjects"
      referencedColumns: ["id"]
    }
                  ]
                }
          }
          Views: {
            "paper_summaries": {
                  Row: {
                    "created_at": string,"exam_type": Database["public"]['Enums']["exam_type"],"grade": number,"id": string,"legacy_id": string | null,"question_count": number | null,"semester": number | null,"size_bytes": number,"storage_path": string,"subject": string,"year": number
                  }
                  ComputedFields: never
                  Insert: {
                           "created_at"?: string | null,"exam_type"?: Database["public"]['Enums']["exam_type"] | null,"grade"?: number | null,"id"?: string | null,"legacy_id"?: string | null,"question_count"?: never,"semester"?: number | null,"size_bytes"?: number | null,"storage_path"?: string | null,"subject"?: string | null,"year"?: number | null
                         }
                        Update: {
                           "created_at"?: string | null,"exam_type"?: Database["public"]['Enums']["exam_type"] | null,"grade"?: number | null,"id"?: string | null,"legacy_id"?: string | null,"question_count"?: never,"semester"?: number | null,"size_bytes"?: number | null,"storage_path"?: string | null,"subject"?: string | null,"year"?: number | null
                         }
                        Relationships: [
                    {
      foreignKeyName: "papers_grade_fkey"
      columns: ["grade"]
isOneToOne: false
      referencedRelation: "grades"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "papers_subject_fkey"
      columns: ["subject"]
isOneToOne: false
      referencedRelation: "subjects"
      referencedColumns: ["id"]
    }
                  ]
                }
          }
          Functions: {
            "is_admin":
{ Args: Record<PropertyKey, never>; Returns: boolean
                           }
          }
          Enums: {
            "exam_type": "mid1"|"mid2"|"final"|"pretest"|"model","stream": "natural"|"social","user_role": "student"|"admin"
          }
          CompositeTypes: {
            [_ in never]: never
          }
        }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  "graphql_public": {
          Enums: {
            
          }
        },"public": {
          Enums: {
            "exam_type": ["mid1", "mid2", "final", "pretest", "model"],"stream": ["natural", "social"],"user_role": ["student", "admin"]
          }
        }
} as const
