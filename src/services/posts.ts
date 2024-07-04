import { getRecordMap, mapImageUrl } from '@/libs/notion';
import { Post } from '@/types/post';
import { getBlurImage } from '@/utils/get-blur-image';

export async function getAllPostsFromNotion() {
  const allPosts: Post[] = [];
  const recordMap = await getRecordMap(process.env.NOTION_DATABASE_ID!);
  const { block, collection } = recordMap;
  const schema = Object.values(collection)[0].value.schema;
  const propertyMap: Record<string, string> = {};

  Object.keys(schema).forEach((key) => {
    propertyMap[schema[key].name] = key;
  });

  Object.keys(block).forEach((pageId) => {
    const pageBlock = block[pageId].value;
    if (pageBlock.type === 'page' && pageBlock.properties?.[propertyMap['Slug']]) {
      const { properties, last_edited_time } = pageBlock;

      const contents = pageBlock.content || [];
      const dates = contents.map((content) => {
        return block[content]?.value?.last_edited_time;
      }).filter(Boolean);
      dates.push(last_edited_time);
      dates.sort((a, b) => b - a);
      const lastEditedAt = dates[0];

      const id = pageId;
      const slug = properties[propertyMap['Slug']]?.[0]?.[0] || '';
      const title = properties[propertyMap['Page']]?.[0]?.[0] || '';
      
      // Defensive checks for categories
      const categoryProp = properties[propertyMap['Category']];
      const categories = categoryProp && Array.isArray(categoryProp) && Array.isArray(categoryProp[0]) && categoryProp[0][0]
        ? categoryProp[0][0].split(',')
        : [];
      
      // Defensive checks for cover
      const coverProp = properties[propertyMap['Cover']];
      const cover = coverProp && Array.isArray(coverProp) && Array.isArray(coverProp[0]) && Array.isArray(coverProp[0][1]) && Array.isArray(coverProp[0][1][0]) && coverProp[0][1][0][1]
        ? coverProp[0][1][0][1]
        : '';
      
      // Defensive checks for date
      const dateProp = properties[propertyMap['Date']];
      const date = dateProp && Array.isArray(dateProp) && Array.isArray(dateProp[0]) && Array.isArray(dateProp[0][1]) && Array.isArray(dateProp[0][1][0]) && dateProp[0][1][0][1]?.['start_date']
        ? dateProp[0][1][0][1]['start_date']
        : '';
      
      // Defensive checks for published
      const publishedProp = properties[propertyMap['Published']];
      const published = publishedProp && Array.isArray(publishedProp) && publishedProp[0]?.[0] === 'Yes';

      allPosts.push({
        id,
        title,
        slug,
        categories,
        // Fix 403 error for images.
        // https://github.com/NotionX/react-notion-x/issues/211
        cover: mapImageUrl(cover, pageBlock) || '',
        date,
        published,
        lastEditedAt,
      });
    }
  });

  const blurImagesPromises = allPosts.map((post) => getBlurImage(post.cover));
  const blurImages = await Promise.all(blurImagesPromises);
  allPosts.forEach((post, i) => (post.blurUrl = blurImages[i].base64));

  return allPosts;
}
