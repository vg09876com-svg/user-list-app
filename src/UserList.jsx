
import { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        setListOfUsers(response.data);
      } catch (err) {
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = listOfUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h2>Loading users...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>User Directory</h1>

      <p style={styles.subtitle}>
        Browse users, search by name, and view their details.
      </p>

      <input
        style={styles.search}
        type="text"
        placeholder="Search users by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p style={styles.count}>
        {filteredUsers.length} user(s) found
      </p>

      <div style={styles.grid}>
        {filteredUsers.map((user) => (
          <div key={user.id} style={styles.card}>
            <div style={styles.avatar}>
              {user.name.charAt(0)}
            </div>

            <h2 style={styles.name}>{user.name}</h2>

            <p style={styles.text}>
              <strong>Email:</strong> {user.email}
            </p>

            <p style={styles.text}>
              <strong>Company:</strong> {user.company.name}
            </p>

            <button
              style={styles.button}
              onClick={() =>
                setSelectedUser(
                  selectedUser?.id === user.id ? null : user
                )
              }
            >
              {selectedUser?.id === user.id
                ? "Hide Details"
                : "View Details"}
            </button>

            {selectedUser?.id === user.id && (
              <div style={styles.details}>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>

                <p>
                  <strong>Website:</strong> {user.website}
                </p>

                <p>
                  <strong>Street:</strong> {user.address.street}
                </p>

                <p>
                  <strong>City:</strong> {user.address.city}
                </p>

                <p>
                  <strong>Zipcode:</strong> {user.address.zipcode}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <p style={styles.empty}>No users found. Try another name.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "30px 20px",
    fontFamily: "Arial, sans-serif",
    color: "#1e293b",
  },

  heading: {
    textAlign: "center",
    color: "#4338ca",
    fontSize: "36px",
    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: "25px",
  },

  search: {
    display: "block",
    width: "100%",
    maxWidth: "500px",
    padding: "14px",
    margin: "0 auto 20px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "16px",
    boxSizing: "border-box",
  },

  count: {
    color: "#64748b",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: "22px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    overflowWrap: "anywhere",
  },

  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#e0e7ff",
    color: "#4338ca",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
  },

  name: {
    fontSize: "21px",
    marginBottom: "15px",
  },

  text: {
    fontSize: "14px",
    lineHeight: "1.6",
  },

  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    backgroundColor: "#4f46e5",
    color: "#ffffff",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "15px",
  },

  details: {
    marginTop: "15px",
    paddingTop: "12px",
    borderTop: "1px solid #e2e8f0",
    fontSize: "14px",
    lineHeight: "1.7",
  },

  empty: {
    textAlign: "center",
    marginTop: "30px",
    color: "#64748b",
  },
};

export default UserList;