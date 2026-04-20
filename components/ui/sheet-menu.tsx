import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Brain,
  FileText,
  GitBranch,
  LogIn,
  Menu,
  MessageSquare,
  Sparkles,
  UserPlus,
  Zap,
} from "lucide-react";

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Menu className="w-5 h-5 cursor-pointer" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm flex flex-col p-0">
        {/* Header */}
        <div className="px-6 pt-8 pb-6 border-b">
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-5 h-5 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Context AI
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            O teu assistente inteligente para documentos
          </p>
        </div>

        {/* Funcionalidades */}
        <div className="px-6 py-5 border-b">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            O que podes fazer
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Analisa documentos</p>
                <p className="text-xs text-muted-foreground">
                  PDF, DOCX e TXT até 2MB
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                <MessageSquare className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  Conversa com os teus ficheiros
                </p>
                <p className="text-xs text-muted-foreground">
                  Faz perguntas em linguagem natural
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Respostas instantâneas</p>
                <p className="text-xs text-muted-foreground">
                  Powered by Groq + LLaMA 3
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">IA semântica</p>
                <p className="text-xs text-muted-foreground">
                  Encontra o contexto certo no documento
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="px-6 py-4 border-b">
          <a
            href="https://github.com/JustinoSoares/api-context.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <GitBranch className="w-4 h-4" />
            Ver no GitHub
          </a>
        </div>

        {/* Acções */}
        <div className="px-6 py-5 mt-auto flex flex-col gap-2">
          <SheetClose asChild>
            <Button className="w-full" size="lg">
              <LogIn className="w-4 h-4 mr-2" /> Login
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button className="w-full" size="lg" variant="outline">
              <UserPlus className="w-4 h-4 mr-2" /> Criar conta
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
