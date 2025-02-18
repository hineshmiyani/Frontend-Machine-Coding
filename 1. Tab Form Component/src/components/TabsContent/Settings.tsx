import { Data, Errors } from "../TabForm";

type SettingsProps = {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
  errors: Errors;
};

const Settings = ({ data, setData }: SettingsProps) => {
  const { theme } = data;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target || {};

    setData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  return (
    <div className="settings-tab-content">
      <div>
        <input
          id="light"
          type="radio"
          name="theme"
          value="light"
          checked={theme === "light"}
          onChange={handleChange}
        />
        <label htmlFor="light">Light</label>

        <input
          id="dark"
          type="radio"
          name="theme"
          value="dark"
          checked={theme === "dark"}
          onChange={handleChange}
        />
        <label htmlFor="dark">Dark</label>
      </div>
    </div>
  );
};

export default Settings;
