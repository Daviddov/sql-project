import { Checkbox, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useRef } from "react";
import { Fragment } from "react";
import { useMemo, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function Posts({ user }) {
    const [data, setData] = useState('')
    const navigete = useNavigate()
    
    const fetchData = useMemo(async () => {
        const response = await fetch(`http://localhost:5000/users/${user.id}/posts`)
        const json = await response.json();
        setData(json)
        console.log(json)
    }, [])

    const hendleClick = (id) => {
        navigete(`${id}`)
    }

    
    return (
        <Fragment>
            <h1>Posts</h1>
            {data && data.map((post) =>
                <ListItem key={post.id} component="div" disablePadding sx={{margin:'auto' , width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
                    <ListItemButton >
                        <ListItemText onClick={() => hendleClick(post.id)} primary={`${post.id}.${post.title}`} />
                    </ListItemButton>
                </ListItem>
            )}
            <Outlet />


        </Fragment>
    );

}

export default Posts;