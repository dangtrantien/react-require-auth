import { Box, CardMedia, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtistService from "src/services/artists.service";
import Title from "./Title";

const service = new ArtistService();

export default function ArtistDetail() {
    const { artistId } = useParams();
    var [artist, setArtist] = useState({
        first_name: 'String',
        last_name: 'String',
        year_born: 'Number',
        year_died: 'Number',
        nationality: 'String',
    });

    useEffect(() => {
        service.FindById(artistId).then(res => {
            setArtist(res.data);
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
                    <h1>{artist.first_name} {artist.last_name}</h1>

                    <div>
                        <Title>Id: </Title>
                        <span>{artistId}</span>
                    </div>

                    <div>
                        <Title>First name: </Title>
                        <span>{artist.first_name}</span>
                    </div>

                    <div>
                        <Title>Last name: </Title>
                        <span>{artist.last_name}</span>
                    </div>

                    <div>
                        <Title>Nationality: </Title>
                        <span>{artist.nationality}</span>
                    </div>

                    <div>
                        <Title>Year born: </Title>
                        <span>{artist.year_born}</span>
                    </div>

                    <div>
                        <Title>Year died: </Title>
                        <span>{artist.year_died}</span>
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