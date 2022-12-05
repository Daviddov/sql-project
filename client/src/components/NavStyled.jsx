import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

export default function NavTabs({setUser}) {
    const [value, setValue] = React.useState(0);
    const navigete = useNavigate()
    const handleChange = (e, newValue) => {
        setValue(newValue);
        navigete(e.target.id)
    };

    const hendleLogout = () => {
        localStorage.removeItem('user')
        setUser(null)
        navigete('/login')
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
                <LinkTab label="Info" id="Info" />
                <LinkTab label="Todos" id="Todos" />
                <LinkTab label="Posts" id="Posts" />
                <Button onClick={hendleLogout}>Logout</Button>
            </Tabs>
        </Box>
    );
}