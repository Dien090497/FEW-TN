import React,{useState, useEffect} from "react";
import {getToken} from "../firebase";

const Notifications= (props) =>{
    const [isTokenFound, setIsTokenFound] = useState(false);

    useEffect(()=>{
        let data;

        async function tokenFunc(){
            data = await getToken(setIsTokenFound)
            if (data){
                console.log('Token is', data);
            }
            return data
        }
        tokenFunc();
    },[setIsTokenFound])

    return <></>;

}

Notifications.prototype={}

export  default Notifications;
