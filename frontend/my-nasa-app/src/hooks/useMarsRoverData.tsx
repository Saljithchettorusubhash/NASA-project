import { useState,useEffect } from "react";
import { fetchMarsRoverPhotosByEarthDate } from "../api/nasaAPI";

interface RoverPhoto {
    id:number;
    img_src:string;
    earth_date:string;
    camera:{name:string;full_name:string};
}

const useMarsRoverData = (roverName:string,sol:number,camera:string) => {
    const [roverPhotos,setRoverPhotos] = useState<RoverPhoto[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchRoverPhotos = async()=>{
            if(!roverName){
                throw new Error('roverName is required');
            }
            try{
                const response = await fetchMarsRoverPhotosByEarthDate({rover_name: roverName,sol,camera});
                console.log('Mars Rover Photos Response:', response);

                if(response.body.photos ){
                    setRoverPhotos(response.body.photos);

            }
        }
            catch(err:any){
                setError(err.message);
            }
            finally{
                setLoading(false);
            }
        };
        fetchRoverPhotos();
    },[roverName,sol,camera]);
    return {roverPhotos,loading,error};
}
export default useMarsRoverData;