import { getAllPostsFromNotion } from '@/services/posts';

export default async function CachePage() {
  let allPosts = [];

  try {
    allPosts = await getAllPostsFromNotion();

    if (!Array.isArray(allPosts) || allPosts.length === 0) {
      console.error('No posts found or fetched data is not an array.');
      return <div>No posts available.</div>;
    }
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return <div>Failed to load posts.</div>;
  }

  return (
    <div id="posts">
      {allPosts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          {/* Render other post details here */}
        </div>
      ))}
    </div>
  );
}
