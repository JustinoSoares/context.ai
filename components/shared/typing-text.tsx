"use client";

import { useEffect, useState } from "react";

export default function TypingText() {
  const text = "O Context AI foi criado para fornecer respostas inteligentes com base no seu contexto.";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;

      if (i > text.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return <>{displayed}|</>;
}