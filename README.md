# Asbanesh Joel D — Machine Learning Engineer

Machine Learning Engineer focused on building practical AI/ML solutions, intelligent applications, and a production-ready portfolio site.

## 🌐 Portfolio

**Live portfolio:** [https://asbanesh-joel-portfolio.vercel.app/](https://asbanesh-joel-portfolio.vercel.app/)

## 👋 About

I am a Machine Learning Engineer passionate about building intelligent solutions with machine learning and AI. I enjoy turning data into meaningful insights and creating real-world impact through technology.

This repository hosts my personal portfolio: a single-page site that presents my skills, selected machine learning and AI projects, experience, education, certifications, and contact links. The site is built with semantic HTML, custom CSS, and vanilla JavaScript, and is deployed on Vercel.

## 🛠️ Tech Stack

Technologies used to build and operate **this portfolio site** (from `package.json` and source files):

### Frontend

- HTML5
- CSS3 (`css/style.css`, `css/responsive.css`)
- JavaScript (ES modules — `js/main.js`)
- Google Fonts (Plus Jakarta Sans, Inter, JetBrains Mono, Caveat)

### Tooling & deployment

- [Vite](https://vite.dev/) (build and dev server; bundles `js/main.js` and CSS for production)
- [Vercel](https://vercel.com/) (hosting; security headers in `vercel.json`)
- [Sentry](https://sentry.io/) (`@sentry/browser` — client error monitoring)
- ESLint
- Git / GitHub

**Note:** The production website is **not** a React application. Root `index.html` is the live page. The `src/` folder contains the default unused Vite + React scaffold and is not mounted in production.

Machine learning tools and languages featured in portfolio **projects** (from site content) include Python, scikit-learn, Pandas, NumPy, Streamlit, Gemini, and Hugging Face, among others.

## 🚀 Featured Projects

Projects listed here match the **Selected Work** section on the live site.

### EduHive

AI-powered learning platform with personalized recommendations, Gemini-powered features, intelligent content summarization, and AI-assisted rephrasing.

- **Focus:** Generative AI / team project — AI component integration
- **Technologies:** Generative AI, LLM integration, Gemini
- **Highlights:** Designed and integrated AI components including Gemini functionality, recommendations, summarization, and rephrasing
- **Link:** [github.com/maximN27/Eduhive](https://github.com/maximN27/Eduhive)

### AI-Based House Rent Estimation System

End-to-end machine learning application for predicting residential rental prices from property attributes, structural features, and location data.

- **Focus:** Regression and deployment
- **Technologies:** Python, Pandas, NumPy, scikit-learn, Random Forest, Streamlit, Hugging Face
- **Highlights:** Streamlit UI; model hosting on Hugging Face; related dataset on Kaggle
- **Links:** [GitHub](https://github.com/ASBANESHJOEL/AI-Based-House-Rent-Estimation-System) · [Kaggle dataset](https://www.kaggle.com/datasets/asbaneshjoel/house-rent-prediction-dataset)

### Customer Churn Prediction

Machine learning project focused on predicting customer churn using behavioral data, feature engineering, and classification modeling.

- **Focus:** Classification
- **Technologies:** Python, scikit-learn, Pandas, NumPy
- **Link:** [GitHub](https://github.com/ASBANESHJOEL/Customer-Churn-Prediction)

### Spam Email Classifier

Machine learning project for classifying emails as spam or legitimate through structured feature representation and evaluation.

- **Focus:** Supervised learning
- **Technologies:** Python, scikit-learn
- **Link:** [GitHub](https://github.com/ASBANESHJOEL/Spam-Email-Classifier)

## 🏆 Certifications

Certifications shown on the portfolio (PDFs served from `public/assets/docs/certificates/`):

| Certification | Issuer | PDF |
| --- | --- | --- |
| Artificial Intelligence Internship | Codec Technologies | [View PDF](https://asbanesh-joel-portfolio.vercel.app/assets/docs/certificates/CODEC%20AI%20INTERNSHIP.pdf) |
| AI/ML Internship | TANSAM | [View PDF](https://asbanesh-joel-portfolio.vercel.app/assets/docs/certificates/TANSAM%20certificate.pdf) |
| Machine Learning | Microsoft | [View PDF](https://asbanesh-joel-portfolio.vercel.app/assets/docs/certificates/Machine%20Learning%20by%20Microsoft.pdf) |
| Python for Machine Learning | Great Learning | [View PDF](https://asbanesh-joel-portfolio.vercel.app/assets/docs/certificates/Python%20for%20ML.pdf) |
| Basics of Python | Infosys | [View PDF](https://asbanesh-joel-portfolio.vercel.app/assets/docs/certificates/Basic%20of%20Python%20by%20INFOSYS.pdf) |

## 📄 Resume / CV

**[View / download CV (PDF)](https://asbanesh-joel-portfolio.vercel.app/assets/docs/Asbanesh_Joel_D_CV.pdf)**

Repository path: `public/assets/docs/Asbanesh_Joel_D_CV.pdf` (referenced on the site as `assets/docs/Asbanesh_Joel_D_CV.pdf`).

## 🔗 Profiles

Links from the portfolio contact section:

- **Email** — [asbaneshjoel2006@gmail.com](mailto:asbaneshjoel2006@gmail.com)
- **GitHub** — [github.com/ASBANESHJOEL](https://github.com/ASBANESHJOEL)
- **LinkedIn** — [linkedin.com/in/asbaneshjoel](https://www.linkedin.com/in/asbaneshjoel/)
- **Hugging Face** — [huggingface.co/ASBANESHJOEL](https://huggingface.co/ASBANESHJOEL)
- **Kaggle** — [kaggle.com/asbaneshjoel](https://www.kaggle.com/asbaneshjoel)
- **LeetCode** — [leetcode.com/u/ASBANESH_JOEL](https://leetcode.com/u/ASBANESH_JOEL/)
- **HackerRank** — [hackerrank.com/profile/asbaneshjoel2006](https://www.hackerrank.com/profile/asbaneshjoel2006)

## 🏗️ Project architecture

Production is a **static single-page portfolio** at the repository root. Vite builds `index.html`, bundles `js/main.js` (including Sentry), and copies `public/` into the output. Canonical static assets live under `public/assets/`.

```text
.
├── index.html              # Production portfolio page
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   └── main.js             # Navigation, scroll, certificates modal, Sentry
├── public/
│   ├── assets/
│   │   ├── docs/           # CV and certificate PDFs
│   │   └── images/         # Hero, OG image, certificate previews
│   ├── robots.txt
│   └── sitemap.xml
├── src/                    # Unused Vite React scaffold (not served as the site)
├── package.json
├── vite.config.js
└── vercel.json             # Security headers (CSP, X-Frame-Options, etc.)
```

## 💻 Local development

**Requirements:** Node.js and npm

```bash
npm install
npm run dev      # Local dev server (Vite)
npm run build    # Production build → dist/
npm run preview  # Preview production build
npm run lint     # ESLint
```

After `npm run build`, expect `dist/` to include `index.html`, `robots.txt`, `sitemap.xml`, and `assets/`.

## 📜 License

This project is for personal portfolio use. Project code and content © Asbanesh Joel D unless otherwise noted.
