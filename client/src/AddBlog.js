import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const AddBlog = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    
    useEffect(() => {
		(async () => {
				const requestOptions = {
					method: "GET",
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				}
                const data = await fetch('http://localhost:8000/api/category', requestOptions)
                .then( res => res.json())
				.then( data => {
					return data.data
				})
				.catch(err => console.log(err))
                if (data) {
                    setCategories(data);
                }
		})();
	}, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { 
            "title": title, 
            "body": body, 
            "category_id": categoryId 
        };

        setIsLoading(true);

        fetch("http://localhost:8000/api/blog", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            console.log("Blog added successfully!");
            setIsLoading(false);
            history.push("/");
        })
    }

    return ( 
        <div className="w-4/5 md:w-9/12 mx-auto md:mt-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4 flex flex-col justify-center items-center">
                <h1 className="text-2xl text-gray-700 font-semibold">New Blog</h1>
                <div className="my-2 w-full md:w-3/5">
                    <label className="block text-gray-700 text-lg font-bold mb-2">
                        Title
                    </label>
                    <input 
                        onChange={ (e) => setTitle(e.target.value)}
                        id="name" type="text" placeholder="Title" value={title}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    />
                </div>
                <div className="my-2 w-full md:w-3/5">
                    <label className="block text-gray-700 text-lg font-bold mb-2">
                        Blog Content
                    </label>
                    <textarea 
                        onChange={ (e) => setBody(e.target.value)}
                        id="content" value={body}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
                    />
                </div>
                <div className="my-2 w-full md:w-3/5">
                    <label className="block text-gray-700 text-lg font-bold mb-2">
                        Category
                    </label>
                    <select
                        value={categoryId}
                        onChange={ (e) => setCategoryId(e.target.value)}
                    >
                        {categories && (
                            categories.map((category) => (
                                <option value={category.id} key={category.id}>{category.title}</option>
                            ))
                        )}
                    </select>
                </div>
                { !isLoading && 
                    <button className="mt-4 w-3/5 md:w-1/5 bg-primary-500 hover:bg-primary-700 text-white text-lg font-bold py-1 px-2 rounded-lg focus:outline-none focus:shadow-outline" type="submit">
                        Add
                    </button>
                }
                { isLoading && 
                    <p className="w-3/5 md:w-1/5">
                        Adding blog...
                    </p>
                }
            </form>
        </div>
     );
}
 
export default AddBlog;