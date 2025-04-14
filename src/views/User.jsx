import { use } from "react";     
import { useEffect } from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function User(){

    const [user] = useAuthState(auth);

    useEffect(() => {
        console.log(user);
    })

    return (
        <div>
            {user && 
            <div>   
                <p>{user.displayName}</p>
                <p>{user.email}</p>
            </div>
            }
        </div>  
    )
}

export default User;