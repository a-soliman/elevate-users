# Elevate users demo

A front-end application for browsing and viewing user profiles.

A video demo could be watched here: <https://www.loom.com/share/d1cf27a1759a404db2843fdd731c7e5b?sid=63051634-f90e-469c-bec7-26a8475ac85c>

## 🚀 Features

- Fetch and display all users with avatars and full names.
- View individual user profiles with:
  - Full name
  - Avatar
  - Current streak
  - Total sessions played
  - Skill level visualization (Math, Reading, Speaking, Writing)
- Smooth vertical carousel that allows scrolling through users and dynamically updates the profile in view.
- Robust error handling for unreliable API responses.
- Modular components using modern React and TypeScript.

## Routes

1. `/` Is the home page, displays a list of users, clicking on any of them will take us to the single user view.
2. `/user/:id`: assumes that we fetched users before (can be fixed if needed), but it displays the details of a given user along side animated progress bars reprehending the skills progress of the customer.
3. `/carousel`, a horizontal carousel, that responds both to mouse scroll as well as controller clicks.

## 🧑‍💻 Tech Stack

- React 19
- TypeScript
- Vite

## 🛠 Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/a-soliman/elevate-users.git
cd elevate-users
```

2. **Install dependencies**

```bash
  npm install
```

3. **Create `.env.development` fil e** (you can just duplicate the `.env.example` and rename it to `.env.development`)

```env
VITE_API_USER_ID=your_user_id
VITE_API_TOKEN=your_auth_token
```

4. **Run the app**

```bash
npm run dev
```

## 🧩 Architecture & Design Notes

1. **API Service**: Centralized API handler with authentication logic and error resilience.
2. **Promise.all**: I relied on firing one request to get the `user_ids`, and once got that I use `Promise.all` to get the actual users' data in parallel, this saves time while rendering on the front-end, but we can discuss making the API more robust by either accepting multiple id, or better, implementing GraphQL.
3. **Components**: Split into reusable UI parts including CarouselItem, ProfileCard, and UserList.
4. **Resilience**: Handles fetch failures gracefully and prevents UI crashes.
5. **Extensibility**: Ready for future enhancements in follow-up interviews.

## 📝 Considerations

1. **User image** is served as base64 and rendered directly, and for the users not having an image we are serving a fallback.
2. **Scrolling inside the carousel** is debounced to ensure one-item-per-scroll behavior.
3. Items dynamically highlight the one in the bottom-most visible position.
4. **State** We are using the context api to fetch users only once and then share them with every component that needs access.
