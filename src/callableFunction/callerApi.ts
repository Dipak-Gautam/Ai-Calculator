import { SetStateAction } from "react";

const callerApi = async (
  question: string,
  setLoading: React.Dispatch<SetStateAction<boolean>>,
  handleTopicAdd: (question: string, response: string) => void
) => {
  const API_KEY = import.meta.env.Api_Key;
  const body =
    '{"contents":[{"parts":[{"text":"question:' + question + '"}]}]}';
  const request = await fetch(API_KEY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
  const response = await request.json();

  if (request.status == 200) {
    setLoading(false);
    handleTopicAdd(question, response.candidates[0].content.parts[0].text);
  }
};
export default callerApi;
