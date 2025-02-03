import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserInfoForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = new URLSearchParams(location.search).get('email');  // Get email from query param
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState('');
  const [subIndustry, setSubIndustry] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/create-user', {
        email_id: email,
        company,
        industry,
        sub_industry: subIndustry,
      });
      alert(response.data.message);
      navigate('/dashboard');  // Redirect to dashboard after successful user creation
    } catch (error) {
      console.error("Error submitting user info:", error);
      alert("There was an error creating the user.");
    }
  };

  return (
    <div>
      <h2>Enter your company details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company:</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Industry:</label>
          <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sub-Industry:</label>
          <input
            type="text"
            value={subIndustry}
            onChange={(e) => setSubIndustry(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserInfoForm;
