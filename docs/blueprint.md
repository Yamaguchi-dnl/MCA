# **App Name**: Sábado Total MCA

## Core Features:

- Display Event Information: Showcases fixed event details such as name, date, time, location, value, age range, and the critical supervision notice for young children.
- Responsive Landing Page: A mobile-first landing page with a hero image, event logo, prominent event name, and a clear 'Inscrever criança' call-to-action button that leads to the registration form.
- Child Registration Form: A structured form section to capture the child's full name, date of birth (with validation for ages 2-17 years), and selection of their age group/class (Maternal, Jardim, etc.).
- Guardian & Health Details Form: Section for responsible adult's full name, WhatsApp phone number (with masking), and a conditional field for specific dietary restrictions if indicated.
- Consent & Submission Management: Required checkboxes for event information and age-specific supervision consent, ensuring clear success messages upon submission and blocking duplicate entries.
- Secure Registration Storage: All validated registration data (child details, guardian, health info, class, submission date, status) is securely stored in a 'inscricoes' collection in Firestore.
- Admin Dashboard & AI Summary Tool: A protected administrative dashboard (via Firebase Authentication) featuring a searchable and filterable table of all registrations. Includes an AI tool to summarize dietary restrictions across all attendees.

## Style Guidelines:

- Primary interactive elements and calls-to-action: Vibrant Orange (#F7931E), conveying enthusiasm and warmth.
- Secondary interactive elements and accents: Bright Blue (#08A1CF), for contrast and a refreshing feel.
- Alerts, errors, or strong emphasis: Bold Red (#DB2027), for immediate attention.
- Highlights and cheerful accents: Energetic Yellow (#FCEE21), to draw attention to specific details.
- Grounding elements or deeper tones for text/background sections: Earthy Olive Green (#66851C), providing a natural and stable feel.
- Headlines and body text font: 'PT Sans', a humanist sans-serif. Chosen for its modern look combined with a touch of warmth and readability, suitable for a welcoming and informative application.
- Use outline-style icons with a slightly rounded aesthetic to maintain a friendly, approachable, and modern feel consistent with a children's event. Focus on clear, intuitive symbols for navigation and actions.
- Implement a 'mobile-first' responsive design. The landing page should feature a prominent hero section, and forms will be structured with clear sections and ample spacing for easy interaction on any device. The admin panel will utilize a clean table layout for data management.
- Subtle, smooth transition animations for page navigation and form submissions will provide positive user feedback, enhancing the overall user experience without being distracting.