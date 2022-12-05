import {  ImageList, ImageListItem } from "@mui/material";
import { Fragment } from "react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Photos() {
    const { albumId } = useParams()
    const [photos, setPhotos] = useState()

    const fetchPhoto = useMemo(async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
        const json = await response.json();
        setPhotos(json)
        console.log('a', json)
    }, [albumId])



    return (
        <Fragment>
            <h1>Photos</h1>

            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                {photos && photos.map((item, index) => (
                    <ImageListItem key={index}>
                        <img 
                            src={`${item.thumbnailUrl}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.thumbnailUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <Link to={'/albums'}>go back</Link>
        </Fragment>
    );


}

export default Photos;