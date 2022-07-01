import { Box, CardMedia, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogsService from "src/services/blogs.service";
import Title from "./Title";

const service = new BlogsService();

export default function BlogDetail() {
    const { blogId } = useParams();

    var [blog, setBlog] = useState({
        title: 'String',
        description: 'String',
        published: true,
        publishedDate: 'String',
    });

    useEffect(() => {
        service.FindById(blogId).then(res => {
            console.log('data', res.data);
            setBlog(res.data);
        })
    }, []);

    return (
        <React.Fragment>
            <Box sx={{
                width: 700,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
            }}>
                <Paper elevation={4} sx={{
                    padding: 5,
                    'div': {
                        display: 'flex',
                        alignItems: 'center',
                    },
                    'div span': {
                        marginLeft: 2
                    },
                }}>
                    <h1>{blog.title}</h1>

                    <div>
                        <Title>Id: </Title>
                        <span>{blogId}</span>
                    </div>

                    <div>
                        <Title>Title: </Title>
                        <span>{blog.title}</span>
                    </div>

                    <div>
                        <Title>Description: </Title>
                        <span>{blog.description}</span>
                    </div>

                    <div>
                        <Title>Published: </Title>
                        <span>{blog.published === true ? 'True' : blog.published === false ? 'False' : blog.published === null ? 'False' : blog.published}</span>
                    </div>

                    <div>
                        <Title>PublishedDate: </Title>
                        <span>{blog.publishedDate}</span>
                    </div>

                    <CardMedia
                        component="img"
                        sx={{
                            width: 200,
                            height: 200,
                            position: 'absolute',
                            top: 50,
                            right: 50,
                        }}
                        image=""
                        alt="Avatar here"
                    />
                </Paper>
            </Box>
        </React.Fragment>
    )
}