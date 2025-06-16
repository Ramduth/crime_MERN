import React, { useEffect, useState } from 'react';
import axiosInstance from '../Constants/BaseUrl';
import { toast } from 'react-toastify';

function EditPrivacyPolicy() {
  const [content, setContent] = useState('');
  const id = localStorage.getItem('PolicyId');

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);
  console.log(id)
  const getData = () => {
    axiosInstance.post(`/viewpolicy/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setContent(res.data.data.content || '');
        } else {
          setContent('');
        }
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setContent('');
      });
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    axiosInstance.post(`/editprivacypolicy/${id}`, { content })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success("Privacy Policy updated successfully");
        } else {
          toast.warning(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Update failed");
        console.error('Error updating data:', err);
      });
  };

  const handleCancel = () => {
    getData();
  };

  return (
    <div className="container">
      <div className="pt-5">
        <h4 className="admin-dash-h4">Welcome Admin</h4>
        <p className="admin-dash-para">All systems are running smoothly</p>
      </div>
      <div className="privacy_policy_form_container container-fluid">
        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="col-md-2">
              <label className="privacy_policy_label" htmlFor="content">Content</label>
            </div>
            <div className="col-md-1">
              <label className="privacy_policy_label">:</label>
            </div>
            <div className="col-md-9">
              <textarea
                id="content"
                value={content}
                onChange={handleContentChange}
                className="privacy_policy_content-textarea text-justify"
                required
              />
              <button type="submit" className="btn btn-success m-3">Update</button>
              <button type="button" onClick={handleCancel} className="btn btn-danger m-3">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPrivacyPolicy;
