# AI Email Generator

A modern web application that uses the Groq API to generate professional email content and allows users to send emails via EmailJS.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Usage Guide](#usage-guide)
- [Development Process](#development-process)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## Overview

AI Email Generator is a streamlined tool for professionals who need to craft well-written emails quickly. The application leverages the power of Groq's large language models to generate email content based on user prompts, and integrates with EmailJS for sending the generated emails.

The application follows a two-step process:
1. **Compose** - Enter a prompt describing the email you want to create
2. **Preview & Send** - Review the generated email, add recipients, and send it

## Features

- **AI-Powered Email Generation**: Use Groq's language models to craft professional emails
- **Intuitive Two-Tab Interface**: Separate compose and preview tabs for a streamlined workflow
- **Recipient Management**: Add and remove email recipients with validation
- **Custom Email Editing**: Modify the generated subject and body before sending
- **EmailJS Integration**: Send emails directly from the application
- **Persistent Settings**: API keys and configuration are saved in localStorage

## Tech Stack

### Frontend
- **React**: Library for building user interfaces
- **TypeScript**: Typed JavaScript for better development experience
- **React Router**: Client-side routing
- **shadcn/ui**: Component library based on Radix UI and Tailwind CSS
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### State Management
- **React Hooks**: For local component state
- **localStorage**: For persisting configuration between sessions

### API Integration
- **Groq API**: For AI-powered email generation
- **EmailJS**: For sending emails directly from the frontend

### Development Tools
- **Vite**: Next-generation frontend tooling
- **React Query**: For data fetching and caching
- **ESLint**: Linting utility
- **Prettier**: Code formatter
## Setup and Installation

## 🚀 Usage Guide

### 1. **Compose Tab**

- Enter your **Groq API key** in the provided field (or it will be auto-loaded from localStorage if previously entered).
- Write a prompt describing the email content you need.  
  _Example_: `"Write a follow-up email to schedule a meeting with the marketing team about the new product launch"`
- Click **"Generate Email"** to create your email content.

### 2. **Preview Tab**

- Add recipients using the **recipient input field** at the top (enter email and press `Enter`).
- Configure **EmailJS credentials**:
  - Service ID
  - Template ID
  - User ID
- Review and edit the **generated subject and email body** as needed.
- Click **"Send Email"** to deliver your message to all recipients.

---

## 🛠 Development Process

### Design Approach

This application was designed with a focus on **user experience** and **workflow efficiency**, using a multi-step layout to guide users through the process.

- **Separation of Concerns**:  
  Divided into “Compose” and “Preview” tabs to focus on individual tasks.
- **Progressive Disclosure**:  
  Only show information and options as needed.
- **User-Friendly Form Controls**:  
  Includes components like `RecipientInput` for ease of use.
- **Responsive Design**:  
  Fully functional on both desktop and mobile devices.

---

