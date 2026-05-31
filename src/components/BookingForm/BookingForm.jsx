import { useState } from "react";
import toast from "react-hot-toast";
import css from "./BookingForm.module.css";

const initialFormState = {
  name: "",
  email: "",
  bookingDate: "",
  comment: "",
};

export const BookingForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const minBookingDate = new Date().toISOString().split("T")[0];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();

    if (!trimmedName || !trimmedEmail || !formData.bookingDate) {
      toast.error("Please fill in all required booking fields.");

      return;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!isEmailValid) {
      toast.error("Please enter a valid email address.");

      return;
    }

    if (formData.bookingDate < minBookingDate) {
      toast.error("Please choose a booking date from today or later.");

      return;
    }

    toast.success("Your booking request has been sent successfully.");
    setFormData(initialFormState);
  };

  return (
    <section className={css.section}>
      <div className={css.inner}>
        <h2 className={css.title}>Book your campervan now</h2>
        <p className={css.subtitle}>
          Stay connected! We are always ready to help you.
        </p>

        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.input}
            name="name"
            onChange={handleChange}
            placeholder="Name*"
            required
            type="text"
            value={formData.name}
          />
          <input
            className={css.input}
            name="email"
            onChange={handleChange}
            placeholder="Email*"
            required
            type="email"
            value={formData.email}
          />
          <input
            className={css.input}
            min={minBookingDate}
            name="bookingDate"
            onChange={handleChange}
            required
            type="date"
            value={formData.bookingDate}
          />
          <textarea
            className={`${css.input} ${css.textarea}`}
            name="comment"
            onChange={handleChange}
            placeholder="Comment"
            value={formData.comment}
          />

          <button className={css.button} type="submit">
            Send
          </button>
        </form>
      </div>
    </section>
  );
};
