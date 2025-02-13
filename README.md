
# Ticket Generator Application

A modern web application built with React, Vite, and Tailwind CSS that allows users to generate and customize tickets with avatar support using Cloudinary for image storage.

## Features

- Dynamic ticket generation
- Custom avatar upload and storage with Cloudinary
- Multiple ticket types (VVIP, VIP, Regular)
- Responsive design with Tailwind CSS
- Screenshot functionality for generated tickets
- Local storage for saving progress

## Tech Stack

- [React](https://reactjs.org/) - Frontend library
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Cloudinary](https://cloudinary.com/) - Cloud-based image management
- [domtoimage](https://www.npmjs.com/package/dom-to-image-more) - Screenshot DOM functionality

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 22.12.0 or higher)
- npm manager

## Installation

1. Clone the repository:
```bash
git clone [https://github.com/Victoryeddy/HNG12-stage2-conference-ticket-generator.git]
cd HNG12-stage2-conference-ticket-generator
```

2. Install dependencies:
```bash
npm install


3. Create a `.env` file in the root directory and add your Cloudinary credentials:
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Environment Variables

The following environment variables are required:

- `VITE_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `VITE_CLOUDINARY_UPLOAD_PRESET`: Your Cloudinary upload preset (set to unsigned)

## Usage

1. Fill in the required information (name, email, etc.)
2. Upload an avatar image
3. Select ticket type (VVIP, VIP, Regular)
4. Preview your generated ticket
5. Take a screenshot of the ticket using the capture button

## Build

To build for production:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.


## License

This project is licensed under the MIT License - see the LICENSE file for details.
