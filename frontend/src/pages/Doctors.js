import doctors from "../data/doctors";

export default function Doctors() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>🏥 Doctors List</h2>

      {doctors.map((doc) => (
        <div key={doc.id} style={{
          border: "1px solid gray",
          padding: "10px",
          margin: "10px",
          borderRadius: "8px"
        }}>
          <h3>{doc.name}</h3>
          <p>Specialization: {doc.specialization}</p>
          <p>Experience: {doc.experience} years</p>
        </div>
      ))}
    </div>
  );
}