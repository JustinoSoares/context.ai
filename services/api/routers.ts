// services/user.service.ts
export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://127.0.0.1:8000/upload", {
    method: "POST",
    body: formData,
    // NÃO defines Content-Type — o browser faz isso automaticamente com o boundary correcto
  });

  if (!res.ok) {
    const error = await res.json();
    return Promise.reject(new Error(error.message || "Erro ao fazer upload"));
  }

  return res.json(); // { document_id: "..." }
}

export async function ask(question: string, document_id: string) {
  const res = await fetch("http://127.0.0.1:8000/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question, document_id }),
  });

  if (!res.ok) {
    const error = await res.json();
    return Promise.reject(new Error(error.message || "Erro ao fazer pergunta"));
  }

  return res.json();
}
