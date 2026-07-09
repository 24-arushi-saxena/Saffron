const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = async (reservation) => {
  const {
    name, email, date, time,
    guests, occasion, confirmationCode,
  } = reservation;

  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    weekday: "long",
    year:    "numeric",
    month:   "long",
    day:     "numeric",
  });

  const mailOptions = {
    from:    `"Saffron Restaurant" <${process.env.EMAIL_USER}>`,
    to:      email,
    subject: `Your table at Saffron is confirmed`,
    html: `
      <div style="
        font-family: Georgia, serif;
        max-width: 520px;
        margin: 0 auto;
        background: #FAF7F0;
        padding: 40px;
        border: 1px solid #E8DFC0;
      ">
        <div style="text-align:center; margin-bottom: 32px;">
          <h1 style="
            font-size: 28px;
            font-weight: 400;
            color: #C8A951;
            letter-spacing: 0.2em;
            margin: 0;
          ">SAFFRON</h1>
          <p style="color: #8B6A40; font-size: 13px; letter-spacing: 0.1em;">
            PURE VEGETARIAN | INDIAN & WESTERN
          </p>
        </div>

        <hr style="border: none; border-top: 1px solid #E8DFC0; margin-bottom: 32px;" />

        <p style="color: #3D2B1A; font-size: 18px; margin-bottom: 8px;">
          Dear ${name},
        </p>
        <p style="color: #6B5240; font-size: 15px; line-height: 1.7;">
          Your reservation at Saffron is confirmed.
          We look forward to welcoming you.
        </p>

        <div style="
          background: #FFF8EC;
          border: 1px solid #E8DFC0;
          border-radius: 8px;
          padding: 24px;
          margin: 28px 0;
        ">
          <table style="width: 100%; font-size: 14px; color: #3D2B1A;">
            <tr>
              <td style="padding: 8px 0; color: #8B6A40;">Confirmation</td>
              <td style="padding: 8px 0; font-weight: bold; color: #C8A951;">
                #${confirmationCode}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8B6A40;">Date</td>
              <td style="padding: 8px 0;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8B6A40;">Time</td>
              <td style="padding: 8px 0;">${time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8B6A40;">Guests</td>
              <td style="padding: 8px 0;">${guests}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8B6A40;">Occasion</td>
              <td style="padding: 8px 0;">${occasion}</td>
            </tr>
          </table>
        </div>

        ${reservation.preOrderedDishes && reservation.preOrderedDishes.length > 0 ? `
          <div style="
            background: #FFF8EC;
            border: 1px solid #E8DFC0;
            border-radius: 8px;
            padding: 24px;
            margin: 28px 0;
          ">
            <h3 style="color: #C8A951; font-size: 15px; margin: 0 0 12px; font-weight: 500;">
              Pre-ordered Dishes
            </h3>
            <table style="width: 100%; font-size: 14px; color: #3D2B1A; border-collapse: collapse;">
              ${reservation.preOrderedDishes.map(d => `
                <tr>
                  <td style="padding: 6px 0; border-bottom: 1px dashed #E8DFC0;">
                    ${d.name} <strong style="color: #C8A951;">x ${d.quantity}</strong>
                  </td>
                  <td style="padding: 6px 0; text-align: right; border-bottom: 1px dashed #E8DFC0;">
                    Rs. ${d.price * d.quantity}
                  </td>
                </tr>
              `).join('')}
              <tr>
                <td style="padding: 12px 0 0; font-weight: bold; color: #8B6A40;">Pre-order Total</td>
                <td style="padding: 12px 0 0; text-align: right; font-weight: bold; color: #C8A951;">
                  Rs. ${reservation.preOrderedDishes.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                </td>
              </tr>
            </table>
            <p style="font-size: 11px; color: #8B6A40; margin: 8px 0 0; font-style: italic;">
              * Payable at the restaurant
            </p>
          </div>
        ` : ""}

        <p style="color: #6B5240; font-size: 14px; line-height: 1.7;">
          Please arrive 5 minutes before your booking time.
          We hold your table for 15 minutes past the reservation time.
        </p>

        <p style="color: #6B5240; font-size: 14px; line-height: 1.7; margin-top: 16px;">
          To cancel or modify your reservation please reply to this
          email or call us at <strong>+91 98765 43210</strong>.
        </p>

        <hr style="border:none; border-top:1px solid #E8DFC0; margin: 32px 0;" />

        <div style="text-align: center; color: #8B6A40; font-size: 12px;">
          <p>12 Heritage Lane, Lucknow, Uttar Pradesh - 226001</p>
          <p style="margin-top: 4px;">hello@saffronrestaurant.com</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendInquiryNotification = async (inquiry) => {
  const {
    name, email, phone, space,
    preferredDate, guestCount, occasion, message,
  } = inquiry;

  const formattedDate = new Date(preferredDate).toLocaleDateString("en-IN", {
    weekday: "long",
    year:    "numeric",
    month:   "long",
    day:     "numeric",
  });

  const mailOptions = {
    from:    `"Saffron Inquiry Alert" <${process.env.EMAIL_USER}>`,
    to:      process.env.EMAIL_USER,
    subject: `New Private Celebration Inquiry - Saffron`,
    html: `
      <div style="
        font-family: Georgia, serif;
        max-width: 520px;
        margin: 0 auto;
        background: #FAF7F0;
        padding: 40px;
        border: 1px solid #E8DFC0;
      ">
        <div style="text-align:center; margin-bottom: 32px;">
          <h1 style="
            font-size: 28px;
            font-weight: 400;
            color: #C8A951;
            letter-spacing: 0.2em;
            margin: 0;
          ">SAFFRON</h1>
          <p style="color: #8B6A40; font-size: 13px; letter-spacing: 0.1em;">
            NEW INQUIRY RECEIVED
          </p>
        </div>

        <hr style="border: none; border-top: 1px solid #E8DFC0; margin-bottom: 32px;" />

        <p style="color: #3D2B1A; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          A guest has requested a private celebration inquiry:
        </p>

        <div style="
          background: #FFF8EC;
          border: 1px solid #E8DFC0;
          border-radius: 8px;
          padding: 24px;
          margin: 20px 0;
        ">
          <table style="width: 100%; font-size: 14px; color: #3D2B1A;">
            <tr>
              <td style="padding: 6px 0; color: #8B6A40; width: 40%;">Guest Name</td>
              <td style="padding: 6px 0; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8B6A40;">Email</td>
              <td style="padding: 6px 0;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8B6A40;">Phone</td>
              <td style="padding: 6px 0;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8B6A40;">Occasion</td>
              <td style="padding: 6px 0; font-weight: bold; color: #C8A951;">${occasion}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8B6A40;">Preferred Space</td>
              <td style="padding: 6px 0;">${space}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8B6A40;">Preferred Date</td>
              <td style="padding: 6px 0;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8B6A40;">Guests</td>
              <td style="padding: 6px 0;">${guestCount}</td>
            </tr>
            ${message ? `
            <tr>
              <td style="padding: 6px 0; color: #8B6A40; vertical-align: top;">Message</td>
              <td style="padding: 6px 0; font-style: italic; color: #6B5240;">"${message}"</td>
            </tr>
            ` : ""}
          </table>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendInquiryAcknowledgement = async (inquiry) => {
  const {
    name, email, space, preferredDate, guestCount, occasion,
  } = inquiry;

  const formattedDate = new Date(preferredDate).toLocaleDateString("en-IN", {
    weekday: "long",
    year:    "numeric",
    month:   "long",
    day:     "numeric",
  });

  const mailOptions = {
    from:    `"Saffron Restaurant" <${process.env.EMAIL_USER}>`,
    to:      email,
    subject: `We have received your celebration inquiry - Saffron`,
    html: `
      <div style="
        font-family: Georgia, serif;
        max-width: 520px;
        margin: 0 auto;
        background: #FAF7F0;
        padding: 40px;
        border: 1px solid #E8DFC0;
      ">
        <div style="text-align:center; margin-bottom: 32px;">
          <h1 style="
            font-size: 28px;
            font-weight: 400;
            color: #C8A951;
            letter-spacing: 0.2em;
            margin: 0;
          ">SAFFRON</h1>
          <p style="color: #8B6A40; font-size: 13px; letter-spacing: 0.1em;">
            PRIVATE CELEBRATIONS
          </p>
        </div>

        <hr style="border: none; border-top: 1px solid #E8DFC0; margin-bottom: 32px;" />

        <p style="color: #3D2B1A; font-size: 18px; margin-bottom: 8px;">
          Dear ${name},
        </p>
        <p style="color: #6B5240; font-size: 15px; line-height: 1.7;">
          Thank you for reaching out to plan your celebration at Saffron. 
          We have received your inquiry details and our team will contact you within the next 24 hours to discuss the arrangements.
        </p>

        <div style="
          background: #FFF8EC;
          border: 1px solid #E8DFC0;
          border-radius: 8px;
          padding: 24px;
          margin: 28px 0;
        ">
          <h3 style="color: #C8A951; font-size: 14px; margin: 0 0 12px; letter-spacing: 0.05em; font-weight: 600;">
            INQUIRY SUMMARY
          </h3>
          <table style="width: 100%; font-size: 14px; color: #3D2B1A;">
            <tr>
              <td style="padding: 6px 0; color: #8B6A40;">Occasion</td>
              <td style="padding: 6px 0; font-weight: bold; color: #C8A951;">${occasion}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8B6A40;">Requested Space</td>
              <td style="padding: 6px 0;">${space}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8B6A40;">Date</td>
              <td style="padding: 6px 0;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8B6A40;">Guest Count</td>
              <td style="padding: 6px 0;">${guestCount} guests</td>
            </tr>
          </table>
        </div>

        <p style="color: #6B5240; font-size: 14px; line-height: 1.7;">
          Should you need to make urgent changes, please contact us directly at <strong>+91 98765 43210</strong>.
        </p>

        <hr style="border:none; border-top:1px solid #E8DFC0; margin: 32px 0;" />

        <div style="text-align: center; color: #8B6A40; font-size: 12px;">
          <p>12 Heritage Lane, Lucknow, Uttar Pradesh - 226001</p>
          <p style="margin-top: 4px;">hello@saffronrestaurant.com</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendConfirmationEmail,
  sendInquiryNotification,
  sendInquiryAcknowledgement,
};
