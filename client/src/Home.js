import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import { formatDate } from 'pliny/utils/formatDate';

const useQuery = () => {      
	const [blogs, setBlogs] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false)

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
	}, [isDeleted]);

	return { blogs, isLoading, error, isDeleted, setIsDeleted };
};

const Home = () => {
    const handleDelete = (id) => {
        const blog = { 
            "id": id
        };

        fetch("http://localhost:8000/api/blog", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(()=>(setIsDeleted(!isDeleted)))
    }
    
    const { blogs, isLoading, error, isDeleted, setIsDeleted } = useQuery()
    return ( 
        <>
            <div data-testid="mainDiv" className="divide-y divide-gray-200 dark:divide-gray-700 bg-cyan-100">
                <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        Hi, Welcome to David's Sport Blog
                    </h1>
                    <p className="text-lg leading-7 text-gray-500">
                        Welcome to my blog - I am an Computer Engineering student and I like talking and writing about sports. Have a good read (all opinions are mine)!
                    </p>
                </div>
                <ul className="flex justify-between flex-wrap">
                {isLoading && <div>Loading...</div>}
                {error && <div>{error}.</div>}
                {blogs.map((blog, index) => {
                    // eslint-disable-next-line no-unused-vars
                    const { id, category, created_at, title, image, body, slug } = blog
                    console.log(index, title)
                    return (
                        <li key={id} className="py-4 w-[45%]">
                            <article className="flex flex-col border border-b-2 p-1">
                                <dl>
                                    <dt className="sr-only">Published on</dt>
                                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                        {/* <time dateTime={created_at}>{formatDate(created_at, 'en-GB')}</time> */}
                                    </dd>
                                </dl>
                                <div className="space-y-3 xl:col-span-3 m-auto">
                                    <div className="flex flex-col items-center">
                                        <h3 className="text-2xl font-bold leading-8 tracking-tight mb-1">
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
                                    <div className="text-base font-medium leading-6 flex justify-between items-center mb-2 pb-2 p-2">
                                        <Link
                                            to={`/blog/${slug}`}
                                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                            aria-label={`Read more: "${title}"`}>
                                            Read more &rarr;
                                        </Link>
                                        <button data-testid={`delBtn${index}`} className="p-2 text-white bg-red-400 rounded-sm shadow-sm" onClick={()=>(handleDelete(id))}>Delete</button>
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