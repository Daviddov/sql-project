import {  ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Fragment, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Comments() {

    
    const [comments, setComments] = useState('')
    const { postId } = useParams();
    const fetchComments = useMemo(async () => {
        const response = await fetch(`http://localhost:5000/post/${postId}/comments/`)
        const json = await response.json();
        setComments(json)
        console.log('comments', json)
    }, [postId])
    return (
        <Fragment>
{comments && comments.map((comment) => 
  <ListItem key={comment.id} component="div" disablePadding sx={{margin:'auto' , width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
  <ListItemButton >
      <ListItemText primary={`${comment.body}
     name: ${comment.name} 
     email: ${comment.email}
      `} />
  </ListItemButton>
</ListItem>
)}
<Link to={'/Posts/'+ postId} autoFocus>
              Close Comments
            </Link><br />
        </Fragment>
    );
}

export default Comments;