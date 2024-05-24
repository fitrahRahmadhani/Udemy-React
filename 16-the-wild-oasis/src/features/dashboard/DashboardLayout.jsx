import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isPending, bookings } = useRecentBookings();
  const { isPending: isPendingStays, stays, confirmedStays } = useRecentStays();

  if (isPending || isPendingStays) return <Spinner />;

  console.log(bookings);
  console.log(stays);
  console.log(confirmedStays);

  return (
    <StyledDashboardLayout>
      <div>Test</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
