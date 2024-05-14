import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { formatDate } from 'pliny/utils/formatDate'

const useQuery = () => {      
	const [blogs, setBlogs] = useState([]);
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
                const data = await fetch('http://localhost:8000/api/blog', requestOptions)
                .then( res => res.json())
				.then( data => {
					return data.data
				})
				.catch(err => console.log(err))

                if (data) {
                    setBlogs(data);
                    setLoading(false);
                } else {
                    setError('Blogs not found.');
                }
			} catch (err) {
                setLoading(false);
                setError(err?.message || 'Something went wrong.');
			}
		})();
	}, []);

	return { blogs, isLoading, error };
};

const Home = () => {
    const { blogs, isLoading, error } = useQuery()
    return ( 
        <>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        Hi, I am David
                    </h1>
                    <p className="text-lg leading-7 text-gray-500">
                        Welcome to my blog - I am an Engineering student and I like developing projects and blogging about them. Have a good read!
                    </p>
                </div>
                <ul>
                {isLoading && <div>Loading...</div>}
                {error && <div>{error}.</div>}
                {blogs.map((blog) => {
                    const { id, category, created_at, title, image, body, slug } = blog
                    return (
                        <li key={id} className="py-4">
                            <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                                <dl>
                                    <dt className="sr-only">Published on</dt>
                                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                        <time dateTime={created_at}>{formatDate(created_at, 'en-GB')}</time>
                                    </dd>
                                </dl>
                                <div className="space-y-3 xl:col-span-3">
                                    <div>
                                        <h3 className="text-2xl font-bold leading-8 tracking-tight">
                                            <Link to={`/blog/${slug}`} className="text-gray-900">
                                                {title} 
                                            </Link>
                                        </h3>
                                        <img src={image} alt="BlogImage" width={200} height={200} />
                                        <div className="flex flex-wrap">
                                            {category}
                                        </div>
                                    </div>
                                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                                        {body}
                                    </div>
                                    <div className="text-base font-medium leading-6">
                                        <Link
                                            to={`/blog/${slug}`}
                                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                            aria-label={`Read more: "${title}"`}>
                                            Read more &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        </li>
                    )
                })}
                </ul>
            </div>
        </>
    );
}
export default Home;