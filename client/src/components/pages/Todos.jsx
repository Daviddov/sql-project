import { Box, Checkbox, SelectChangeEvent, FormControl, InputLabel, ListItem, ListItemButton, ListItemText, MenuItem, Select } from "@mui/material";
import { useMemo, useState } from "react";

function Todos({ user }) {
    const [data, setData] = useState('')
    const [sort, setSort] = useState('');
    const fetchData = useMemo(async () => {
        const response = await fetch(`http://localhost:5000/users/${user.id}/todos`)
        const json = await response.json();
      
        setData(json)
        console.log(json)
    }, []);

const hendleToggle = (e) =>{
console.log(e.target.checked);
// fetchData(e.target.checked)
}
    const handleChange = (event) => {
        const sorted = event.target.value
        setSort(sorted);
        switch (sorted) {
            case 'abc':
                setData((data) => data.sort((a, b) => (a.title > b.title) ? 1 : (a.title < b.title) ? -1 : 0))
                break;
            case 'random':
                setData((data) => data.sort(() => Math.random() > .5 ? 1 : -1))
                break;
            case 'unchacked first':
                setData((data) => data.sort((a, b) => (a.completed) ? 1 : -1))
                break;
            default:
                setData((data) => data.sort((a, b) => (a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0))
                break;
        }

    };

    return (
        <div >
            <h1>Todos</h1>

            <Box sx={{ margin:'auto', minWidth: 120,width: '100%', maxWidth: 600, }}>
                <FormControl fullWidth>
                    <InputLabel>sort</InputLabel>
                    <Select
                        value={sort}
                        label="sort"
                        onChange={handleChange}
                    >
                        <MenuItem value={'123'}>123</MenuItem>
                        <MenuItem value={'abc'}>abc</MenuItem>
                        <MenuItem value={'random'}>random</MenuItem>
                        <MenuItem value={'unchacked first'}>unchacked first</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {data && data.map((todo) =>
                <ListItem key={todo.id} component="div" disablePadding sx={{ margin:'auto' ,width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
                    <ListItemButton>
                        <ListItemText primary={`${todo.id}.${todo.title}`} />
                        <Checkbox onClick={hendleToggle} checked={todo.completed} />
                    </ListItemButton>
                </ListItem>
            )}
        </div>
    );

}

export default Todos;