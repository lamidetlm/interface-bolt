export interface Quest {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  completionMessage: string;
  prerequisites: string[];
}

export interface QuestNotificationType {
  type: 'activation' | 'completion';
  title?: string;
  message: string;
}