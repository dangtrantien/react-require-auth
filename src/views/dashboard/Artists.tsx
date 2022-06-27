import { Table, TableHead, TableRow, TableCell, TableBody, GlobalStyles, Checkbox } from "@mui/material";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import UpdateIcon from '@mui/icons-material/Update';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ArtistService from "src/services/artists.service";
import CreateArtist from "./CreateArtist";

const service = new ArtistService();

export default function Artists() {
    const [rows, setRows] = useState([]);
    const [count, setCount] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        service.GetAll({ skip: 0, take: 20, orderBy: '-year_born' })
            .then(res => {
                setRows(() => res.data.data);
            })

        service.Count().then(res => {
            setCount(() => res.data.count);
        })
    }, []);

    return (
        <React.Fragment>
            <GlobalStyles
                styles={{
                    ".table-header": {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }
                }} />
            <div className="table-header">
                <h1>Artists list</h1>
                <CreateArtist />
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
                            <TableCell sx={{ cursor: 'pointer' }} onClick={() => { navigate(`${row._id}`, { replace: true }) }}>{row._id}</TableCell>
                            <TableCell>{row.first_name}</TableCell>
                            <TableCell>{row.last_name}</TableCell>
                            <TableCell>{row.nationality}</TableCell>
                            <TableCell>{row.year_born}</TableCell>
                            <TableCell>{row.year_died}</TableCell>
                            <TableCell sx={{ cursor: 'pointer' }}><UpdateIcon /></TableCell>
                            <TableCell sx={{ cursor: 'pointer' }}><DeleteForeverRoundedIcon /></TableCell>
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
