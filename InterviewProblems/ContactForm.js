import React, { useState } from "react";
import "./ContactForm.css";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setSubmittedName(form.name);
      setSubmitted(true);
      setErrors({});
      setForm({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <div className="contact-form">
      <div className="contact-form__card">
        {submitted ? (
          <div className="contact-form__success">
            <div className="contact-form__success-icon" aria-hidden="true">
              ✓
            </div>
            <h2 className="contact-form__success-title">
              Thank you, {submittedName}!
            </h2>
            <p className="contact-form__success-text">
              Your message has been sent successfully.
            </p>
            <button
              type="button"
              className="contact-form__btn"
              onClick={() => setSubmitted(false)}
            >
              Send another message
            </button>
          </div>
        ) : (
          <>
            <h2 className="contact-form__title">Get in Touch</h2>
            <p className="contact-form__subtitle">
              Fill out the form below and we'll get back to you.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="contact-form__field">
                <label className="contact-form__label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`contact-form__input${
                    errors.name ? " contact-form__input--error" : ""
                  }`}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="contact-form__error">{errors.name}</p>
                )}
              </div>

              <div className="contact-form__field">
                <label className="contact-form__label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`contact-form__input${
                    errors.email ? " contact-form__input--error" : ""
                  }`}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="contact-form__error">{errors.email}</p>
                )}
              </div>

              <div className="contact-form__field">
                <label className="contact-form__label" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className={`contact-form__textarea${
                    errors.message ? " contact-form__input--error" : ""
                  }`}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                />
                {errors.message && (
                  <p className="contact-form__error">{errors.message}</p>
                )}
              </div>

              <button type="submit" className="contact-form__btn">
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ContactForm;
