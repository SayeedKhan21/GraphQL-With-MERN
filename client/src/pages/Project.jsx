import { Link , useParams} from "react-router-dom";
import { GET_PROJECT } from "../queries/ProjectQueries";
import { useQuery } from "@apollo/client";
import Spinner from "../components/Spinner";


export default function Project(){
    const {id}  = useParams()

    const {loading ,error ,data} = useQuery(GET_PROJECT , {
        variables : {id}
    })

    if(loading){
        return <Spinner></Spinner>
    }
    if(error){
        return <p>Something went wrong</p>
    }

    return(
        <>
            {!loading && !error && 
                <div className="mx-auto w-75 card p-5">
                    <Link to="/" className="btn btn-light btn-sm ms-auto d-inline w-25" >Back</Link>
                    <h1>{data.project.name}</h1>
                    <p>{data.project.description} </p>
                    <h5 className="mt-3">Project Status</h5>
                    <p className="lead">{data.project.status}</p>
                </div>   
            }
        </>
    )
}