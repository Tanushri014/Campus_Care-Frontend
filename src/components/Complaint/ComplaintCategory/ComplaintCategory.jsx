import "./ComplaintCategory.css";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: "ACADEMICS",
    title: "Academics",
    description: "Faculty, exams, timetable, classrooms",
    icon: "🎓",
  },
  {
    id: "HOSTEL",
    title: "Hostel",
    description: "Room, electricity, water, cleanliness",
    icon: "🏠",
  },
  {
    id: "MESS",
    title: "Mess",
    description: "Food quality and hygiene",
    icon: "🍽️",
  },
  {
    id: "BUS",
    title: "Bus",
    description: "Transport routes and timings",
    icon: "🚌",
  },
  {
    id: "CAMPUS",
    title: "Campus",
    description: "Infrastructure and maintenance",
    icon: "🏢",
  },
];

function ComplaintCategory() {

  const navigate = useNavigate();

  const selectCategory = (category) => {

    navigate("/student/complaints/new", {
      state: {
        category,
      },
    });

  };

  return (

    <div className="category-page">

      <div className="category-container">

        <h1>Select Complaint Category</h1>

        <p>
          Choose the department related to your complaint.
        </p>

        <div className="category-grid">

          {categories.map((category) => (

            <div
              key={category.id}
              className="category-card"
              onClick={() => selectCategory(category.id)}
            >

              <span className="category-icon">
                {category.icon}
              </span>

              <h3>{category.title}</h3>

              <p>{category.description}</p>

             

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default ComplaintCategory;