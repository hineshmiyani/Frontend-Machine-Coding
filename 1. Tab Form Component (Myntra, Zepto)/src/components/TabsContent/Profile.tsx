import { Data, Errors } from "../TabForm";

type ProfileProps = {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
  errors: Errors;
};

const Profile = ({ data, setData, errors }: ProfileProps) => {
  const { name, age, email } = data;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target || {};

    setData((prevData) => {
      return { ...prevData, [name]: value.trim() };
    });
  };

  return (
    <div className="profile-tab-content">
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" value={name} onChange={handleChange} />
        <div>{errors.name && <span className="error">{errors.name}</span>}</div>
      </div>

      <div>
        <label htmlFor="name">Age: </label>
        <input type="number" name="age" value={age} onChange={handleChange} />
        <div>{errors.age && <span className="error">{errors.age}</span>}</div>
      </div>
      <div>
        <label htmlFor="name">Email: </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <div>
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
