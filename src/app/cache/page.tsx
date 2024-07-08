import { getAllPostsFromNotion } from '@/services/posts';

export default async function CachePage() {
  const allPosts = await getAllPostsFromNotion();

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
