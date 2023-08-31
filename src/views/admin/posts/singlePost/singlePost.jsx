import { BsTrash } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { doApiMethod } from "../../../../api/services/axios-service/axios-service";

const SinglePost = ({ post, setIsChange }) => {
    const nav = useNavigate();
    const changeActive = async (_id) => {
        const url = `/posts/changeActive/${_id}`;
        await doApiMethod(url, "PATCH");
    };
    const deletePost = async (_id, postName) => {
        if (window.confirm(`Are you sure you want to delete ${postName}`)) {
            const url = `/posts/${_id}`;
            await doApiMethod(url, "DELETE");
        }
    };

    return (
        <tr>
            <td>
                <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8">
                        <img
                            className="w-full h-full rounded-full"
                            src={post?.img[0]?.url}
                            alt={post?.img}
                        />
                    </div>
                    <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">{post?.title}</p>
                    </div>
                </div>
            </td>
            <td>
                <p onClick={() => nav(`/admin/profile/${post?.creator_id?._id}`)}
                    className="btn relative inline-block px-2 py-1 leading-tight cursor-pointer text-gray-900 whitespace-no-wrap hover:text-red-300">
                    {post?.creator_id?.fullName?.firstName}{" "}
                    {post?.creator_id?.fullName?.lastName}
                </p>
            </td>
            <td>
                <p className="text-gray-900 whitespace-no-wrap">
                    {post?.country} - {post?.city}
                </p>
            </td>
            <td>
                <p className="text-gray-900 whitespace-no-wrap">{post?.category_url}</p>
            </td>
            <td>
                <p className="text-gray-900 whitespace-no-wrap">
                    {new Date(post?.createdAt).toLocaleDateString()}{" "}
                    {new Date(post?.createdAt).toLocaleTimeString()}
                </p>
            </td>
            <td>
                <p className="text-gray-900 whitespace-no-wrap">
                    {new Date(post?.updatedAt).toLocaleDateString()}{" "}
                    {new Date(post?.updatedAt).toLocaleTimeString()}
                </p>
            </td>
            <td>
                <p className="text-gray-900 whitespace-no-wrap">
                    {new Date(post?.available_from).toLocaleDateString()}{" "}
                    {new Date(post?.available_from).toLocaleTimeString()}
                </p>
            </td>
            <td>
                <span
                    onClick={() => {
                        changeActive(post?._id);
                        setIsChange(true);
                    }}
                    className="btn relative inline-block px-3 py-1 font-semibold leading-tight cursor-pointer"
                >
                    <span
                        aria-hidden
                        className={
                            post?.active
                                ? "absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                : "absolute inset-0 bg-red-400 opacity-50 rounded-full"
                        }
                    ></span>
                    <span className="relative">{String(post?.active)}</span>
                </span>
            </td>
            <td>
                <span
                    onClick={() => {
                        deletePost(post._id, post.title);
                        setIsChange(true);
                    }}
                    className="btn relative cursor-pointer inline-block px-2 py-2 font-semibold leading-tight hover:text-red-900"
                >
                    <span
                        aria-hidden
                        className={"absolute inset-0 bg-red-200 opacity-50 rounded-full"}
                    ></span>
                    <span className="relative">
                        <BsTrash />
                    </span>
                </span>
            </td>
        </tr>
    );
};

export default SinglePost;
