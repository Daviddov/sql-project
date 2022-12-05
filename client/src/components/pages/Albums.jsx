import { Button, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Fragment } from "react";
import { useMemo, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

function Albums({ user }) {
    const [albums, setAlbums] = useState('')
    user = JSON.parse(localStorage.getItem('user')) 
    const navigete = useNavigate()

    const fetchPost = useMemo(async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`)
        const json = await response.json();
        json.sort((a, b) => (a.title > b.title) ? 1 : (a.title < b.title) ? -1 : 0) 
        setAlbums(json)
        console.log(json)
    }, [])

    const hendleClick = (id) => {
        navigete(`${id}`)  
    }

    return (
        <Fragment>

            <h1>Albums</h1>
            {albums && albums.map((album, index) =>
                <ListItem key={album.id} component="div" disablePadding sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
                    <ListItemButton >
                        <ListItemText primary={`${index+1}. ${album.title}`} />
                        <Button autoFocus onClick={() => hendleClick(album.id)}>
            Show photos
        </Button>
                    </ListItemButton>
                </ListItem>

            )}
        </Fragment>
    );
}

export default Albums;