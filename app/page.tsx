"use client";

import { BackgroundBlobs } from "@/components/shared/background-blobs";
import Particles from "@/components/shared/background-chat";
import TypingText from "@/components/shared/typing-text";
import { Button } from "@/components/ui/button";
import { SpinnerCustom } from "@/components/ui/loading";
import { uploadFile } from "@/services/api/routers";
import { useMutation } from "@tanstack/react-query";
import { ArrowUpFromLine, SquareArrowOutUpRight } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SheetDemo } from "@/components/ui/sheet-menu";
import { maxMessageLength } from "@/lib/utils";

export default function Home() {
  const router = useRouter();

  const { mutate: upload, isPending } = useMutation({
    mutationFn: uploadFile,
  });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("Nenhum arquivo selecionado");
      return;
    }

    upload(file, {
      onSuccess: (data) => {
        router.push(`/chat/${data.document_id}`);
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? maxMessageLength(error.message)
            : "Erro ao fazer upload",
        );
      },
    });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {isPending && <SpinnerCustom />}

      {/* Particles */}
      <div className="fixed inset-0">
        <Particles
          particleColors={["#F15B04"]}
          particleCount={200}
          particleSpread={10}
          speed={0.2}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* Header */}
      <header className="flex justify-between items-center py-4 px-4 shrink-0">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Context AI
        </h2>
        <div className="hidden sm:flex  items-center gap-1 sm:gap-1">
          <Button variant="outline">Login</Button>
          <Button variant="default">Signin</Button>
        </div>
        <div className="flex sm:hidden z-50">
          <SheetDemo />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex justify-center items-center px-4">
        <div className="flex flex-col justify-center items-center w-full max-w-2xl text-center">
          <BackgroundBlobs />

          <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-foreground mb-4">
            <TypingText />
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl">
            {
              "Seu assistente com inteligência artificial para tudo o que você precisa. \
              De organização de tarefas a lembretes, o Context AI cuida de tudo para você.\
              Experimente uma nova forma de ser produtivo."
            }
          </p>

          <div className="relative z-50">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              onChange={handleUpload}
              disabled={isPending}
              onClick={(e) => {
                (e.target as HTMLInputElement).value = "";
              }}
            />
            <Button variant="default" className="w-36!" size="lg">
              Context <ArrowUpFromLine className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="shrink-0 px-8 py-4">
        <div className="flex sm:justify-end justify-between items-center gap-2 text-muted-foreground ">
          <Button
            size="lg"
            variant="link"
            className="cursor-pointer z-30"
            onClick={() =>
              window.open("https://github.com/JustinoSoares", "_blank")
            }
          >
            Justino Soares <SquareArrowOutUpRight className="w-4 h-4 ml-1" />
          </Button>
          <Button size="lg" variant="link">
            Himersus <SquareArrowOutUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
