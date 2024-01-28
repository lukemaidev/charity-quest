import { User } from "@/server/admin/users";
import ResolutionCard from "./components/resolutionCard";

export default function ResolutionPanel(data:User[], userType:string){
    return(
        <div>
            {data.map((user) => (
                <div key={user._id}>
                    <ResolutionCard data={user} userType={userType}/>
                </div>
            ))}
        </div>
    )
}