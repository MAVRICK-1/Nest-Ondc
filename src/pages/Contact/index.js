import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './style.css';
import { Card, CardContent, Grid, Typography, TextField, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

function ContactUs() {
  const [faqs, setFaqs] = useState([
    { question: 'What is your return policy?', answer: 'You can return any item within 30 days of purchase.', open: false },
    { question: 'How can I track my order?', answer: 'You can track your order using the tracking number sent to your email.', open: false },
    { question: 'Do you offer international shipping?', answer: 'Yes, we offer shipping to most countries worldwide.', open: false },
  ]);

  const toggleFAQ = index => {
    setFaqs(faqs.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open;
      } else {
        faq.open = false;
      }
      return faq;
    }));
  };

  return (
    <div className="contact-container">
      <h1 className="contact-text">Contact Us</h1>
      <Grid item xs={12} md={6}>
        <Card className="contact-card">
          <CardContent>
            <Typography className="contact-title" variant="h4">
              Contact Information
            </Typography>
            <Typography className="contact-info" variant="body1">
              <strong>Email:</strong> contact@company.com
            </Typography>
            <Typography className="contact-info" variant="body1">
              <strong>Phone:</strong> +1 234 567 890
            </Typography>
            <Typography className="contact-info" variant="body1">
              <strong>Address:</strong> 1234 Street Name, City, State, Zip Code
            </Typography>
            <Typography className="contact-info" variant="body1">
              <strong>Customer Service Hours:</strong> Mon-Fri, 9am - 6pm
            </Typography>
            <Typography className="contact-info" variant="body1">
              <strong>Follow Us:</strong>
            </Typography>
            <div className="d-flex align-items-center">
            <ul className="list list-inline">
                    <li className="list-inline-item">
                      <Link to={""}>
                        <FacebookOutlinedIcon />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to={""}>
                        <XIcon />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to={""}>
                        <InstagramIcon />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to={""}>
                        <YouTubeIcon />
                      </Link>
                    </li>
                  </ul>
                  </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card className="contact-card">
          <CardContent>
            <Typography className="contact-title" variant="h4">
              Frequently Asked Questions
            </Typography>
            {faqs.map((faq, index) => (
              <Accordion key={index} expanded={faq.open} onChange={() => toggleFAQ(index)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} className="accordion-summary">
                  <Typography variant="body1">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                  <Typography variant="body1">{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className="contact-card">
          <CardContent>
            <Typography className="contact-title" variant="h4">
              Get in Touch
            </Typography>
            <form className="contact-form">
              <TextField
                className="contact-input"
                variant="outlined"
                label="Name"
                fullWidth
                margin="normal"
              />
              <TextField
                className="contact-input"
                variant="outlined"
                label="Email"
                type="email"
                fullWidth
                margin="normal"
              />
              <TextField
                className="contact-input"
                variant="outlined"
                label="Message"
                multiline
                rows={4}
                fullWidth
                margin="normal"
              />
              <Button
                className="contact-button"
                variant="contained"
                color="primary"
                type="submit"
              >
                Send
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className="contact-card">
          <CardContent>
            <Typography className="contact-title" variant="h4">
              Privacy Policy
            </Typography>
            <Typography className="contact-info" variant="body1">
              Your data is safe with us. Read more at <a href="/privacy-policy" className="privacy-link">Privacy Policy</a>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default ContactUs;