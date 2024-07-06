"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";

export async function createBookingAction(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  await createBooking(newBooking);

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function updateProfileAction(formData) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Invalid national ID");
  }
  const updateData = { nationality, nationalID, countryFlag };
  await updateGuest(session.user.guestId, updateData);

  revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function deleteReservationAction(bookingId) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId)) {
    throw new Error("You are not allowed to delete this reservation");
  }

  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function updateBookingAction(formData) {
  const bookingId = formData.get("bookingId");

  // Authentication
  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  // Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(Number(bookingId))) {
    throw new Error("You are not allowed to update this reservation");
  }

  const updateData = {
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
  };

  await updateBooking(bookingId, updateData);

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}
