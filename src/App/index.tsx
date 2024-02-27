import React, { useEffect, useState } from "react";
import Accordion from "../components/Accordion";
import AccordionItem from "./AccordionItem";
import CELEBRITIES from "../celebrities.json";
import SearchBar from "../components/SearchBar";
import { ageToDob, splitFullName } from "../utils";
import { Celebrity, formProps } from "./constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  const [data, setData] = useState(CELEBRITIES);
  const [filteredData, setFilteredData] = useState<Celebrity[]>(data);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<number | null>(null);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const editFormHandler = () => {
    setIsEdit(true);
  };

  const cancelFormHandler = () => {
    setIsEdit(false);
  };

  const deleteHandler = (item: Celebrity) => {
    setData((prevState) => {
      if (!item.id) return prevState;
      return prevState.filter((element) => element.id !== item.id);
    });
    setFilteredData((prevState) => {
      if (!item.id) return prevState;
      return prevState.filter((element) => element.id !== item.id);
    });
    setActiveKey(null);
    toast.success("Details deleted successfully");
  };

  const formValidation = (formData: formProps) => {
    if (
      formData.fullName &&
      formData.age &&
      formData.country &&
      formData.gender &&
      formData.description
    )
      return true;
    else {
      return false;
    }
  };

  const onSubmitHandler = (formData: formProps) => {
    const isFormValidated = formValidation(formData);
    if (!isFormValidated) {
      toast.error("Please fill all the fields");
      return null;
    }
    const dob = ageToDob(formData.age);
    const { firstName, lastName } = splitFullName(formData.fullName);
    setData((prevState) => {
      if (activeKey !== null) {
        const updatedData = [...prevState];
        updatedData[activeKey] = {
          ...updatedData[activeKey],
          first: firstName,
          last: lastName,
          dob: dob,
          gender: formData.gender,
          country: formData.country,
          description: formData.description,
        };
        return updatedData;
      }
      return prevState;
    });
    toast.success("Details updated successfully");
    cancelFormHandler();
  };

  const onClick = (index: number) => {
    setActiveKey(index !== activeKey ? index : null);
  };

  const onSearch = (searchKey: string) => {
    const trimmedSearchKey = searchKey.trim().toLowerCase();
    if (trimmedSearchKey === "") {
      setFilteredData(data);
    } else {
      const filteredData = data.filter((item) => {
        const [fname, lname] = trimmedSearchKey.split(" ");
        const queryFullName = lname ? `${fname} ${lname}` : fname;
        const fullName = `${item.first} ${item.last}`.toLowerCase();
        return fullName.includes(queryFullName);
      });
      setFilteredData(filteredData);
    }
  };

  return (
    <main className="main">
      <header>
        <h3>Factwise Assessment by Sheece Borgi</h3>
      </header>
      <div style={{ width: "100%", maxWidth: 700 }}>
        <ToastContainer autoClose={5000} pauseOnHover theme="light" />
        <SearchBar onSearch={onSearch} />
        <Accordion
          data={filteredData}
          renderItem={(item: Celebrity, index: number) => (
            <AccordionItem
              key={`accordion-${index}`}
              item={item}
              activeKey={activeKey}
              onClick={onClick}
              currentIndex={index}
              isEdit={isEdit}
              onEditClick={editFormHandler}
              onCancel={cancelFormHandler}
              onSubmit={onSubmitHandler}
              deleteHandler={deleteHandler}
            />
          )}
        />
      </div>
    </main>
  );
}

export default App;
