// ConversationId -> lastResponseId
// conv1 -> 100
// conv2 -> 4

// Implementation
const conversation = new Map<string, string>();

// Public Interface
export const conversationRepository = {
  getLastResponseId(conversationId: string): string | undefined {
    return conversation.get(conversationId);
  },
  setLastResponseId(conversationId: string, lastResponseId: string) {
    conversation.set(conversationId, lastResponseId);
  },
};
