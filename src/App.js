import { useState } from "react";
import "./style.css";

function App() {
  const [billAmount, setBillAmount] = useState("");
  const [billService, setBillService] = useState(0);
  const [billFriendService, setBillFriendService] = useState(0);
  //console.log(billService);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setBillAmount(inputValue);
    //console.log(inputValue);
  };

  const handleOptionChangeService = (e) => {
    const optionValue = e.target.value;
    setBillService(parseInt(optionValue));
    // console.log(optionValue);
  };

  const handleOptionChangeFriend = (e) => {
    const optionValue = e.target.value;
    setBillFriendService(parseInt(optionValue));
    // console.log(optionValue);
  };

  const reset = () => {
    setBillAmount("");
    setBillService(0);
    setBillFriendService(0);
  };

  return (
    <div className="App">
      <Form
        billAmount={billAmount}
        handleInputChange={handleInputChange}
        billService={billService}
        handleOptionChangeService={handleOptionChangeService}
        billFriendService={billFriendService}
        handleOptionChangeFriend={handleOptionChangeFriend}
      />
      <Summary
        billAmount={billAmount}
        billService={billService}
        billFriendService={billFriendService}
        reset={reset}
      />
    </div>
  );
}

function Form({
  billAmount,
  handleInputChange,
  billService,
  handleOptionChangeService,
  billFriendService,
  handleOptionChangeFriend,
}) {
  //console.log(billService);

  return (
    <div>
      <Bill billAmount={billAmount} handleInputChange={handleInputChange} />
      <Service
        billAmount={billAmount}
        billService={billService}
        handleOptionChangeService={handleOptionChangeService}
        handleInputChange={handleInputChange}
      />
      <FriendService
        billAmount={billAmount}
        billFriendService={billFriendService}
        handleOptionChangeFriend={handleOptionChangeFriend}
      />
    </div>
  );
}

function Bill({ billAmount, handleInputChange, billService }) {
  return (
    <div>
      <p>
        How much was the bill?{" "}
        <input type="number" value={billAmount} onChange={handleInputChange} />
      </p>
    </div>
  );
}

function Service({ handleOptionChangeService, billService }) {
  // console.log(billService);
  return (
    <OptionsServis
      billService={billService}
      handleOptionChangeService={handleOptionChangeService}
    />
  );
}

function FriendService({ handleOptionChangeFriend, billFriendService }) {
  //console.log(billFriendService);
  return (
    <OptionsFriend
      billFriendService={billFriendService}
      handleOptionChangeFriend={handleOptionChangeFriend}
    />
  );
}

function OptionsServis({ handleOptionChangeService, billService }) {
  const serviceOptions = {
    0: "Terrible 0%",
    5: "Good 5%",
    10: "Fantastic 10%",
    20: "Wonderful 20%",
  };

  const renderOptions = () => {
    const options = [0, 5, 10, 20];

    return options.map((option) => (
      <Option key={option} value={option}>
        {serviceOptions[option]}
      </Option>
    ));
  };

  return (
    <>
      <p>
        How do you like the service?{" "}
        <select value={billService} onChange={handleOptionChangeService}>
          {renderOptions()}
        </select>
      </p>
    </>
  );
}

function OptionsFriend({ handleOptionChangeFriend, billFriendService }) {
  const friendOptions = {
    0: "Terrible 0%",
    5: "Good 5%",
    10: "Fantastic 10%",
    20: "Wonderful 20%",
  };

  const renderOptions = () => {
    const options = [0, 5, 10, 20];

    return options.map((option) => (
      <Option key={option} value={option}>
        {friendOptions[option]}
      </Option>
    ));
  };

  return (
    <>
      <p>
        How does your friend like the service?{" "}
        <select value={billFriendService} onChange={handleOptionChangeFriend}>
          {renderOptions()}
        </select>
      </p>
    </>
  );
}

function Option({ value, selected, children }) {
  return (
    <option value={value} selected={selected}>
      {children}
    </option>
  );
}

function Summary({ billAmount, billService, billFriendService, reset }) {
  const totalAmount = parseFloat(billAmount);
  const serviceTip = parseFloat((totalAmount * billService) / 100);
  const friendTip = (totalAmount * billFriendService) / 100;
  const totalBill = (totalAmount + serviceTip + friendTip).toFixed(2);

  return (
    billAmount > 0 && (
      <div>
        <p>
          You pay {isNaN(billAmount) ? 0 : billAmount} ($
          {billAmount} + ${isNaN(serviceTip) ? 0 : serviceTip} tip for service +
          ${isNaN(friendTip) ? 0 : friendTip} tip for your friend. And together
          you have paid ${isNaN(totalBill) ? 0 : totalBill})
        </p>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
    )
  );
}

export default App;
