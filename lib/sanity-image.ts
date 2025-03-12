import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanity';
import { Image } from 'sanity';

const builder = imageUrlBuilder(client);

export function urlForImage(source: Image) {
  return builder.image(source);
}
