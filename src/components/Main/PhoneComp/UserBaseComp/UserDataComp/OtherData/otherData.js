import { useEffect, useState } from "react";
import DATA from "../../../../../../data/data";
import './otherData.scss';

function OtherData ({ userID, toggleOtherDataComponent }) {
    const [otherData, setOtherData] = useState(null)
    const [loadData, setLoadData] = useState(false)

    useEffect(() => {
      setLoadData(true)
    }, [])
    
    
    useEffect(()=>{
        if(loadData && userID){
            const users = [...DATA.users];
            const Userdata = users.filter(user=>user.id===userID);
            const data = Userdata[0].address;
            if(data!==undefined) setOtherData({
                street: data.street, 
                city: data.city, 
                zipCode: data.zipcode
            })
        }
    }, [loadData, userID])

    

    return (<div className="otherData" onClick={()=>{toggleOtherDataComponent(false)}}>
        { otherData && <div>
            <table id="otherDataTable">
                <tbody>
                    <tr>
                        <td>Street</td>
                        <td><input type="text" value={otherData.street}/></td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td><input type="text" value={otherData.city}/></td>
                    </tr>
                    <tr>
                        <td>Zip Code</td>
                        <td><input type="text" value={otherData.zipCode}/></td>
                    </tr>
                </tbody>
            </table>
        </div> }


    </div>);
}

export default OtherData;