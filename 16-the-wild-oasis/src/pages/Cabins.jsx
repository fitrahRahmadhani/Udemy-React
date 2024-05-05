import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter and Sort</p>
      </Row>
      <Row type="horizontal">
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
