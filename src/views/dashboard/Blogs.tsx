import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import BlogsService from 'src/services/blogs.service';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, GlobalStyles, MenuItem, TableFooter, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box } from '@mui/system';

const service = new BlogsService();

export default function Blogs() {
    const [rows, setRows] = useState([]);
    const [count, setCount] = useState([]);
    const [open, setOpen] = useState(false);
    const [trueChecked, setTrueChecked] = useState(false);
    const [falseChecked, setFalseChecked] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleTrueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTrueChecked(event.target.checked);
    };

    const handleFalseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFalseChecked(event.target.checked);
    };

    useEffect(() => {
        loadData();
    }, [])

    const loadData = function () {
        service.GetAll({ skip: 0, take: 10, orderBy: 'title' })
            .then(res => setRows(() => res.data.data))

        service.Count().then(res => setCount(() => res.data.count))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
    }

    const editBlog = function () {

    }

    const deleteBlog = function () {

    }

    return (
        <React.Fragment>
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
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                            </div>

                            <div className='dialog_content'>
                                <p>Published:</p>

                                <div>
                                    <Checkbox
                                        checked={trueChecked}
                                        onChange={handleTrueChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    True
                                </div>

                                <div>
                                    <Checkbox
                                        checked={falseChecked}
                                        onChange={handleFalseChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
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
                                    type="datetime-local"
                                    variant="standard"
                                />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type='submit' variant='contained' onClick={handleClose}>Save</Button>
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
                            <TableCell >{row.published}</TableCell>
                            <TableCell>{row.publishedDate}</TableCell>
                            <TableCell><Button sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }} onClick={editBlog}><EditIcon />Edit</Button></TableCell>
                            <TableCell><Button sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }} onClick={deleteBlog}><DeleteForeverIcon />Delete</Button></TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell sx={{ width: 120 }} colSpan={2}><b>Total: {count} blogs</b></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
