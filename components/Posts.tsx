import { Post } from "@/api/api.types";
import { map } from "lodash";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";

const PostItem = ({ title, body, tags, reactions, views }: Post) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-700 mb-4">{body}</p>

    <div className="mb-4">
      <p className="font-medium">Tags:</p>
      <div className="flex flex-wrap gap-2 mt-1">
        {map(tags, (tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    <div className="flex justify-between items-center">
      <div className="text-sm text-gray-600">
        <span className="mr-4">Likes: {reactions.likes}</span>
        <span>Dislikes: {reactions.dislikes}</span>
      </div>
      <div className="text-sm text-gray-600">Views: {views}</div>
    </div>
  </div>
);

function Posts({ posts }: { posts: Post[] }) {
  const renderPost = useCallback(
    (post: Post) => <PostItem {...post} key={post.id} />,
    []
  );
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(renderPost)}
      </div>
    </div>
  );
}

export default observer(Posts);
