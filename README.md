# Insertion Sort Visualizer

<p align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/UI-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Components-shadcn%2Fui-000000?style=for-the-badge" />
  <img src="https://img.shields.io/badge/AI_Builder-Vercel%20v0-000000?style=for-the-badge&logo=vercel" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel" />
</p>

---

An interactive **Insertion Sort algorithm visualizer** built with **Next.js, React, and TypeScript**.  
The project focuses on making algorithmic behavior observable through real-time animations and user-controlled execution.

---

## 🔗 Live Demo
🚀 https://aoa1nsertion.vercel.app/

---

## 🧩 Problem
Sorting algorithms are often difficult to understand through theory alone.  
Insertion Sort involves multiple comparisons and shifts that are hard to visualize mentally.

---

## 🚀 Solution
Built a browser-based visualization system that:
- Dynamically renders array elements
- Animates comparisons and shifts step by step
- Allows control over array size and animation speed
- Provides clear UI controls and explanations

---

## ✨ Features
- Real-time insertion sort animation
- Adjustable array size
- Configurable animation speed
- Start / Reset / New Array controls
- Algorithm explanation panel
- Keyboard and UI-based interaction

---

## 🧠 Algorithm Analysis

| Metric | Complexity |
|------|-----------|
| Best Case | O(n) |
| Average Case | O(n²) |
| Worst Case | O(n²) |
| Space Complexity | O(1) |

---

## 🏗 Architecture Overview

```text
app/                → App Router, layout, global styles
components/         → UI + visualization components
components/ui/      → shadcn/ui + Radix primitives
hooks/              → Reusable React hooks
lib/                → Utility functions
styles/             → Global styling
```
---

## 🧩 Key Components

### `sorting-visualizer.tsx`
Core visualization and animation logic responsible for rendering and updating the sorting process.

### `algorithm-controls.tsx`
User controls for execution flow, array size, and animation speed.

### `algorithm-explanation.tsx`
Educational layer that explains the insertion sort algorithm step by step.

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **UI Library:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Component System:** shadcn/ui + Radix UI
- **Animations:** Framer Motion
- **AI Tooling:** Vercel v0 (AI-assisted UI scaffolding)
- **Deployment:** Vercel

---

## 📌 Engineering Highlights

- **Separation of Concerns**  
  Algorithm logic is isolated from UI rendering for better maintainability.

- **Predictable Animation Lifecycle**  
  Controlled state transitions ensure smooth and deterministic visual updates.

- **Reusable Architecture**  
  Modular components and custom hooks improve scalability and readability.

- **Responsible AI Usage**  
  AI-assisted UI scaffolding refined through manual logic implementation.

- **Production-Ready Configuration**  
  Fully configured Next.js, TypeScript, and Tailwind setup.

---

## 🧾 Project Note

This project was assigned as a **group academic project**.

**All core development — including algorithm logic, UI behavior, animations, and deployment — was completed solely by me.**  
Group member names are retained in the UI for academic transparency.

---

## 🎯 What This Project Demonstrates

- **Strong Data Structures & Algorithms fundamentals**
- **Practical React and Next.js engineering skills**
- **Ability to translate algorithms into interactive systems**
- **Transparent and responsible use of AI-assisted tools**
- **End-to-end project ownership**

---

## 👤 Author

**Soham Shukla**  
B.Tech Student | Computer Science  

Focused on **DSA**, **frontend engineering**, and **system design**.

---

⭐ *If you find this project useful, consider starring the repository.*

