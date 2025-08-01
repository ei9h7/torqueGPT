export interface Message {
  id: string
  phone_number: string
  body: string
  direction: 'inbound' | 'outbound'
  timestamp: string
  processed: boolean
  ai_response?: string
  intent?: string
  action?: string
  created_at: string
  read?: boolean
  notified?: boolean
}

export interface BusinessSettings {
  id: string
  business_name: string
  labor_rate: number
  phone_number: string
  business_number?: string
  gst_setting: 'parts' | 'labor' | 'both' | 'none'
  openai_api_key?: string
  openphone_api_key?: string
  dnd_enabled?: boolean
  created_at: string
  updated_at: string
}

export interface AIResponse {
  reply: string
  intent: string
  action: string
}

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface Quote {
  id: string
  customer_name: string
  customer_phone: string
  vehicle_info: string
  description: string
  labor_hours: number
  labor_rate: number
  parts_cost: number
  total_cost: number
  status: 'draft' | 'sent' | 'accepted' | 'declined'
  created_at: string
  expires_at: string
}

export interface ServerSettings {
  openai_configured: boolean
  openphone_configured: boolean
  business_name: string
  labor_rate: number
  dnd_enabled: boolean
  openai_key_preview?: string
  openphone_key_preview?: string
}

export interface TechSheet {
  id: string
  title: string
  description: string
  vehicle_info?: string
  customer_name?: string
  estimated_time: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  tools_required: string[]
  parts_needed: string[]
  safety_warnings: string[]
  step_by_step: string[]
  tips: string[]
  created_at: string
  generated_by: 'ai' | 'manual'
  source?: 'booking' | 'manual'
}