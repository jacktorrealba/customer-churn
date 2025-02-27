'use client'
import { formatDynamicAPIAccesses } from "next/dist/server/app-render/dynamic-rendering";
import React, { useState } from "react";

export default function Home() {

  // define form elements and their initial state
  const [formData, setFormData] = useState({
    PhoneService: false,
    Tenure: "",
    MultipleLines: false,
    OnlineSecurity: false,
    OnlineBackup: false,
    DeviceProtection: false,
    TechSupport: false,
    StreamingTV: false,
    StreamingMovies: false,
    PaperlessBilling: false,
    MonthlyCharges: "",
    TotalCharges: "",
    InternetService: "",
    Contract: "",
    PaymentMethod: ""
  });

  const handleChange = (e) => {
    // extract the name, type, value and checked from the target that the event fired from
    const { name, type, value, checked } = e.target;
    
    // update the form's changed elements
    setFormData((formData) => ({
      ...formData,
      // store the checked state for all checkbox types
      [name]: type === "checkbox" ? checked :
              // parse int for the Tenure field
              name === "Tenure" ? (value === "" ? "" : parseInt(value, 10)) || 0 :
              // parse float for the MonthlyCharges and TotalCharges field
              ["MonthlyCharges", "TotalCharges"].includes(name) ? (value === "" ? "" : parseFloat(value)) || 0.00 : 
              // return the value if all else fails
              value
  }));

  }

  // function for handling form submission
  const handleSubmit =  async(e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)   
      });

      const result = await response.json();
      console.log(result)

    } catch (error) {
      
    }
  }


  return (
    <div className="main">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-card">
          <div className="form-card-title">
            <h3>Telecomm Customer Churn Predictor</h3>
          </div>
          <div className="divider">
            <p>Fill out the form with a customer's profile to predict whether or not the customer will churn</p>
          </div>
          <div className="divider">
            <hr></hr>
          </div>
          <div className="form-card-body">
            <div className="boolean-options">
              <div className="form-item">
                <label htmlFor="PhoneService">
                  <input className="form-input" type="checkbox" name="PhoneService" value={formData.PhoneService} onChange={handleChange}></input>
                  Phone Service 
                </label>
              </div>
              <div className="form-item">
                <label htmlFor="MultipleLines">
                  <input className="form-input" type="checkbox" name="MultipleLines" value={formData.MultipleLines} onChange={handleChange}></input>
                  Multiple Lines 
                </label>
              </div>
              <div className="form-item">
                <label htmlFor="OnlineSecurity">
                  <input className="form-input" type="checkbox" name="OnlineSecurity" value={formData.OnlineSecurity} onChange={handleChange}></input>
                  Online Security 
                </label>
              </div>
              <div className="form-item">
                <label htmlFor="OnlineBackup">
                  <input className="form-input" type="checkbox" name="OnlineBackup" value={formData.OnlineBackup} onChange={handleChange}></input>
                  Online Backup 
                </label>
              </div>
              <div className="form-item">
                <label htmlFor="DeviceProtection">
                  <input className="form-input" type="checkbox" name="DeviceProtection" value={formData.DeviceProtection} onChange={handleChange}></input>
                  Device Protection 
                </label>
              </div>
              <div className="form-item">
                <label htmlFor="TechSupport">
                  <input className="form-input" type="checkbox" name="TechSupport" value={formData.TechSupport} onChange={handleChange}></input>
                  Tech Support 
                </label>
              </div>
              <div className="form-item">
                <label htmlFor="StreamingTV">
                  <input className="form-input" type="checkbox" name="StreamingTV" value={formData.StreamingTV} onChange={handleChange}></input>
                  Streaming TV 
                </label>
              </div>
              <div className="form-item">
                <label htmlFor="StreamingMovies">
                  <input className="form-input" type="checkbox" name="StreamingMovies" value={formData.StreamingMovies} onChange={handleChange}></input>
                  Streaming Movies 
                </label>
              </div>
              <div className="form-item">
                <label htmlFor="PaperlessBilling">
                  <input className="form-input" type="checkbox" name="PaperlessBilling" value={formData.PaperlessBilling} onChange={handleChange}></input>
                  PaperlessBilling 
                </label>
              </div>
            </div>

            <div className="numeric-options">
              <div className="form-item-num">
                <label htmlFor="Tenure">
                  Customer Tenure:
                </label>
                <input className="form-input-num" type="number" name="Tenure"  value={formData.Tenure} onChange={handleChange}></input>
              </div>
              <div className="form-item-num">
                <label htmlFor="MonthlyCharges">
                  Monthly Charges: 
                </label>
                <input className="form-input-num currency" step="0.01" type="number" name="MonthlyCharges" value={formData.MonthlyCharges} onChange={handleChange}></input>
              </div>
              <div className="form-item-num">
                <label htmlFor="TotalCharges">
                  Total Charges: 
                </label>
                <input className="form-input-num currency" step="0.01" type="number" name="TotalCharges" value={formData.TotalCharges} onChange={handleChange}></input>
              </div>
            </div>

            <div className="dropdown-options">
              <div className="form-item-select">
                <label htmlFor="InternetService">
                  <span style={{ color: 'red' }}>* </span>
                  Internet Type: 
                </label>
                <select className="form-input-dropdown" onChange={handleChange} name="InternetService" value={formData.InternetService} required>
                  <option value="" disabled></option>
                  <option value="DSL">DSL</option>
                  <option value="Fiberoptic">Fiber Optic</option>
                  <option value="No">None</option>
                </select>
              </div>
              <div className="form-item-select">
                <label htmlFor="Contract" >
                  <span style={{ color: 'red' }}>* </span>
                  Contract Type: 
                </label>
                <select className="form-input-dropdown" onChange={handleChange} name="Contract" value={formData.Contract} required>
                  <option value="" disabled></option>
                  <option value="Month-to-month">Month-to-Month</option>
                  <option value="oneyear">1 year</option>
                  <option value="twoyear">2 Year</option>
                </select>
              </div>
              <div className="form-item-select">
                <label htmlFor="PaymentMethod">
                  <span style={{ color: 'red' }}>* </span>
                  Payment Method: 
                </label>
                <select className="form-input-dropdown" onChange={handleChange} name="PaymentMethod" value={formData.PaymentMethod} required>
                  <option value="" disabled></option>
                  <option value="banktransfer">Bank Transfer</option>
                  <option value="creditcard">Credit Card</option>
                  <option value="electroniccheck">E-Check</option>
                  <option value="mailedcheck">Mailed Check</option>
                </select>
              </div>
            </div>
          </div>
          <div className="divider">
            <hr></hr>
          </div>
          <div className="form-card-footer">
            <div className="predict-div">
              <button id="predict-btn" type="submit">Predict</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
