import { useRecentStays } from "./useRecentStays";
import { useRecentBookings } from "./useRecentBookings";
import styled from "styled-components";
import { useCabin } from "../cabins/useCabin";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isPending, bookings } = useRecentBookings();
  const {
    isPending: isPendingStays,
    confirmedStays,
    numDays,
  } = useRecentStays();

  const { cabins, isPending: isPendingCabin } = useCabin();

  if (isPending || isPendingStays || isPendingCabin) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCounts={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
