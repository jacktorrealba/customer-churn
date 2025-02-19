'use client'
import React, { useState } from "react";


export default function Home() {
  
  const [isChecked, setIsChecked] = useState({
    features : []
  });

  const handleCheckboxChange = (e) => {
    const {value, checked} = e.target;
    const {features} = isChecked;
    console.log(e.target.value)
    console.log(`${value} is ${checked}`)

    if (checked) {
      setIsChecked({
        features: [...features, value]
      });
    };


  }

  const [formData, setFormData] = useState({
    PhoneService: '',
    Tenure: '',
    MultipleLines: '',
    OnlineSecurity: '',
    OnlineBackup: '',
    DeviceProtection: '',
    TechSupport: '',
    StreamingTV: '',
    StreamingMovies: '',
    PaperlessBilling: '',
    MonthlyCharges: '',
    TotalCharges: '',
    InternetService: '',
    Contract: '',
    PaymentMethod: ''
  });

  const handleChange = (event) => {
    const {name, value } = event.target
  }
  return (
    <div className="main">
      <div className="form-card">
        <form className="form">

          <div className="boolean-options">
            <div className="form-item">
              <label htmlFor="PhoneService" name="PhoneService" value={formData.PhoneService} onChange={handleChange}>
                <input className="form-input" type="checkbox" name="features" value="PhoneService" onChange={handleCheckboxChange}></input>
                Phone Service: 
              </label>
            </div>
            <div className="form-item">
              <label htmlFor="MultipleLines" name="MultipleLines" value={formData.MultipleLines} onChange={handleChange}>
                <input className="form-input" type="checkbox" name="features" value="MultipleLines" onChange={handleCheckboxChange}></input>
                Multiple Lines:
              </label>
            </div>
            <div className="form-item">
              <label htmlFor="OnlineSecurity" name="OnlineSecurity" value={formData.OnlineSecurity} onChange={handleChange}>
                <input className="form-input" type="checkbox" name="features" value="OnlineSecurity" onChange={handleCheckboxChange}></input>
                Online Security: 
              </label>
            </div>
            <div className="form-item">
              <label htmlFor="OnlineBackup" name="OnlineBackup" value={formData.OnlineBackup} onChange={handleChange}>
                <input className="form-input" type="checkbox" name="features" value="OnlineBackup" onChange={handleCheckboxChange}></input>
                Online Backup: 
              </label>
            </div>
            <div className="form-item">
              <label htmlFor="DeviceProtection" name="DeviceProtection" value={formData.DeviceProtection} onChange={handleChange}>
                <input className="form-input" type="checkbox" name="features" value="DeviceProtection" onChange={handleCheckboxChange}></input>
                Device Protection: 
              </label>
            </div>
            <div className="form-item">
              <label htmlFor="TechSupport" name="TechSupport" value={formData.TechSupport} onChange={handleChange}>
                <input className="form-input" type="checkbox" name="features" value="TechSupport" onChange={handleCheckboxChange}></input>
                Tech Support: 
              </label>
            </div>
            <div className="form-item">
              <label htmlFor="StreamingTV" name="StreamingTV" value={formData.StreamingTV} onChange={handleChange}>
                <input className="form-input" type="checkbox" name="features" value="StreamingTV" onChange={handleCheckboxChange}></input>
                Streaming TV: 
              </label>
            </div>
            <div className="form-item">
              <label htmlFor="StreamingMovies" name="StreamingMovies" value={formData.StreamingMovies} onChange={handleChange}>
                <input className="form-input" type="checkbox" name="features" value="StreamingMovies" onChange={handleCheckboxChange}></input>
                Streaming Movies: 
              </label>
            </div>
            <div className="form-item">
              <label htmlFor="PaperlessBilling" name="PaperlessBilling" value={formData.PaperlessBilling} onChange={handleChange}>
                <input className="form-input" type="checkbox" name="features" value="PaperlessBilling" onChange={handleCheckboxChange}></input>
                PaperlessBilling: 
              </label>
            </div>
          </div>

          <div className="numeric-options">
            <div className="form-item">
              <label htmlFor="Tenure" name="Tenure" value={formData.Tenure} onChange={handleChange}>
                Customer Tenure: 
                <input className="form-input-num" type="number" name="Tenure"></input>
              </label>
            </div>
            <div className="form-item">
              <label htmlFor="MonthlyCharges" name="MonthlyCharges" value={formData.MonthlyCharges} onChange={handleChange}>
                Monthly Charges: 
                <input className="form-input-num" type="number" name="MonthlyCharges"></input>
              </label>
            </div>
            <div className="form-item">
              <label htmlFor="TotalCharges" name="TotalCharges" value={formData.TotalCharges} onChange={handleChange}>
                Total Charges: 
                <input className="form-input-num" type="number" name="TotalCharges"></input>
              </label>
            </div>
          </div>

          <div className="dropdown-options">
            <div className="form-item">
              <label htmlFor="InternetService" name="InternetService" value={formData.InternetService} onChange={handleChange}>
                Internet Type: 
                <select className="form-input-dropdown">
                  <option selected disabled></option>
                  <option value="dsl">DSL</option>
                  <option value="Fiberoptic">Fiber Optic</option>
                  <option value="no">None</option>
                </select>
              </label>
            </div>
            <div className="form-item">
              <label htmlFor="Contract" name="Contract" value={formData.Contract} onChange={handleChange}>
                Contract Type: 
                <select className="form-input-dropdown">
                  <option selected disabled></option>
                  <option value="month-to-month">Month-to-Month</option>
                  <option value="one year">1 year</option>
                  <option value="two year">2 Year</option>
                </select>
              </label>
            </div>
            <div className="form-item">
              <label htmlFor="PaymentMethod" name="PaymentMethod" value={formData.PaymentMethod} onChange={handleChange}>
                Payment Method: 
                <select className="form-input-dropdown">
                  <option selected disabled></option>
                  <option value="bank transfer">Bank Transfer</option>
                  <option value="credit card">Credit Card</option>
                  <option value="electronic check">E-Check</option>
                  <option value="mailed check">Mailed Check</option>
                </select>
              </label>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
