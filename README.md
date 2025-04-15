# 🚀 CodePilot

**CodePilot** is an AI-powered code review and debugging assistant that helps developers write cleaner, faster, and more secure code. Whether you're a beginner looking for feedback or a senior developer hunting for optimization tips, CodePilot is your personal code companion.

---

## 🧠 What is CodePilot?

CodePilot leverages advanced AI to analyze your code and provide feedback in real-time. It's designed to be your personal assistant that spots bugs, suggests improvements, and helps you debug like a pro. Plus, developers can sign up for a special role to support others via live Zoom calls — like a virtual dev mentorship space.

---

## ✨ Features

- ✅ Upload or paste your code for instant AI analysis
- ✅ Categorized feedback:
  - Performance issues
  - Security vulnerabilities
  - Bugs and logic errors
  - Optimization tips
- ✅ Beautiful, animated UI using Framer Motion
- ✅ Real-time chat-like experience powered by OpenAI
- ✅ User authentication and authorization
- ✅ Forgot password flow with email recovery
- ✅ Developer role with ability to assist other users via Zoom
- ✅ Stripe integration for premium plans
- ✅ 3D robot assistant (Spline integration)
- ✅ Built using custom conventional Next.js pages with modern animations

---

## 🛠 Tech Stack

- **Frontend:** Next.js, TailwindCSS, Shadcn UI, Framer Motion, Spline
- **Backend/AI:** OpenAI API
- **Database:** MongoDB Atlas
- **Auth:** Custom-built authentication & authorization system
- **Payments:** Stripe
- **Deployment:** Vercel

---

## 📦 Installation & Setup

> **Note**: You must have **Node.js** and **npm** installed.

1. Clone the repository:

```bash
git clone https://github.com/your-username/codepilot.git
cd codepilot
```

2. Navigate to the development branch:

```bash
git checkout development
```
3. Pull the latest development changes:

```bash
git pull origin development
```

4. Install dependencies:

```bash
npm install
```
5. Create a .env.local file and add your environment variables:

```bash
OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongo_uri
NEXT_PUBLIC_URL=http://localhost:3000

SALT_ROUNDS=10
SESSION_SECRET=your_session_secret

# Email (SMTP)
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_smtp_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_FROM_EMAIL=your_email@gmail.com

DEV_EMAIL=admin_contact_email

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PRICE_ID_STARTER=price_id_starter
STRIPE_PRICE_ID_PRO=price_id_pro
STRIPE_PRICE_ID_TEAM=price_id_team

# Zoom Integration
ZOOM_ACCESS_TOKEN=your_zoom_access_token
ZOOM_ACCOUNT_ID=your_zoom_account_id
ZOOM_CLIENT_ID=your_zoom_client_id
ZOOM_CLIENT_SECRET=your_zoom_client_secret
```
6. Run the development server:

```bash
npm run dev
```
7. Open http://localhost:3000 to view the app.

## 🎥 Demo

🔧 Demo video coming soon! Stay tuned...

## 🛡 License

This project is licensed under the [MIT License](LICENSE). Feel free to use, share, and modify it!

## 🤝 Contribution

We welcome contributions with open arms! Whether it’s fixing a bug, proposing a new feature, or improving the UI — every bit counts. Fork the repo, create a new branch, and open a pull request. Let’s build something amazing together!

## 👥 **NextGenCoders** Team members

- **Hadi Irshaid**  
  - [LinkedIn](https://www.linkedin.com/in/hadi-irshaid-345386319/)  
  - [GitHub](https://github.com/Hadi87s)  
  - 📧 HadiIrshaid8722@gmail.com

- **Moumen Al Yazouri**  
  - [LinkedIn](https://www.linkedin.com/in/moamen-al-yazouri-80742433a/)  
  - [GitHub](https://github.com/Moamen-Yazouri)  
  - 📧 moaamenalyazouri@gmail.com

- **Hajar Ihab**
  - <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Linked-in-alt.svg/640px-Linked-in-alt.svg.png" width="20" height="20"> [LinkedIn](https://www.linkedin.com/in/hajar-alhajeh/)  
  - <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" width="20" height="20"> [GitHub](https://github.com/Hajar013)  
  - <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Email_new.svg/640px-Email_new.svg.png" width="20" height="20"> [hajar.ihab@gmail.com](mailto:hajar.ihab@gmail.com)

- **Lara Samara**
    - <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Linked-in-alt.svg/640px-Linked-in-alt.svg.png" width="20" height="20"> [LinkedIn](https://www.linkedin.com/in/lara-samara/)  
  - <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" width="20" height="20"> [GitHub](https://github.com/LaraSamara)  
  - <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Email_new.svg/640px-Email_new.svg.png" width="20" height="20"> [](mailto:larasamara2002@gmail.com)

- **Alaa Abu Madi**

- **Mohammed Al Hnajouri**
