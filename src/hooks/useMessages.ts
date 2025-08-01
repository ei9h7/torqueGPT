import { useState, useEffect } from 'react'
import type { Message } from '../types'
import toast from 'react-hot-toast'
import { API_BASE_URL } from '../utils/api'

/**
 * useMessages Hook
 * 
 * A comprehensive React hook for managing customer messages and SMS communication.
 * This hook provides real-time message management with the following capabilities:
 * 
 * - Automatic message polling from the API
 * - SMS sending via OpenPhone integration
 * - Message status tracking (read/unread)
 * - Emergency message detection and filtering
 * - Real-time updates with 5-second polling interval
 * 
 * The hook connects to the appropriate server based on environment:
 * - Development: localhost:10000
 * - Production: torquegpt.onrender.com
 */

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    loadMessages()
    
    // Set up polling to check for new messages every 5 seconds
    // This ensures real-time updates when new SMS messages arrive
    const interval = setInterval(loadMessages, 5000)
    
    return () => clearInterval(interval)
  }, [])

  /**
   * Loads messages from the API
   * 
   * This function fetches messages from the server using the dynamic API URL
   * that automatically selects between development and production endpoints.
   */
  const loadMessages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages || [])
      } else {
        console.error('Failed to load messages from server:', response.status)
        setMessages([])
      }
    } catch (error) {
      console.error('Error loading messages from server:', error)
      setMessages([])
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Sends a manual SMS message to a customer
   * 
   * This function integrates with the OpenPhone API via the webhook server
   * to send SMS messages. It includes proper error handling and user feedback.
   * 
   * @param phoneNumber - The customer's phone number
   * @param message - The message content to send
   */
  const sendMessage = async ({ phoneNumber, message }: { phoneNumber: string; message: string }) => {
    setIsSending(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, message }),
      })

      if (response.ok) {
        // Refresh messages after sending to show the new outbound message
        await loadMessages()
        toast.success('Message sent successfully')
      } else {
        throw new Error(`Server responded with status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message')
      throw error
    } finally {
      setIsSending(false)
    }
  }

  /**
   * Marks a message as read
   * 
   * Updates the server to track message read status.
   * This helps with conversation management and unread count tracking.
   * 
   * @param messageId - The ID of the message to mark as read
   */
  const markAsRead = async (messageId: string) => {
    try {
      await fetch(`${API_BASE_URL}/api/messages/${messageId}/read`, {
        method: 'POST',
      })
      
      // Update local state
      const updatedMessages = messages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      )
      setMessages(updatedMessages)
    } catch (error) {
      console.error('Error marking message as read:', error)
    }
  }

  /**
   * Gets the count of unread inbound messages
   * 
   * Used for displaying notification badges and dashboard statistics.
   * Only counts inbound messages to avoid counting our own replies.
   */
  const getUnreadCount = () => {
    return messages.filter(msg => msg.direction === 'inbound' && !msg.read).length
  }

  /**
   * Filters messages to find emergency communications
   * 
   * Emergency messages are identified by their AI-detected intent
   * and are used for priority alerts and dashboard warnings.
   */
  const getEmergencyMessages = () => {
    return messages.filter(msg => 
      msg.intent?.toLowerCase().includes('emergency') && 
      msg.direction === 'inbound'
    )
  }

  return {
    messages,
    isLoading,
    error: null,
    sendMessage,
    isSending,
    markAsRead,
    getUnreadCount,
    getEmergencyMessages,
    refreshMessages: loadMessages
  }
}