import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./EnrollForm.style.css"

const EnrollForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [batch, setBatch] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isValid = validateForm();
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/enroll", {
        method: 'POST',
        body: JSON.stringify({
          name,
          age,
          email,
          phone,
          batch,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Enrolled successfully! Details: ' + data.message);
      } else {
        setMessage('Error! ' + data.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    if (message) {
      toast(message);
    }
  }, [message]);




  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };



  const validateForm = () => {
    if (!name || !age || !email || !phone || !batch || batch === "Select") {
      setMessage('Please fill in all fields.');
      return false;
    }

    if (age < 18 || age > 65) {
      setMessage('Age must be between 18 and 65.');
      return false;
    }

    // Further validation for email and phone format
    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address!');
      return false;
    }

    if (phone.length !== 10) {
      setMessage('Please provide correct phone no.!');
      return false;
    }

    return true;
  };

  return (
    <div className='main_container'>
      <h1>Yoga Class Admission</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Full Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label for="age">Age</Label>
          <Input type="number" id="age" value={age} onInput={(e) => setAge(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" id="email" value={email} onInput={(e) => setEmail(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label for="phone">Phone No.</Label>
          <Input id="phone" value={phone} onInput={(e) => setPhone(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label for="batch">Preferred Batch</Label>
          <Input type="select" id="batch" value={batch} onInput={(e) => setBatch(e.target.value)}>
            <option value="Select">Select</option>
            <option value="06:00-07:00">6:00 AM - 7:00 AM</option>
            <option value="07:00-08:00">7:00 AM - 8:00 AM</option>
            <option value="08:00-09:00">8:00 AM - 9:00 AM</option>
            <option value="17:00-18:00">5:00 PM - 6:00 PM</option>
          </Input>
        </FormGroup>
        {/* run a loader animation */}
        {loading && <p>Loading...</p>}
        {!loading && <ToastContainer />}
        <Button type="submit" disabled={loading} className='btn-submit'>Enroll Now</Button>
      </Form>
    </div>
  );
};


export default EnrollForm;