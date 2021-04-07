import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {

    return (
        <div>
            <br></br>
            <Table striped bordered>
                <tbody>
                    {blogs.map(blog =>
                        <tr key={blog.id}>
                            <td>
                                <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default BlogList