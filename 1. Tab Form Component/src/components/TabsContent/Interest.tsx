import { Data, Errors } from "../TabForm";

type InterestProps = {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
  errors: Errors;
};

const Interest = ({ data, setData, errors }: InterestProps) => {
  const { interests } = data;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target || {};

    setData((prevData) => {
      return {
        ...prevData,
        interests: checked
          ? [...prevData.interests, name]
          : prevData.interests.filter((interest: string) => interest !== name),
      } as Data;
    });
  };

  return (
    <div className="interest-tab-content">
      <div>
        <label>
          <input
            type="checkbox"
            name="Gaming"
            checked={interests.includes("Gaming")}
            onChange={handleChange}
          />
          Gaming
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="Music"
            checked={interests.includes("Music")}
            onChange={handleChange}
          />
          Music
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="Coding"
            checked={interests.includes("Coding")}
            onChange={handleChange}
          />
          Coding
        </label>
      </div>

      <div>
        {errors.interests && <span className="error">{errors.interests}</span>}
      </div>
    </div>
  );
};

export default Interest;
