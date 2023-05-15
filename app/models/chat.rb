class Chat < ApplicationRecord
  validates :message, length: { maximum: 280 }, presence: true

  after_create :stream_new_chat

  private

  def stream_new_chat
    ActionCable.server.broadcast('chat_homepage', { body: self.message })
  end
end