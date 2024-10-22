import "./App.css";
import AgeGroupPriceList from "./components/AgeGroupPriceList";

const App = () => {
  return (
    <div className="container p-6 mx-auto">
      <AgeGroupPriceList
        onChange={(result) => console.log({ result: result })}
      />
    </div>
  );
};

export default App;
