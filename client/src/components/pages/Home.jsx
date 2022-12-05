import { Navigate, Outlet } from "react-router-dom";
import NavTabs from "../NavStyled";
function Home({user ,setUser}) {

    return (
        <div>
            {user ? <h4>{`wellcome ${user.name}`}</h4> : <Navigate to={'Login'} />}
            <NavTabs  setUser={setUser} />
            <Outlet />

        </div>
    );
    
}

export default Home;