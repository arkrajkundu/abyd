import React from 'react'
import './AIDocBuilder.css'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const AIDocBuilder = () => {
  return (
    <div className="ai-doc-builder">
      <Sidebar />
      <main className="main-content">
        <Header />
        <section className="title">AI Document Builder</section>
        <section className="overview">
          <h2>Generate & Customize</h2>
          <hr />
          <div class="category">
            <label for="documentCategory">Select Document Category</label>
            <select id="documentCategory" name="documentCategory">
              <option value="dataProtection">Data protection</option>
              <option value="privacyPolicy">Privacy policy</option>
              <option value="cookiePolicy">Cookie policy</option>
            </select>
          </div>

          <div className="cards">
            <div className="card privacy recommended">
              <div className="recommended-label">Recommended</div>
              <div className="top-content">
                <p>Privacy Policy</p>
                <span>A Privacy Policy explains how your business collects, uses, and protects customer data, keeping users informed and compliant with privacy laws.</span>
              </div>
              <button>Create</button>
            </div>
            <div className="card cookie recommended">
              <div className="recommended-label">Recommended</div>
              <div className="top-content">
                <p>Cookie Policy</p>
                <span>A Cookie Policy details how your website uses cookies to track, store, and manage user preferences, ensuring transparency and compliance with privacy regulations</span>
              </div>
              <button>Create</button>
            </div>
            <div className="card terms">
              <div className="top-content">
                <p>Terms of Use</p>
                <span>Terms of Use outline the rules and conditions the users must agree to when accessing or using your services, helping protect your business and ensuring a fair experience for all users.</span>
              </div>
              <button>Create</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AIDocBuilder
