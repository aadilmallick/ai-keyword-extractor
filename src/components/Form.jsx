import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Button, Textarea, Input } from "@chakra-ui/react";

const Form = ({ extractKeywords }) => {
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("");
  const toast = useToast();

  const submitText = () => {
    if (text === "") {
      toast({
        title: "Text field is empty.",
        description: "Please enter some text to extract keywords.",
        status: "error",
        duration: 5000,
        isClosable: false,
      });
      return;
    }

    if (topic === "") {
      toast({
        title: "Topic is empty.",
        description: "Please enter the text topic.",
        status: "error",
        duration: 5000,
        isClosable: false,
      });
      return;
    }

    extractKeywords(text, topic);
  };

  return (
    <>
      <Input
        bg="blue.400"
        padding={4}
        marginTop={6}
        color="white"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter Text Topic"
        required
      />
      <Textarea
        bg="blue.400"
        padding={4}
        marginTop={6}
        height={200}
        color="white"
        value={text}
        required
        onChange={(e) => setText(e.target.value)}
      />

      <Button
        bg="blue.500"
        color="white"
        marginTop={4}
        width="100%"
        _hover={{ bg: "blue.700" }}
        onClick={submitText}
      >
        Extract Keywords
      </Button>
    </>
  );
};

export default Form;
