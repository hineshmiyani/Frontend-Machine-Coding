import { ElementType, useMemo, useState } from "react";
import Interest from "./TabsContent/Interest";
import Profile from "./TabsContent/Profile";
import Settings from "./TabsContent/Settings";

export type Data = typeof defaultData & { interests: string[] };

export type Errors = {
  name: string;
  age: string;
  email: string;
  interests: string;
};

const defaultData = {
  name: "",
  age: "",
  email: "",
  interests: [],
  theme: "light",
};

const defaultErrors = {
  name: "",
  age: "",
  email: "",
  interests: "",
};

const tabs = [
  {
    name: "Profile",
    component: Profile,
    validate: (
      data: Data,
      setErrors: React.Dispatch<React.SetStateAction<Errors>>
    ) => {
      const { name, age, email } = data;

      const errors: Partial<Errors> = {};

      if (!name || name.length < 2) {
        errors.name = "Name is not valid.";
      }

      if (!age || Number(age) < 18) {
        errors.age = "Age is not valid.";
      }

      if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.email = "Email is not valid";
      }

      setErrors({ ...defaultErrors, ...errors });

      return Object.keys(errors).length > 0 ? false : true;
    },
  },
  {
    name: "Interest",
    component: Interest,
    validate: (
      data: Data,
      setErrors: React.Dispatch<React.SetStateAction<Errors>>
    ) => {
      const { interests } = data;

      const errors: Partial<Errors> = {};

      if (interests.length === 0) {
        errors.interests = "Please select at least one interest.";
      }

      setErrors({ ...defaultErrors, ...errors });

      return errors.interests ? false : true;
    },
  },
  {
    name: "Settings",
    component: Settings,
    validate: (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _data?: Data,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _setErrors?: React.Dispatch<React.SetStateAction<Errors>>
    ) => {
      return true;
    },
  },
];

const TabForm = () => {
  const [data, setData] = useState<Data>(defaultData);

  const [errors, setErrors] = useState<Errors>(defaultErrors);

  const [activeTab, setActiveTab] = useState<number>(0);

  const TabContent = useMemo(() => {
    return tabs[activeTab]?.component as ElementType;
  }, [activeTab]);

  const handlePrevious = () => {
    if (!tabs[activeTab].validate(data, setErrors)) return;

    setActiveTab((prevTab) => prevTab - 1);
  };

  const handleNext = () => {
    if (!tabs[activeTab].validate(data, setErrors)) return;

    setActiveTab((prevTab) => prevTab + 1);
  };

  const handleSubmit = () => {
    if (!tabs[activeTab].validate(data, setErrors)) return;

    console.log("HandleSubmit : ", { data });
  };

  return (
    <div className="tab-form">
      <h1>Tab Form</h1>

      <div className="tab-form-container">
        <div className="tabs-header-container">
          {tabs.map((tab, index) => (
            <div
              className="tab-header"
              key={tab.name}
              onClick={() => {
                if (!tabs[activeTab].validate(data, setErrors)) return;
                setActiveTab(index);
              }}
            >
              {tab.name}
            </div>
          ))}
        </div>

        <div className="tab-form-content">
          <TabContent data={data} setData={setData} errors={errors} />
        </div>

        <div className="tab-buttons-container">
          {activeTab > 0 && <button onClick={handlePrevious}>Previous</button>}
          {activeTab < tabs.length - 1 && (
            <button onClick={handleNext}>Next</button>
          )}
          {activeTab === tabs.length - 1 && (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};
export default TabForm;
