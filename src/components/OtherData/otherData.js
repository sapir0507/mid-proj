import { useEffect, useState } from "react";
import UserUtils from "./../../utils/UsersUtil";
import './otherData.scss';

function OtherData ({ userID, toggleOtherDataComponent }) {
    const [otherData, setOtherData] = useState({})
    
    useEffect(() => {
        const getOtherData = async () => {
            const data = await UserUtils.getOtherData(userID);
            console.log(data);
            setOtherData({street: data.street, city: data.city, zipCode: data.zipCode})
        }
        if(userID!==undefined) getOtherData()
    }, [userID])

    

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