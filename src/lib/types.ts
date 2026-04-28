export type Direction = "whatsapp_to_slack" | "slack_to_whatsapp";

export type MessageStatus = "sent" | "delivered" | "read" | "failed" | "pending";

export type UserRole = "admin" | "viewer";

export interface MessageDTO {
  id: string;
  direction: Direction;
  sender_phone: string;
  sender_name: string | null;
  message_text: string;
  slack_user: string | null;
  slack_channel: string | null;
  status: MessageStatus;
  whatsapp_message_id: string | null;
  n8n_execution_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateMessageInput {
  direction: Direction;
  sender_phone: string;
  sender_name?: string;
  message_text: string;
  slack_user?: string;
  slack_channel?: string;
  status: MessageStatus;
  whatsapp_message_id?: string;
  n8n_execution_id?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

export interface StatsResponse {
  todayTotal: number;
  todayByDirection: Record<Direction, number>;
  todayFailureRate: number;
  dailyVolume: Array<{ date: string; count: number }>;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  };
}
