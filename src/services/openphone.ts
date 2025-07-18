import axios from 'axios'

const OPENPHONE_API_URL = 'https://api.openphone.com/v1'

export class OpenPhoneService {
  private apiKey: string
  private phoneNumber: string

  constructor(apiKey: string, phoneNumber: string) {
    this.apiKey = apiKey
    this.phoneNumber = phoneNumber
  }

  async sendSMS(to: string, message: string): Promise<boolean> {
    try {
      const response = await axios.post(
        `${OPENPHONE_API_URL}/messages`,
        {
          to: [to],
          text: message,
          from: this.phoneNumber
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      )

      return response.status === 200 || response.status === 201
    } catch (error) {
      console.error('OpenPhone SMS Error:', error)
      throw new Error('Failed to send SMS')
    }
  }

  async getMessages(limit: number = 50): Promise<any[]> {
    try {
      const response = await axios.get(
        `${OPENPHONE_API_URL}/messages?limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      )

      return response.data?.data || []
    } catch (error) {
      console.error('OpenPhone Get Messages Error:', error)
      throw new Error('Failed to fetch messages')
    }
  }
}