import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AnimePage = () => {
    const { id } = useParams();
    const host = "http://localhost:5000"
    const [data, setData] = useState({});
    let reqestData = async () => {
        let temp = await fetch(`${host}/anime/${id}`)
        let json = await temp.json();
        setData(json);
    }
    useEffect(() => {
        try{
            reqestData();
        }
        catch(err){
            console.error(err)
        }
       
    },[])

return (
    <div>
        {data.title}
        <img src={data.images.jpg.image_url} alt="" />
    </div>
  )
}



export default AnimePage