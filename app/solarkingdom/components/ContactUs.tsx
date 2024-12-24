"use client";
import { useState, useEffect } from "react";
import styles from "../styles/ContactUs.module.css";
import Link from "next/link";
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById("contact-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus({
        type: "success",
        message: "Thank you for your message. We'll get back to you soon!",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="contact-section"
      className={`${styles.contact} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.glowOverlay} />
      <Link href="/solarkingdom" className={styles.backButton}>
        <span className={styles.backIcon}>←</span>
        Back to Home
      </Link>
      <div className={styles.content}>
        <div className={styles.contactInfo}>
          <h2 className={styles.title}>Get In Touch</h2>
          <p className={styles.subtitle}>
            Ready to start your solar journey? Contact us today for a free
            consultation.
          </p>

          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>📍</span>
              </div>
              <h3>Visit Us</h3>
              <p>123 Solar Street</p>
              <p>Sunshine City, SC 12345</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>📞</span>
              </div>
              <h3>Call Us</h3>
              <p>
                <a href="tel:+1234567890">(123) 456-7890</a>
              </p>
              <p>Mon - Fri: 9AM - 6PM</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>📧</span>
              </div>
              <h3>Email Us</h3>
              <p>
                <a href="mailto:info@solarkingdom.com">info@solarkingdom.com</a>
              </p>
              <p>24/7 Online Support</p>
            </div>
          </div>

          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>
              Facebook
            </a>
            <a href="#" className={styles.socialLink}>
              Twitter
            </a>
            <a href="#" className={styles.socialLink}>
              LinkedIn
            </a>
            <a href="#" className={styles.socialLink}>
              Instagram
            </a>
          </div>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formWrapper}>
            <h3>Send Us a Message</h3>

            {submitStatus.type && (
              <div className={`${styles.alert} ${styles[submitStatus.type]}`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your Name"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Your Email"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Your Phone"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Subject"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Message"
                  rows={6}
                />
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
