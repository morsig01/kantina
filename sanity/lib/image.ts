import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from "../env";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export const urlFor = (source: SanityImageSource | null) => {
  if (!source) {
    return '';
  }
  
  try {
    return imageBuilder
      .image(source)
      .auto('format')
      .fit('max')
      .url();
  } catch (error) {
    console.error('Error generating image URL:', error);
    return '';
  }
};
