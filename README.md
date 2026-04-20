# Context AI

> Assistente inteligente para análise de documentos com RAG (Retrieval-Augmented Generation)

O Context AI permite que faças upload de documentos (PDF, TXT, DOCX) e converses com eles através de linguagem natural. A aplicação usa embeddings semânticos para encontrar os trechos mais relevantes do documento e gera respostas contextualizadas via LLM.

---

## Tecnologias

### Backend
- **Python 3.11** com **FastAPI**
- **PostgreSQL** + **pgvector** — armazenamento de embeddings
- **SQLAlchemy** + **Alembic** — ORM e migrações
- **sentence-transformers** (`all-MiniLM-L6-v2`) — geração de embeddings (384 dims)
- **Groq** (`llama-3.3-70b-versatile`) — geração de respostas
- **PyMuPDF** + **python-docx** — parsing de documentos
- **Uvicorn** — servidor ASGI

### Frontend
- **Next.js** (App Router)
- **TanStack Query** — gestão de estado assíncrono
- **Tailwind CSS** — estilos
- **react-markdown** — renderização de respostas em markdown

---

## Arquitectura

```
┌─────────────┐        ┌──────────────────────────────────┐
│  Frontend   │  HTTP  │           Backend (FastAPI)       │
│  (Next.js)  │ ──────▶│  /upload  →  chunks + embeddings │
│             │        │  /ask     →  RAG + Groq LLM       │
└─────────────┘        └──────────────┬───────────────────┘
                                       │
                              ┌────────▼────────┐
                              │  PostgreSQL      │
                              │  + pgvector      │
                              └─────────────────┘
```

**Fluxo de upload:**
1. Ficheiro enviado via `multipart/form-data`
2. Parser extrai o texto (PDF/DOCX/TXT)
3. Texto dividido em chunks
4. Cada chunk é convertido em embedding (384 dims)
5. Embeddings guardados no PostgreSQL via pgvector

**Fluxo de pergunta:**
1. Pergunta convertida em embedding
2. Busca por similaridade coseno (`<->`) no pgvector
3. Top 5 chunks mais relevantes enviados ao Groq como contexto
4. Resposta gerada e devolvida ao frontend

---

## Pré-requisitos

- Python 3.11
- Node.js 18+
- PostgreSQL 16+ com extensão `pgvector`
- Conta no [Groq](https://console.groq.com) para obter a API key

---

## Instalação

### 1. Clona o repositório

```bash
git clone https://github.com/JustinoSoares/api-context.ai.git
cd api-context.ai
```

### 2. Backend

```bash
# Cria e activa o ambiente virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instala o PyTorch CPU (evita baixar versão CUDA desnecessária)
pip install torch --index-url https://download.pytorch.org/whl/cpu

# Instala as dependências
pip install -r requirements.txt
```

Cria o ficheiro `.env` na raiz do backend:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/context_ia
GROQ_API_KEY=a_tua_chave_aqui
```

Cria a base de dados e corre as migrações:

```bash
# Activa a extensão pgvector no PostgreSQL
psql -U postgres -c "CREATE DATABASE context_ia;"
psql -U postgres -d context_ia -c "CREATE EXTENSION IF NOT EXISTS vector;"

# Corre as migrações
alembic upgrade head
```

Inicia o servidor:

```bash
uvicorn app.main:app --reload
```

A API fica disponível em `http://localhost:8000`.

---

### 3. Frontend

```bash
cd frontend  # ou o nome da tua pasta
npm install
```

Cria o ficheiro `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Inicia o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend fica disponível em `http://localhost:3000`.

---

## Com Docker

A forma mais simples de correr o projecto completo:

```bash
# Copia o .env
cp .env.example .env
# Edita o .env com a tua GROQ_API_KEY

docker compose up --build
```

Depois corre as migrações:

```bash
docker compose exec api alembic upgrade head
```

Serviços disponíveis:
- API: `http://localhost:8000`
- PostgreSQL: `localhost:5432`

---

## Variáveis de Ambiente

### Backend (`.env`)

| Variável | Descrição | Exemplo |
|---|---|---|
| `DATABASE_URL` | URL de conexão ao PostgreSQL | `postgresql://postgres:postgres@localhost:5432/context_ia` |
| `GROQ_API_KEY` | Chave da API do Groq | `gsk_...` |

### Frontend (`.env.local`)

| Variável | Descrição | Exemplo |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL base da API | `http://localhost:8000` |

---

## Estrutura do Projecto

```
api-context-ai/
├── app/
│   ├── core/
│   │   ├── config.py          # Variáveis de ambiente
│   │   ├── database.py        # Sessão SQLAlchemy
│   │   └── errors.py          # Tratamento de erros centralizado
│   ├── modules/
│   │   ├── documents/
│   │   │   ├── models.py      # Modelos Document e DocumentChunk
│   │   │   ├── routes.py      # POST /upload
│   │   │   └── service.py     # Lógica de processamento
│   │   ├── embeddings/
│   │   │   └── service.py     # sentence-transformers
│   │   ├── llm/
│   │   │   └── groq_client.py # Integração Groq
│   │   └── rag/
│   │       ├── routes.py      # POST /ask
│   │       └── service.py     # Busca por similaridade + geração
│   ├── utils/
│   │   ├── chunker.py         # Divisão de texto em chunks
│   │   └── file_parser.py     # Parser PDF/DOCX/TXT
│   └── main.py
├── alembic/                   # Migrações da base de dados
├── Dockerfile
├── docker-compose.yml
└── requirements.txt
```

---

## API

### `POST /upload`

Faz upload de um documento e processa os embeddings.

**Request:** `multipart/form-data`
- `file` — ficheiro PDF, TXT ou DOCX (máx. 10MB)

**Response:**
```json
{ "document_id": "uuid-do-documento" }
```

**Erros comuns:**
- `415` — extensão não permitida
- `413` — ficheiro demasiado grande

---

### `POST /ask`

Faz uma pergunta sobre um documento já carregado.

**Request:**
```json
{
  "question": "Qual é o diagnóstico?",
  "document_id": "uuid-do-documento"
}
```

**Response:**
```json
{ "answer": "Resposta gerada pelo modelo..." }
```

---

## Contribuir

1. Faz fork do repositório
2. Cria uma branch para a tua feature: `git checkout -b feature/nome-da-feature`
3. Faz commit das tuas alterações: `git commit -m "feat: descrição da feature"`
4. Faz push da branch: `git push origin feature/nome-da-feature`
5. Abre um Pull Request

### Convenção de commits

Usa [Conventional Commits](https://www.conventionalcommits.org/):

| Prefixo | Uso |
|---|---|
| `feat:` | Nova funcionalidade |
| `fix:` | Correcção de bug |
| `docs:` | Documentação |
| `refactor:` | Refactorização sem mudança de comportamento |
| `chore:` | Tarefas de manutenção |

---

## Licença

MIT