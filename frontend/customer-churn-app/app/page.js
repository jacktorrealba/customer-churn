'use client'
import { formatDynamicAPIAccesses } from "next/dist/server/app-render/dynamic-rendering";
import React, { useState } from "react";

export default function Home() {

  // define form elements and their initial state
  const [formData, setFormData] = useState({
    PhoneService: false,
    Tenure: 0,
    MultipleLines: false,
    OnlineSecurity: false,
    OnlineBackup: false,
    DeviceProtection: false,
    TechSupport: false,
    StreamingTV: false,
    StreamingMovies: false,
    PaperlessBilling: false,
    MonthlyCharges: 0.00,
    TotalCharges: 0.00,
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
      // if the type is a checkbox then store the checked state, otherwise store the value
      [name]: type === "checkbox" ? checked : value,
    }));

  }

  // function for handling form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
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
                  Phone Service: 
                </label>
              </div>
              <div className="form-item">
                <label htmlFor="MultipleLines">
                  <input className="form-input" type="checkbox" name="MultipleLines" value={formData.MultipleLines} onChange={handleChange}></input>
                  Multiple Lines:
                </label>
              </div>
              <div className="form-item">
                <label htmlFor="OnlineSecurity">
                  <input className="form-input" type="checkbox" name="OnlineSecurity" value={formData.OnlineSecurity} onChange={handleChange}></input>
                  Online Security: 
                </label>
              </div>
              <div className="form-item">
                <label htmlFor="OnlineBackup">
                  <input className="form-input" type="checkbox" name="OnlineBackup" value={formData.OnlineBackup} onChange={handleChange}></input>
                  Online Backup: 
                </label>
              </div>
              <div className="form-item">
                <label htmlFor="DeviceProtection">
                  <input className="form-input" type="checkbox" name="DeviceProtection" value={formData.DeviceProtection} onChange={handleChange}></input>
                  Device Protection: 
                </label>
              </div>
              <div className="form-item">
                <label htmlFor="TechSupport">
                  <input className="form-input" type="checkbox" name="TechSupport" value={formData.TechSupport} onChange={handleChange}></input>
                  Tech Support: 
                </label>
              </div>
              <div className="form-item">
                <label htmlFor="StreamingTV">
                  <input className="form-input" type="checkbox" name="StreamingTV" value={formData.StreamingTV} onChange={handleChange}></input>
                  Streaming TV: 
                </label>
              </div>
              <div className="form-item">
                <label htmlFor="StreamingMovies">
                  <input className="form-input" type="checkbox" name="StreamingMovies" value={formData.StreamingMovies} onChange={handleChange}></input>
                  Streaming Movies: 
                </label>
              </div>
              <div className="form-item">
                <label htmlFor="PaperlessBilling">
                  <input className="form-input" type="checkbox" name="PaperlessBilling" value={formData.PaperlessBilling} onChange={handleChange}></input>
                  PaperlessBilling: 
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
                  Internet Type: 
                </label>
                <select className="form-input-dropdown" onChange={handleChange} defaultValue={formData.InternetService}>
                  <option value="" disabled></option>
                  <option value="dsl">DSL</option>
                  <option value="Fiberoptic">Fiber Optic</option>
                  <option value="no">None</option>
                </select>
              </div>
              <div className="form-item-select">
                <label htmlFor="Contract" >
                  Contract Type: 
                </label>
                <select className="form-input-dropdown" onChange={handleChange} defaultValue={formData.Contract}>
                  <option value="" disabled></option>
                  <option value="month-to-month">Month-to-Month</option>
                  <option value="one year">1 year</option>
                  <option value="two year">2 Year</option>
                </select>
              </div>
              <div className="form-item-select">
                <label htmlFor="PaymentMethod">
                  Payment Method: 
                </label>
                <select className="form-input-dropdown" onChange={handleChange} defaultValue={formData.PaymentMethod}>
                  <option value="" disabled></option>
                  <option value="bank transfer">Bank Transfer</option>
                  <option value="credit card">Credit Card</option>
                  <option value="electronic check">E-Check</option>
                  <option value="mailed check">Mailed Check</option>
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
