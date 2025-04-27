import { SharedStyles } from "../types";

export const sharedStyles: SharedStyles = {
  familyMember: {
    textAlign: "center",
    maxWidth: "150px",
    padding: "8px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  photoFrame: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 10px auto",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: "3px solid #1890ff",
  },
  photo: {
    width: "90%",
    height: "90%",
    borderRadius: "50%",
    objectFit: "cover",
  },
  name: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#262626",
    margin: "0",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
};
