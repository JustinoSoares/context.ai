"use client";

import { BackgroundBlobs } from "@/components/shared/background-blobs";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Check,
  Copy,
  Image,
  SendHorizontal,
  Settings,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ask } from "@/services/api/routers";
import { SheetDemo } from "@/components/ui/sheet-menu";

type Props = {
  is_ia: boolean;
  content: string;
};

type AskParams = {
  question: string;
  document_id: string;
};

function IaMessage({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-start gap-2 group">
      <div className="bg-white px-4 py-2.5 max-w-full text-sm leading-relaxed rounded-2xl prose prose-sm">
        <ReactMarkdown>{content}</ReactMarkdown>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-2">
          {copied ? (
            <>
              <Check className="w-3 h-3" /> Copiado
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" /> Copiar
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2">
      <div className="bg-white px-4 py-3 rounded-2xl flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

export default function ChatPage() {
  const ref = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Props[]>([]);
  const params = useParams();
  const document_id = params.id as string;
  const queryClient = useQueryClient();
  const [isTyping, setIsTyping] = useState(false);

  const { mutate: askAI } = useMutation({
    mutationFn: ({ question, document_id }: AskParams) =>
      ask(question, document_id),
    onMutate: () => {
      setIsTyping(true);
    },
    onSuccess: (data) => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { is_ia: true, content: data.answer }]);
      queryClient.invalidateQueries({
        queryKey: ["getDocument", data.document_id],
      });
    },
    onError: () => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          is_ia: true,
          content:
            "Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente.",
        },
      ]);
    },
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    const el = ref.current;
    if (!el) return;
    const content = el.value.trim();
    if (!content) return;

    setMessages((prev) => [...prev, { is_ia: false, content }]);
    el.value = "";
    el.style.height = "auto";
    askAI({ question: content, document_id });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const handleInput = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden px-3 sm:px-4 py-3 sm:py-4">
      <BackgroundBlobs />

      {/* Header */}
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Context AI
        </h2>
        <div className="hidden sm:flex  items-center gap-1 sm:gap-4">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Image className="w-4 h-4 mr-1" /> Image
          </Button>
          <div className="hover:bg-gray-100 cursor-pointer p-2 rounded-full">
            <Settings className="w-5 h-5" />
          </div>
          <Button variant="outline" >
            Login
          </Button>
          <Button variant="default">
            Signin
          </Button>
        </div>
        <div className="flex sm:hidden">
          <SheetDemo />
        </div>
      </div>

      {/* Área de mensagens */}
      <div className="flex-1 min-h-0 max-w-3xl mx-auto w-full mt-4 sm:mt-6">
        <div
          className="h-full flex flex-col gap-3 px-2 sm:px-4 py-4 overflow-y-auto
            [scrollbar-width:thin]
            [scrollbar-color:transparent_transparent]
            hover:[scrollbar-color:hsl(var(--primary)/0.3)_transparent]
            transition-colors">
          {messages.length === 0 && (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm text-center px-4">
              Faz uma pergunta sobre o teu documento.
            </div>
          )}
          {messages.map((msg, index) =>
            msg.is_ia ? (
              <IaMessage key={index} content={msg.content} />
            ) : (
              <div key={index} className="flex justify-end">
                <p className="bg-white border border-gray-200 px-4 py-2.5 rounded-[18px_18px_18px_4px] max-w-[85%] sm:max-w-[70%] text-sm leading-relaxed">
                  {msg.content}
                </p>
              </div>
            ),
          )}
          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex justify-center pb-2 shrink-0">
        <div className="flex items-end gap-2 border w-full max-w-2xl p-3 rounded-2xl bg-gray-100/90 backdrop-blur border-gray-200 shadow-md">
          <Brain className="text-primary mb-[5px] shrink-0" />
          <textarea
            ref={ref}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            rows={1}
            className="flex-1 w-full resize-none outline-none border-none bg-transparent max-h-40 overflow-y-auto leading-relaxed text-sm py-[5px]"
            placeholder="Type your message..."
          />
          <div
            className="flex bg-primary items-center p-2 rounded-full shrink-0 cursor-pointer hover:opacity-90 transition-opacity mb-[1px]"
            onClick={handleSend}>
            <SendHorizontal className="text-white w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
