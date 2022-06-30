import { Table, TableHead, TableRow, TableCell, TableBody, GlobalStyles, Checkbox, Button } from "@mui/material";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import UpdateIcon from '@mui/icons-material/Update';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ArtistService from "src/services/artists.service";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, AlertTitle, Box, Collapse, Container, MenuItem } from '@mui/material';

const service = new ArtistService();

const nationality = ['Vietnam', 'Russia', 'USA', 'Norway', 'Holland', 'France', 'Trung Quốc', 'Nhật Bản'];

export default function Artists() {
    const [rows, setRows] = useState([]);
    const [count, setCount] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(-1);
    const [nationality_field, setNationality] = React.useState('');
    const [formData, setFormData] = useState({
        _id: '',
        first_name: '',
        last_name: '',
        nationality: '',
        year_born: undefined,
        year_died: undefined,
    })

    const navigate = useNavigate();

    useEffect(() => {
        loadData()
    }, []);

    const loadData = function () {
        service.GetAll({ skip: 0, take: 20, orderBy: '-year_born' })
            .then(res => {
                setRows(() => res.data.data);
            })

        service.Count().then(res => {
            setCount(() => res.data.count);
        })
    }

    const handleAddNew = () => {
        setFormData({
            _id: '',
            first_name: '',
            last_name: '',
            nationality: '',
            year_born: undefined,
            year_died: undefined,
        });
        setNationality('');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNationalityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNationality(event.target.value);
    };

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [name]: value });
    };

    const addNewArtist = async (event: React.FormEvent<HTMLFormElement>) => {
        //Lấy dữ liệu từ form để tạo object
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var artist = {
            first_name: data.get('first_name'),
            last_name: data.get('last_name'),
            nationality: nationality_field,
            year_born: data.get('year_born'),
            year_died: data.get('year_died'),
        };

        //Gọi lên API để cập nhập dữ liệu
        //Nếu artist có id thì gọi service.AddNewArtist(artist), ko thì gọi service.EditArtist(artist)
        const promise = data.get('_id') === '' ? service.AddNewArtist(artist) : service.EditArtist({ _id: data.get('_id'), ...artist });
        promise.then(res => {
            // const result = res.data.success;
            if (res.status === 200) {
                //Thông báo thành công
                setSuccess(1);
                setOpen(false);
                loadData();
            }
        })
            .catch(err => {
                //Thông báo lỗi
                setSuccess(0);
            })
            .finally(() => {
                //Đóng thông báo
                setTimeout(() => {
                    setSuccess(-1)
                }, 3000)
            })
    }

    const editArtist = function (artist: any) {
        setFormData(artist);
        setNationality(artist.nationality);
        setOpen(true);
    }

    const deleteArtist = function (id: any) {
        service.DeleteArtist(id).then(res => {
            // const result = res.data.success;
            if (res.status === 200) {
                //Thông báo thành công
                setSuccess(1);
                setOpen(false);
                loadData();
            }
        })
            .catch(err => {
                //Thông báo lỗi
                setSuccess(0);
            })
            .finally(() => {
                //Đóng thông báo
                setTimeout(() => {
                    setSuccess(-1)
                }, 3000)
            })
    }

    return (
        <React.Fragment>
            <Collapse in={success === 1}>
                <Alert variant="filled" severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Successfully add new data
                </Alert>
            </Collapse>
            <Collapse in={success === 0}>
                <Alert variant="filled" severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Something wrong! Please contact to admin for support
                </Alert>
            </Collapse>
            <GlobalStyles
                styles={{
                    ".table-header": {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    },
                    '.dialog_content': {
                        display: 'flex',
                        alignItems: 'flex-end',
                        marginBottom: 10,
                    },
                    '.dialog_content span': {
                        width: 120,
                    },
                }} />
            <div className="table-header">
                <h1>Artists list</h1>
                <Container component="main" sx={{ margin: 0, width: 'auto' }}>
                    <Button variant="contained" onClick={handleAddNew}>Create new artist</Button>

                    <Dialog open={open} onClose={handleClose} >
                        <DialogTitle>Artist detail</DialogTitle>

                        <Box component="form" onSubmit={addNewArtist} noValidate sx={{ mt: 1 }}>

                            <DialogContent sx={{ width: 500 }}>
                                <div className='dialog_content' style={{ display: 'none' }}>
                                    <span>Id:</span>
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        id="_id"
                                        name="_id"
                                        value={formData._id}
                                        variant="standard"
                                    />
                                </div>

                                <div className='dialog_content'>
                                    <span>First name:</span>
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        required
                                        id="first_name"
                                        name="first_name"
                                        label="First name"
                                        type="text"
                                        value={formData.first_name}
                                        onChange={handleTextFieldChange}
                                        variant="standard"
                                    />
                                </div>

                                <div className='dialog_content'>
                                    <span>Last name:</span>
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        required
                                        id="last_name"
                                        name="last_name"
                                        label="Last name"
                                        type="text"
                                        value={formData.last_name}
                                        onChange={handleTextFieldChange}
                                        variant="standard"
                                    />
                                </div>

                                <div className='dialog_content'>
                                    <span>Nationality:</span>
                                    <TextField
                                        id="nationality"
                                        name="nationality"
                                        select
                                        value={nationality_field}
                                        onChange={handleNationalityChange}
                                        helperText="Please select nationality"
                                        variant="standard"
                                    >
                                        {nationality.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>

                                <div className='dialog_content'>
                                    <span>Year born:</span>
                                    <TextField
                                        sx={{ width: 140 }}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                        required
                                        id="year_born"
                                        name="year_born"
                                        type='number'
                                        label="Year born"
                                        value={formData.year_born}
                                        onChange={handleTextFieldChange}
                                        variant="standard"
                                    />
                                </div>

                                <div className='dialog_content'>
                                    <span>Year died:</span>
                                    <TextField
                                        sx={{ width: 140 }}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                        id="year_died"
                                        name="year_died"
                                        type='number'
                                        label="Year died"
                                        value={formData.year_died}
                                        onChange={handleTextFieldChange}
                                        variant="standard"
                                    />
                                </div>
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit" variant="contained">Save</Button>
                            </DialogActions>
                        </Box>
                    </Dialog>
                </Container>
            </div>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell></TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>First name</TableCell>
                        <TableCell>Last name</TableCell>
                        <TableCell>Nationality</TableCell>
                        <TableCell>Year born</TableCell>
                        <TableCell>Year died</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row: any, index: number) => (
                        <TableRow key={row._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{<Checkbox value="remember" color="primary" />}</TableCell>
                            <TableCell><Button onClick={() => { navigate(`${row._id}`, { replace: true }) }}>{row._id}</Button></TableCell>
                            <TableCell>{row.first_name}</TableCell>
                            <TableCell>{row.last_name}</TableCell>
                            <TableCell>{row.nationality}</TableCell>
                            <TableCell>{row.year_born}</TableCell>
                            <TableCell>{row.year_died}</TableCell>
                            <TableCell><Button sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }} onClick={() => { editArtist(row) }}><UpdateIcon />Edit</Button></TableCell>
                            <TableCell><Button sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }} onClick={() => { deleteArtist(row._id) }}><DeleteForeverRoundedIcon />Delete</Button></TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell><b>Total artists: {count} artists</b></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </React.Fragment >
    );
}
