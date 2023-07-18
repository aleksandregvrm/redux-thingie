import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { showStats } from "../features/allJobs/allJobsSlice";
import { StatsContainer,ChartsContainer } from "../components";

const Stats = () => {
  const {isLoading} = useSelector((store)=>store.allJobs)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(showStats())
    },[])
  return (
    <>
    <StatsContainer/>
    <ChartsContainer/>
    </>
  )
}

export default Stats