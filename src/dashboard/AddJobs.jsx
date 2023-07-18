import { FormRow } from "../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import FormRowSelect from "../components/FormRowSelect";
import { handleChange,clearValues, createJob,editJob } from "../features/job/JobSlice";
import { useEffect } from "react";

const AddJobs = () => {
    const {isLoading,position,company,jobLocation,jobType,jobTypeOptions,status,statusOptions,isEditing,editJobId} = useSelector((store)=>store.job);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!position || !company || !jobLocation){
            return;
        }
        if(isEditing){
          dispatch(editJob({jobId:editJobId,job:{position,company,jobLocation,jobType}}))
          return
        }
        dispatch(createJob({position, company, jobLocation, jobType, status}))
    }
    const handleJobInput = (e) => {
        const name = e.target.name
        const value = e.target.value;
        console.log(name,value);
        dispatch(handleChange({name,value}));
    }
    useEffect(()=>{

    },[])
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            labelText="job location"
            handleChange={handleJobInput}
          />
          <div className="form-row">
            <label htmlFor="status" className="form-label">
              status
            </label>
            <select
              name="status"
              value={status}
              onChange={handleJobInput}
              className="form-select"
            >
              {statusOptions.map((itemValue, index) => {
                return (
                  <option key={index} value={itemValue}>
                    {itemValue}
                  </option>
                );
              })}
            </select>
          </div>
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              Clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJobs;
