import { useState } from "react";
import { Container, Box } from "@chakra-ui/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TextInput from "./components/TextInput";
import KeywordsModal from "./components/KeywordsModal";
import { OpenAI } from "openai";
import Form from "./components/Form";

function createPrompt(text, topic) {
  return `Extract 10 long-tail optimal SEO keywords from text about "${topic}". Ensure the keywords reflect the content accurately and naturally. Ensure the keywords you select are actually related to the topic. Make the first letter of every word uppercase and separate with commas. The markdown text is below, which will be in between the """ delimeters: \n\n"""\n${text}\n"""`;
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const App = () => {
  const [keywords, setKeywords] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const extractKeywords = async (text, topic) => {
    setLoading(true);
    setIsOpen(true);

    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0613",
      messages: [
        {
          content: createPrompt(text, topic),
          role: "user",
        },
      ],
      max_tokens: 200,
    });

    const keywords = gptResponse.choices[0].message.content.trim();

    setKeywords(keywords);

    // setKeywords(json.choices[0].text.trim());
    setLoading(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Box bg="blue.600" color="white" height="100vh" paddingTop={8}>
      <Container maxW="3xl" centerContent>
        <Header />
        <Form extractKeywords={extractKeywords} />
        {/* <Footer /> */}
      </Container>
      <KeywordsModal
        keywords={keywords}
        loading={loading}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </Box>
  );
};

export default App;
