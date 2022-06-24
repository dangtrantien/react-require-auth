import { Table, TableHead, TableRow, TableCell, TableBody, GlobalStyles } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArtistService from "src/services/artists.service";
import CreateArtist from "./CreateArtist";

const service = new ArtistService();

export default function Artists() {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        service.GetAll({ skip: 0, take: 20, orderBy: '-year_born' })
            .then(res => {
                setRows(() => res.data.data);
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
                        <TableCell>ID</TableCell>
                        <TableCell>First name</TableCell>
                        <TableCell>Last name</TableCell>
                        <TableCell>Year born</TableCell>
                        <TableCell>Year died</TableCell>
                        <TableCell>Nationality</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row: any) => (
                        <TableRow key={row._id}>
                            <TableCell>{row._id}</TableCell>
                            <TableCell>{row.first_name}</TableCell>
                            <TableCell>{row.last_name}</TableCell>
                            <TableCell>{row.year_born}</TableCell>
                            <TableCell>{row.year_died}</TableCell>
                            <TableCell>{row.nationality}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
