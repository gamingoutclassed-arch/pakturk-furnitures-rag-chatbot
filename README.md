# PakTurk Furnitures RAG chatbot

A deployable Next.js 16 customer-support chatbot. The browser calls `/api/chat`; Pinecone search, OpenAI generation, and ingestion remain server-side.

## Environment variables in Vercel

In the Vercel project, open **Settings → Environment Variables** and add these to the environments you deploy:

```text
PINECONE_API_KEY=
PINECONE_INDEX_NAME=pakturk-demo
PINECONE_INDEX_HOST=
  GROQ_API_KEY=
INGEST_SECRET=
```

`PINECONE_INDEX_HOST` is the host for the existing `pakturk-demo` index. `INGEST_SECRET` should be a long random secret and must never be exposed in client code.

## Ingest the verified knowledge

After deployment, run the protected route once from a secure terminal or API client. Do not put the secret in the browser:

```bash
curl -X POST https://YOUR-DOMAIN.vercel.app/api/ingest \\
  -H "Authorization: Bearer YOUR_INGEST_SECRET"
```

A successful response reports the `pakturk` namespace and number of uploaded records. The route uses Pinecone integrated embeddings and the configured `text` field; it does not generate embeddings or set vector dimensions manually.

## Test the chatbot

Open the deployed URL and select a suggested question or type your own. For a direct API check:

```bash
curl -X POST https://YOUR-DOMAIN.vercel.app/api/chat \\
  -H "Content-Type: application/json" \\
  -d '{"message":"Where are your showrooms?"}'
```

The answer is grounded only in records retrieved from Pinecone. If no retrieved record answers a question, the assistant uses the configured fallback response.

## Redeploy after changes

Commit and push changes to the connected Git branch, or use **Deployments → Redeploy** in Vercel. Environment variable changes require a new deployment to be available to the deployed functions. Run ingestion again after changing the knowledge documents.

## Notes

- The API routes explicitly use the Node.js runtime.
- Pinecone namespace: `pakturk`.
- The ingestion route accepts `Authorization: Bearer <INGEST_SECRET>` or `x-ingest-secret`.
- Do not commit `.env` files, API keys, or the ingestion secret.
