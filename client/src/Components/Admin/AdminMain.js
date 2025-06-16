import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";
import PoliceRegister from "../Police/PoliceRegister";
import NewPoliceStationReq from "../Police/NewPoliceStationReq";
import ViewAllPoliceStation from "../Police/ViewAllPoliceStation";
import ViewProfile_Policestation from "../Police/ViewProfile_Policestation";
import ViewProfile_PoliceReq from "../Police/ViewProfile_PoliceReq";
import ViewAllCases from "./ViewAllCases";
import ViewCaseDetails from "./ViewCaseDetails";
import ViewAllCitizen from "./ViewAllCitizen";
import ViewCitizenProfile from "./ViewCitizenProfile";
import ViewNotifications from "./ViewNotifications";
import ViewNotificationDetails from "./ViewNotificationDetails";
import ViewEachNotification from "./ViewEachNotification";
import AddPrivacyPolicy from "./AddPrivacyPolicy";
import EditPrivacyPolicy from "./EditPrivacyPolicy";
import ViewPrivacyPolicy from "./ViewPrivacyPolicy";
import ViewComplaints from "./ViewComplaints";
import ViewCaseReport from "./ViewCaseReport";
import ViewCaseUpdateDetail from "./ViewCaseUpdateDetail";
import AdminViewCaseUpdateDetails from "./AdminViewCaseUpdateDetails";

function AdminMain({ data }) {
  return (
    <div>
      <div>
        <div className="row">
          <div className="col-3">
            <AdminSidebar />
          </div>
          <div className="col-9">
            {data === "admindashboard" ? (
              <AdminDashboard />
            ) : data === "newpolicestationreq" ? (
              <NewPoliceStationReq />
            ) : data === "viewallpolicestation" ? (
              <ViewAllPoliceStation />
            ) : data === "viewallpoliceprofile" ? (
              <ViewProfile_Policestation />
            ) : data === "viewallpolicereqprofile" ? (
              <ViewProfile_PoliceReq />
            ) : data === "adminviewallcasedetails" ? (
              <ViewAllCases />
            ) : data === "adminvieweachcasedetails" ? (
              <ViewCaseDetails />
            ) : data === "viewcitizenprofile" ? (
              <ViewCitizenProfile />
            ) : data === "viewallcitizen" ? (
              <ViewAllCitizen />
            ) : data === "adminviewnotification" ? (
              <ViewNotifications />
            ) : data === "adminviewnotificationdetail" ? (
              <ViewNotificationDetails />
            ) : data === "adminvieweachnotification" ? (
              <ViewEachNotification />
            ) : data === "addprivacypolicy" ? (
              <AddPrivacyPolicy />
            ) : data === "editprivacypolicy" ? (
              <EditPrivacyPolicy />
            ) : data === "viewprivacypolicy" ? (
              <ViewPrivacyPolicy />
            ) : data === "adminviewcomplaints" ? (
              <ViewComplaints />
            ) : data === "anminviewcasereport" ? (
              <ViewCaseReport />
            ) : data === "adminviewcasereportdetails" ? (
              <ViewCaseUpdateDetail />
            ) : data === "admin-view-case-updates" ? (
              <AdminViewCaseUpdateDetails />
            ) : (
              <AdminDashboard />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMain;
