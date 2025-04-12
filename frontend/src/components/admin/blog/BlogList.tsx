interface Post {
  id: number;
  title: string;
}

export default function BlogList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <form action="/search" method="GET">
        <input
          type="search"
          name="q"
          placeholder="Search..."
        />
      </form>
      
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <div>
              <a href={`/view/${post.id}`}>View</a>
              <a href={`/edit/${post.id}`}>Edit</a>
              <form 
                action={`/delete/${post.id}`} 
                method="POST" 
                style={{ display: 'inline' }}
              >
                <button type="submit">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}