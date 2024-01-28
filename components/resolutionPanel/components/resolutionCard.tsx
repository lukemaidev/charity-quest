import { Resolution, checkResolution } from "@/server/admin/resolutions"


export default function ResolutionCard(data:Resolution, userType:string){
    
    const checkAttendance = () => {
        console.log("Checking attendance");
        checkResolution(data._id)
    }

    return(
        <div>
            Resolution Card Data
            <p>{data._id}</p>
            
            {userType === "observer" && <button onClick={checkAttendance}>Check Attendance</button>}
        </div>
    )
}