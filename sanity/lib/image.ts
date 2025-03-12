import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource | null) => {
  if (!source || typeof source === 'string' || !('asset' in source)) return '';
  return builder.image(source).auto('format').fit('max').url() || '';
};
