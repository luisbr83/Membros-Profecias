# **App Name**: Apocalypse Academy

## Core Features:

- Authentication: Implements user authentication (login/registration) with Firebase Authentication, allowing access to members-only area upon successful login.
- Login/Registration UI: Renders a login/registration screen with a card layout, rounded borders, soft shadow, and specific images/assets as described.
- Member Area Structure: Presents a member area with a sidebar and main content section. The sidebar displays a title, product cover image, and a list of bonus cards with cover images and titles.
- Bonus 1 Content: Displays content for Bonus 1, including a title, descriptive paragraph, and a button to download a PDF.
- Bonus 2 Content: Displays a YouTube video embedded in an <iframe> element.
- Firebase Configuration: Provides placeholders in firebaseConfig.js for Firebase project initialization details.

## Style Guidelines:

- Primary color: Dark, slightly desaturated blue (#3B82F6), mirroring the hues in the book cover for a serious and authoritative feel.
- Background color: Light gray (#F5F5F5) to ensure content legibility.
- Accent color: A brighter blue (#60A5FA), approximately 30 degrees toward green, for buttons and interactive elements.
- Font: 'Inter' (sans-serif) for body text and headlines for a clean and modern appearance. Note: currently only Google Fonts are supported.
- Utilize Tailwind CSS for styling with rounded-xl borders on cards, soft shadows, clear typography, and generous spacing for a clean, modern aesthetic.
- Use relevant icons for the bônus section (e.g., PDF icon for downloadable content, play icon for videos).
- Add subtle transition animations (e.g., opacity fade) when bonus contents are loaded in the content area to improve the user experience.