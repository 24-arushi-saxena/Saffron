# 🌿 Saffron - Fine Dining Reservation & Events Portal

Saffron is a premium, high-fidelity web platform for a luxury vegetarian restaurant where Indian culinary heritage meets modern theatrical presentation. The platform integrates a real-time table booking checkout, curated public events ticketing, a private celebrations inquiry channel, automated email notifications, and downloadable luxury vouchers.

---

## ✨ Core Features

### 1. 📅 Real-Time Table Reservation Flow (3-Step Checkout)
* **Step 1 (Occasion selection)**: Tailor the experience with occasions like *Birthday, Anniversary, or Date Night*, dynamically adjusting visual themes.
* **Step 2 (Details selection)**: Choose the number of guests, date, and time. Features **live backend capacity checking** (capping covers at 20 per slot) to prevent overbooking.
* **Step 3 (Customization)**: Pre-order signature dishes, outline dietary restrictions, indicate seating preferences (e.g., *Window Seat, Indoor*), and choose luxury add-ons (e.g., *Birthday Cake, Candle Setup, Flower Arrangement*).

### 2. 🎟️ Luxury Ticket Receipt & Image Export
* **Luxury Voucher Design**: Displays a vintage "tear-off ticket" receipt complete with dotted lines, detailed pre-order calculations, and gold accents.
* **Dual Download Options**:
  * **Download Image (Primary)**: Uses `html-to-image` to render and download a high-res PNG file of the receipt, complete with clean background masking suited to day/night themes.
  * **Download Text (Secondary)**: Exports a clean plain-text copy of your receipt details.

### 3. 🎭 Curated Events & Private Celebrations
* **Interactive Timelines**: Explores public events like *Sunday Brunch Buffet* or *Diwali Thali Night* with live seats-remaining tracking.
* **Integrated Booking**: Clicking *"Book Table"* on any event card automatically routes the guest to the reservations checkout with the event name, date, time, and ID pre-populated.
* **Venue Inquiries**: A dedicated channel for booking private rooms (e.g., *The Royal Alcove*), logging requests to MongoDB and sending inquiries to the restaurant owner.

### 4. ✉️ Automated Email Notification System
* **SMTP-Driven Delivery**: Connected to secure Gmail SMTP services using secure App Passwords.
* **Guest Reservation Vouchers**: Instantly emails guests their booking confirmation code, details, and pre-ordered dish bills.
* **Inquiry Notifications**: Sends instant alerts to the restaurant owner at `saffron04070@gmail.com` with the guest's contact info, event details, and custom requests.

---

## 🛠️ Technology Stack

* **Frontend**: React (Vite-powered SPA), TailwindCSS (for utility layouts), `html-to-image` (for DOM-to-canvas rendering).
* **Backend**: Node.js, Express, MongoDB (Mongoose ODM), Nodemailer (secure SMTP mail client), `dotenv`.

---

## 📁 Repository Structure

```text
SAFFRON/
├── backend/
│   ├── config/             # Database connection setup
│   ├── controllers/        # Reservation and event business logic
│   ├── middleware/         # Express middlewares
│   ├── models/             # Mongoose schemas (Reservation, Inquiry, Event, MenuItem)
│   ├── routes/             # Express endpoint routers
│   ├── utils/              # Email templates, database seeds, and checkers
│   ├── server.js           # Server entrypoint
│   └── package.json
├── frontend/
│   ├── public/             # Static luxury media and dish images
│   ├── src/
│   │   ├── components/     # UI elements (Hero, Reservations checkout components)
│   │   ├── context/        # Global states (ThemeContext)
│   │   ├── pages/          # Pages (Home, Menu, Events, About, Reservations)
│   │   ├── App.jsx         # App routing
│   │   └── main.jsx        # App entrypoint
│   ├── vite.config.js      # Build configurations and dev proxies
│   └── package.json
```

---

