import React from 'react'

const BlogList = ({ blogs }) => {
    const style = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        blogs.map(blog =>
            <div key={blog.id} style={style}>
                <a href={`/blogs/${blog.id}`}>{blog.title} {blog.author}</a>
            </div>
        )
    )
}

export default BlogList