import Prismic from '@prismicio/client';
import { DefaultClient } from '@prismicio/client/types/client';

const endPoint = process.env.PRISMIC_API_ENDPOINT || 'https://api.prismic.io';

export function getPrismicClient(req?: unknown): DefaultClient {
  const prismic = Prismic.client(endPoint, {
    req,
  });

  return prismic;
}
