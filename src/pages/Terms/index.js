import React from 'react';
import './style.css';
import { Card, CardContent, Typography } from '@mui/material';

function Terms() {
  const termsContent = [
    {
      title: "Introduction",
      text: "Welcome to our e-commerce website. By accessing or using our website, you agree to be bound by these terms and conditions."
    },
    {
      title: "User Accounts",
      text: "You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer."
    },
    {
      title: "Prohibited Uses",
      text: "You may use the website only for lawful purposes and in accordance with these terms."
    },
    // Add more sections as needed
  ];

  return (
    <div className="terms-container">
      <h1 className="terms-text">Terms and Conditions</h1>
      <div className="container-grid">
        {termsContent.map((section, index) => (
          <Card className="terms-card" key={index}>
            <CardContent>
              <Typography className="terms-title" variant="h4">
                {section.title}
              </Typography>
              <Typography className="terms-text">
                {section.text}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Terms;
