"use client";

import { useEffect, useState } from "react";

export default function TypingText({
  text = "O Context AI foi criado para fornecer respostas inteligentes com base no seu contexto.",
}: {
  text?: string;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;

      if (i > text.length) {
        return () => clearInterval(interval);
      }
    }, 50);
  }, [text]);

  return <>{displayed}|</>;
}
