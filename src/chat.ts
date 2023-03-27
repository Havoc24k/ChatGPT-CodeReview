import { ChatGPTAPI } from 'chatgpt';
export class Chat {
  private chatAPI: ChatGPTAPI;

  constructor(apikey: string) {
    this.chatAPI = new ChatGPTAPI({
      apiKey: apikey,
      completionParams: {
        model: process.env.MODEL || 'gpt-3.5-turbo',
        temperature: +(process.env.temperature || 0) || 1,
        top_p: +(process.env.temperature || 0) || 1,
      },
    });
  }

  private generatePrompt = (patch: string) => {
    const answerLanguage = process.env.LANGUAGE
      ? `${process.env.LANGUAGE},`
      : 'English';

    return `Please help me do an analytical and strict code review. In your review include security risks, improvements, and suggestions based on best practices. The answer should be in ${answerLanguage}.
    ${patch}
    `;
  };

  public codeReview = async (patch: string) => {
    if (!patch) {
      return '';
    }

    console.time('code-review cost');
    const prompt = this.generatePrompt(patch);

    const res = await this.chatAPI.sendMessage(prompt);

    console.timeEnd('code-review cost');
    return res.text;
  };
}
