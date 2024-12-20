import React, { useReducer, useState } from "react";
import "./add.scss";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducers";
import upload from "../../utils/upload.js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
const Add = () => {
  const [singleFile, setsingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handlechange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };
  const handlefeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target.value = "";
  };
  const handleupload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({
        type: "ADD_IMAGES",
        payload: {
          cover,
          images,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });
  const handlesubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/mygigs");
  };
  return [
    <div className="add5">
      <div className="container5">
        <h1>Add New Gig</h1>
        <div className="sections5">
          <div className="left5">
            <label htmlFor="title5">Job Title</label>
            <input
              type="text"
              name="title"
              id=""
              placeholder="e.g. I will do something I'm really good at"
              onChange={handlechange}
            />
            <label htmlFor="cat">Job Category</label>
            <select name="cat" id="cat" onChange={handlechange}>
              <option value="Painter">Painter</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Electrician">Electrician</option>
              <option value="Plumber">Plumber</option>
              <option value="Handyman">Handyman</option>
              <option value="Welder">Welder</option>
              <option value="Window Installer">Window Installer</option>
              <option value="Furniture Maker">Furniture Maker</option>
              <option value="Cleaning Services">Cleaning Services</option>
              <option value="Garage Door Technician">
                Garage Door Technician
              </option>
              <option value="Tiler">Tiler</option>
            </select>
            <div className="images5">
              <div className="imagesInputs5">
                <label htmlFor="dp">Cover Image</label>
                <input
                  type="file"
                  name="dp"
                  id=""
                  onChange={(e) => setsingleFile(e.target.files[0])}
                />
                <label htmlFor="work">Upload Images</label>
                <input
                  type="file"
                  name="work"
                  id=""
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
            </div>
            <button onClick={handleupload}>
              {uploading ? "uploading" : "Upload"}
            </button>
            <label htmlFor="desc">Job Description</label>
            <textarea
              name="desc"
              id=""
              cols="30"
              rows="16"
              placeholder="A brief description to introduce your service to cusmoters"
              onChange={handlechange}
            ></textarea>
              <label htmlFor="number">Price</label>
              <input type="number" onChange={handlechange} name="price" />
            <button onClick={handlesubmit}>Create</button>
          </div>
          <div className="">
            {/* <label htmlFor="">Service Title</label>
            <input
              type="text"
              placeholder="e.g. One-page web design"
              name="sortTitle"
            /> */}
            {/* <label htmlFor="">Short Description</label>
            <textarea
              name="sortDesc"
              onChange={handlechange}
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea> */}
            {/* <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input
              type="number"
              name="deliveryTime"
              min={2}
              onChange={handlechange}
            /> */}
            {/* <label htmlFor="">Revision Number</label>
            <input
              type="number"
              min={1}
              name="revisonNumber"
              onChange={handlechange}
            /> */}
            {/* <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handlefeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add </button> */}
            {/* </form> */}
            <div className="addedFeatures5">
              {state?.features?.map((f) => (
                <div className="item5" key={f}>
                  <button
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FEATURE",
                        payload: f,
                      })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
          
          </div>
        </div>
      </div>
    </div>,
  ];
};
export default Add;
