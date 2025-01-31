import ExampleLayout from "./ExampleLayout";

function App() {
  return (
    <>
      <ExampleLayout existingStalls={[]} stallColor={"bg-green-200"} adminRights />
      <ExampleLayout
        stallColor={"bg-yellow-200"}
        adminRights={false}
        existingStalls={[
          {
            id: 1,
            width: 260, // Nový stánok začína na minimálnej šírke
            name: `Stánok 1`,
            singleStallColor: "bg-gray-500",
          },
        ]}
      />
      <ExampleLayout
        stallColor={"bg-red-200"}
        adminRights={false}
        existingStalls={[
          {
            id: 1,
            width: 260, // Nový stánok začína na minimálnej šírke
            name: `Stánok 1`,
            singleStallColor: "bg-gray-500",
          },
          {
            id: 2,
            width: 200, // Nový stánok začína na minimálnej šírke
            name: `Stánok 2`,
            singleStallColor: "bg-gray-500",
          },
        ]}
      />
    </>
  );
}

export default App;
