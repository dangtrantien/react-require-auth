import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import BlogsService from 'src/services/blogs.service';
import { Alert, AlertTitle, Button, Checkbox, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, GlobalStyles, MenuItem, TableFooter, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box } from '@mui/system';

const service = new BlogsService();

export default function Blogs() {
    const [rows, setRows] = useState([]);
    const [count, setCount] = useState([]);
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(-1);
    const [trueChecked, setTrueChecked] = useState(false);
    const [falseChecked, setFalseChecked] = useState(false);
    const [formData, setFormData] = useState({
        _id: '',
        title: '',
        description: '',
        published: false,
        publishedDate: '',
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = function () {
        service.GetAll({ skip: 0, take: 20, orderBy: 'title' })
            .then(res => setRows(() => res.data.data))

        service.Count().then(res => setCount(() => res.data.count))
    };

    const handleClickOpen = () => {
        setFormData({
            _id: '',
            title: '',
            description: '',
            published: true || false,
            publishedDate: '',
        });
        setTrueChecked(false);
        setFalseChecked(false);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleTrueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        setTrueChecked(event.target.checked);
        if (trueChecked === false) {
            setFalseChecked(false);
            setFormData({ ...formData, [name]: true });
        }
    };

    const handleFalseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        setFalseChecked(event.target.checked);
        if (falseChecked === false) {
            setTrueChecked(false);
            setFormData({ ...formData, [name]: false });
        }
    };

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        var blog = {
            title: data.get('title'),
            description: data.get('description'),
            published: data.get('published'),
            publishedDate: data.get('publishedDate'),
        };

        if (formData.published === false || null) {
            blog.publishedDate = '';

            service.AddNewBlog(blog).then(res => {
                if (res.data.success === true) {
                    setSuccess(1);
                    setOpen(false);
                    loadData();
                }
            }).catch(() => {
                setSuccess(0);
            }).finally(() => {
                setTimeout(() => setSuccess(-1), 3000)
            })
        }

        else {
            service.AddNewBlog(blog).then(res => {
                if (res.data.success === true) {
                    setSuccess(1);
                    setOpen(false);
                    loadData();
                }
            }).catch(() => {
                setSuccess(0);
            }).finally(() => {
                setTimeout(() => setSuccess(-1), 3000)
            })
        }
    };

    const editBlog = function (blog: any) {
        setFormData(blog);
        if (blog.published === true) {
            setTrueChecked(true);
            setFalseChecked(false);
        }
        else if (blog.published === false) {
            setTrueChecked(false);
            setFalseChecked(true);
        }
        else {
            setTrueChecked(false);
            setFalseChecked(false);
        }
        setOpen(true);
    };

    const deleteBlog = function (id: any) {
        service.DeleteBlog(id).then(res => {
            if (res.data.success === true) {
                setSuccess(1);
                setOpen(false);
                loadData();
            }
        }).catch(() => {
            setSuccess(0);
        }).finally(() => {
            setTimeout(() => setSuccess(-1), 3000)
        })
    };

    return (
        <React.Fragment>
            <Collapse in={success === 1}>
                <Alert variant='filled' severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Successfuly add new blog
                </Alert>
            </Collapse>

            <Collapse in={success === 0}>
                <Alert variant='filled' severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Something wrong! Please contact to admin for more information
                </Alert>
            </Collapse>

            <GlobalStyles styles={{
                '.table_header': {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                },
                '.dialog_content': {
                    display: 'flex',
                    alignItems: 'baseline',
                },
                '.dialog_content p': {
                    marginRight: 10,
                },
            }} />

            <div className='table_header'>
                <Title>Blog list</Title>

                <Button variant="outlined" onClick={handleClickOpen}>
                    Create new blog
                </Button>

                <Dialog open={open} onClose={handleClose}>
                    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <DialogTitle>Blog detail</DialogTitle>

                        <DialogContent sx={{ width: 600 }}>
                            <div style={{ display: 'none' }} className='dialog_content'>
                                <p>Id:</p>

                                <TextField
                                    required
                                    autoFocus
                                    name='_id'
                                    id='_id'
                                    type="text"
                                    value={formData._id}
                                    onChange={handleTextFieldChange}
                                    fullWidth
                                    variant="standard"
                                />
                            </div>

                            <div className='dialog_content'>
                                <p>Title:</p>

                                <TextField
                                    required
                                    autoFocus
                                    name='title'
                                    id='title'
                                    label='Blog title'
                                    value={formData.title}
                                    onChange={handleTextFieldChange}
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                            </div>

                            <div className='dialog_content'>
                                <p>Description:</p>

                                <TextField
                                    required
                                    autoFocus
                                    name='description'
                                    id='description'
                                    value={formData.description}
                                    onChange={handleTextFieldChange}
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                            </div>

                            <div className='dialog_content'>
                                <p>Published:</p>

                                <div>
                                    <Checkbox
                                        id='true'
                                        name='published'
                                        value={formData.published}
                                        checked={trueChecked}
                                        onChange={handleTrueChange}
                                        inputProps={{ 'aria-label': 'true' }}
                                    />
                                    True
                                </div>

                                <div>
                                    <Checkbox
                                        id='false'
                                        name='published'
                                        value={formData.published}
                                        checked={falseChecked}
                                        onChange={handleFalseChange}
                                        inputProps={{ 'aria-label': 'false' }}
                                    />
                                    False
                                </div>
                            </div>

                            <div className='dialog_content'>
                                <p>PublishedDate:</p>

                                <TextField
                                    autoFocus
                                    name='publishedDate'
                                    id='publishedDate'
                                    value={formData.publishedDate}
                                    onChange={handleTextFieldChange}
                                    type='date'
                                    variant="standard"
                                />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type='submit' variant='contained' >Save</Button>
                        </DialogActions>
                    </Box>
                </Dialog>
            </div>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell></TableCell>
                        <TableCell>Id</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Published</TableCell>
                        <TableCell>PublishedDate</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row: any, index: number) => (
                        <TableRow key={row._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell><Checkbox /></TableCell>
                            <TableCell><Button>{row._id}</Button></TableCell>
                            <TableCell>{row.title}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell >
                                {row.published === false ? 'False' : row.published === true ? 'True' : row.published}
                            </TableCell>
                            <TableCell>
                                {row.publishedDate === '' ? 'Not publish' : row.publishedDate}
                            </TableCell>
                            <TableCell><Button sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }} onClick={() => editBlog(row)}><EditIcon />Edit</Button></TableCell>
                            <TableCell><Button sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }} onClick={() => deleteBlog(row._id)}><DeleteForeverIcon />Delete</Button></TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell colSpan={3}><b>Total: {count} blogs</b></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
