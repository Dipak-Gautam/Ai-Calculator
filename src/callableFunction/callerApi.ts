import { SetStateAction } from "react";

const callerApi = async (
  question: string,
  setLoading: React.Dispatch<SetStateAction<boolean>>,
  handleTopicAdd: (question: string, response: string) => void
) => {
  const body = '{"contents":[{"parts":[{"text":"question:' + question + '"}]}]}';
  const request = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCmkka4CpQ6XHwuRwboY7D8EDYKAPaeXNY",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    }
  );
  const response = await request.json();

  if (request.status == 200) {
    setLoading(false);
    handleTopicAdd(question, response.candidates[0].content.parts[0].text);
  }
};
export default callerApi;
