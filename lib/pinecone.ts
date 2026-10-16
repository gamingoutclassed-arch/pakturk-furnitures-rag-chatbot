import { Pinecone } from '@pinecone-database/pinecone'

/**
 * Resolves the live Pinecone index host from the index name.
 * This keeps the app from using a stale or mismatched host.
 */
export async function getPakTurkIndex() {
  const apiKey = process.env.PINECONE_API_KEY
  const indexName = process.env.PINECONE_INDEX_NAME

  if (!apiKey || !indexName) {
    throw new Error(
      'Pinecone is not configured. Set PINECONE_API_KEY and PINECONE_INDEX_NAME.'
    )
  }

  const pinecone = new Pinecone({ apiKey })
  const description = await pinecone.describeIndex(indexName)

  if (!description.host) {
    throw new Error('Pinecone returned no host for the configured index.')
  }

  console.info('[Pinecone index]', {
    name: description.name,
    host: description.host,
    dimension: description.dimension,
    metric: description.metric,
    status: description.status,
  })

  return pinecone
    .index(indexName, description.host)
    .namespace('pakturk')
}

