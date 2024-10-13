import Chatbot from "@/components/Chatbot/chatbot";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-5xl">AI Seach - Beta</h1>
      <br />
      <h3 className="text-2xl">Let AI be your shopping partner!</h3>
      <br />
      <p className="w-3/4">This AI feature will help you find products based on product descriptions you want. Its unlike normal search engines which search through keywords. This seach engine is powered by open AI LLM and the model we are using is gpt-4o-mini. This bot is in early stages but will be improvised further. Right now its working with JSON file, but later I will use Database connection to make it more realistic. </p>
      <br />
      <br />
      <p>Click on the Chatbot Icon at the bottom right corner to begin!</p>
      <Chatbot />
    </main>
  );
}
