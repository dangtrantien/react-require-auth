import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { GlobalStyles } from '@mui/styled-engine';
import { Box, Container, MenuItem } from '@mui/material';
import { json } from 'stream/consumers';

const year_born = [
    {
        id: 1,
        value: 1960,
    },
    {
        id: 2,
        value: 1970,
    },
    {
        id: 3,
        value: 1980,
    },
    {
        id: 4,
        value: 1990,
    },
    {
        id: 5,
        value: 2000,
    },
];

const year_died = [
    {
        id: 1,
        value: 1960,
    },
    {
        id: 2,
        value: 1970,
    },
    {
        id: 3,
        value: 1980,
    },
    {
        id: 4,
        value: 1990,
    },
    {
        id: 5,
        value: 2000,
    },
];

const nationality = [
    {
        id: 1,
        value: 'Vietnam',
    },
    {
        id: 2,
        value: 'Russia',
    },
    {
        id: 3,
        value: 'USA',
    },
    {
        id: 4,
        value: 'Norway',
    },
    {
        id: 5,
        value: 'Japan',
    },
    {
        id: 6,
        value: 'China',
    },
];

export default function CreateArtist() {
    const [open, setOpen] = React.useState(false);
    const [input, setInput] = React.useState({});
    const [year_born_field, setYearBorn] = React.useState('');
    const [year_died_field, setYearDied] = React.useState('');
    const [nationality_field, setNationality] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const yearBornChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYearBorn(event.target.value);
        setInput(value => ({ ...value, "year_born": year_born_field }));
    };

    const yearDiedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYearDied(event.target.value);
        setInput(value => ({ ...value, "year_died": year_died_field }));
    };

    const nationalityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNationality(event.target.value);
        setInput(value => ({ ...value, "nationality": nationality_field }));
    };

    const addNewArtist = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // sessionStorage.setItem('artist',JSON.stringify({
        //     first_name: data.get('first-name'),
        //     last_name: data.get('last-name'),
        //     year_born: data.get('year-born'),
        //     year_died: data.get('year-died'),
        //     nationality: data.get('nationality'),
        // }));
    }

    return (
        <Container component="main" sx={{ margin: 0, width: 'auto' }}>
            <GlobalStyles styles={{
                '.dialog-content': {
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 10,
                },
                '.dialog-content span': {
                    width: 'fit-content',
                    marginRight: 20,
                },
            }} />

            <Button variant="outlined" onClick={handleClickOpen}>Create new artist</Button>

            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Artist detail</DialogTitle>

                <Box component="form" onSubmit={addNewArtist} noValidate sx={{ mt: 1 }}>

                    <DialogContent sx={{ width: 500 }}>
                        <div className='dialog-content'>
                            <span>First name:</span>
                            <TextField
                                sx={{ width: 3 / 4 }}
                                autoFocus
                                required
                                id="first-name"
                                name="first-name"
                                label="First name"
                                type="text"
                                variant="standard"
                            />
                        </div>

                        <div className='dialog-content'>
                            <span>Last name:</span>
                            <TextField
                                sx={{ width: 3 / 4 }}
                                autoFocus
                                required
                                id="last-name"
                                name="last-name"
                                label="Last name"
                                type="text"
                                variant="standard"
                            />
                        </div>

                        <div className='dialog-content'>
                            <span>Year born:</span>
                            <TextField
                                required
                                id="year-born"
                                name="year-born"
                                select
                                value={year_born_field}
                                onChange={yearBornChange}
                                helperText="Please select year born"
                                variant="standard"
                            >
                                {year_born.map((option) => (
                                    <MenuItem key={option.id} value={option.value}>
                                        {option.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div className='dialog-content'>
                            <span>Year died:</span>
                            <TextField
                                id="year-died"
                                name="year-died"
                                select
                                value={year_died_field}
                                onChange={yearDiedChange}
                                helperText="Please select year died"
                                variant="standard"
                            >
                                {year_died.map((option) => (
                                    <MenuItem key={option.id} value={option.value}>
                                        {option.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div className='dialog-content'>
                            <span>Nationality:</span>
                            <TextField
                                id="nationality"
                                name="nationality"
                                select
                                value={nationality_field}
                                onChange={nationalityChange}
                                helperText="Please select nationality"
                                variant="standard"
                            >
                                {nationality.map((option) => (
                                    <MenuItem key={option.id} value={option.value}>
                                        {option.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" variant="contained">Add new</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Container>
    );
}
