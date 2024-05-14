import { Link } from "react-router-dom";

const Home = () => {
    return ( 
        <>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        Hi, I am David
                    </h1>
                    <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                        Welcome to my blog - I am an Engineering student and I like developing projects and blogging about them. Have a good read!
                    </p>
                </div>
                <ul>
                {/* {!filteredBlogPosts.length && 'No posts found.'}
                {displayPosts.map((post) => {
                    const { path, date, title, summary, tags } = post
                    return ( */}
                    <li className="py-4">
                        <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                        <dl>
                            <dt className="sr-only">Published on</dt>
                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            {/* <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time> */}asas
                            </dd>
                        </dl>
                        <div className="space-y-3 xl:col-span-3">
                            <div>
                            <h3 className="text-2xl font-bold leading-8 tracking-tight">
                                {/* <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100"> */}
                                {/* {title} */} sdsdsds
                                {/* </Link> */}
                            </h3>
                            <div className="flex flex-wrap">
                                sdsdsd
                                {/* {tags?.map((tag) => <Tag key={tag} text={tag} />)} */}
                            </div>
                            </div>
                            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {/* {summary} */} sdsdsds
                            </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "#"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                        </article>
                    </li>
                    {/* )
                })} */}
                </ul>
            </div>
        </>
    );
}
export default Home;