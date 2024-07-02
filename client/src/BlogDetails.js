import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const postDateTemplate = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
}

const useQuery = (slug) => {      
	const [blog, setBlog] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				const requestOptions = {
					method: "GET",
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				}
                setLoading(true);
                const data = await fetch(`http://localhost:8000/api/blog/slug/${slug}`, requestOptions)
                .then( res => res.json())
				.then( data => {
					return data.data
				})
				.catch(err => console.log(err))

                if (data) {
                    setBlog(data);
                    setLoading(false);
                } else {
                    setError('Blog not found.');
                }
			} catch (err) {
                setError(err?.message || 'Something went wrong.');
                setLoading(false);
			}
		})();
	}, [slug]);

	return { blog, isLoading, error };
};

const BlogDetails = () => {
    const { slug } = useParams();
    const { blog, isLoading, error } = useQuery(slug)
    const history = useHistory();

    const [newBody, setNewBody] = useState('');

    useEffect(() => {
      setNewBody(blog.body)
    }, [blog])

    const handleNameInputChange = (e)=>{
        setNewBody(e.target.value)
        console.log(newBody)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedBlog = { 
            "id": blog.id,
        "slug": blog.slug,
        "image": blog.image,
        "title": blog.title,
        "body": newBody,
        "category": blog.category,
        "category_id": blog.category_id,
        "author": blog.author,
        "created_at": blog.created_at,
        "updated_at": blog.updated_at 
        };


        fetch(`http://localhost:8000/api/blog/${blog.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedBlog)
        }).then(() => {
            console.log("Blog edited successfully!");
            history.push("/");
        })
    }

    return ( 
        <>
            <article>
                {isLoading && <div>Loading...</div>}
                {error && <div>{error}.</div>}
                {blog && (
                    <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
                        <header className="pt-6 xl:pb-6">
                            <div className="space-y-1 text-center">
                            <dl className="space-y-10">
                                {blog.created_at && (
                                    <div>
                                        <dt className="sr-only">Published on</dt>
                                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                            <time dateTime={blog.created_at}>
                                                {new Date(blog.created_at).toLocaleDateString('en-GB', postDateTemplate)}
                                            </time>
                                        </dd>
                                    </div>
                                )}
                            </dl>
                            <div>
                                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                                    {blog.title}
                                </h1>
                            </div>
                            </div>
                        </header>
                        <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
                            <dl className="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
                                <dt className="sr-only">Authors</dt>
                                <dd>
                                    <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                                        <li className="flex items-center space-x-2">
                                            {blog?.image && (
                                                <img
                                                src={blog.image}
                                                width={38}
                                                height={38}
                                                alt="avatar"
                                                className="h-10 w-10 rounded-full"
                                                />
                                            )}
                                            <dl className="whitespace-nowrap text-sm font-medium leading-5">
                                                <dt className="sr-only">Name</dt>
                                                <dd className="text-gray-900">{blog.author}</dd>
                                            </dl>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                                <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{blog.body}</div>
                            </div>
                            <footer>
                                <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                                    {blog.category && (
                                        <div className="py-4 xl:py-8">
                                            <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                                Category
                                            </h2>
                                            <div className="flex flex-wrap">
                                            <Link
                                                to={`#`}
                                                className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600"
                                                >
                                                {blog.category}
                                            </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <form className="min-h-64 border flex flex-col items-center p-4 justify-between" onSubmit={handleSubmit}>
                                <textarea type="text" value={newBody} onChange={(e)=>handleNameInputChange(e)} className="border p-2 min-h-40 w-full" />
                                <button type="submit" className="border p-1 bg-cyan-600 text-white">Edit Content</button>
                                </form>
                                <div className="pt-4 xl:pt-8">
                                    <Link
                                        to={`/`}
                                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                        aria-label="Back to the blog"
                                    >
                                        &larr; Back to the blog
                                    </Link>
                                </div>
                                </footer>
                        </div>
                    </div>
                )}
            </article>
        </>
    );
}
export default BlogDetails;