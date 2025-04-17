'use client'
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import  Spinner from "react-bootstrap/Spinner";


export default function Home() {
  // define form elements and their initial state
  const [formData, setFormData] = useState({
    PhoneService: 0,
    Tenure: "",
    MultipleLines: 0,
    OnlineSecurity: 0,
    OnlineBackup: 0,
    DeviceProtection: 0,
    TechSupport: 0,
    StreamingTV: 0,
    StreamingMovies: 0,
    PaperlessBilling: 0,
    InternetService_Fiberoptic: 0,
    InternetService: "",
    Contract: "",
    PaymentMethod: "",
    MonthlyCharges: "",
    TotalCharges: "",
    InternetService: "",
    Contract: "",
    PaymentMethod: ""
  });

  // store prediction
  const [prediction, setPrediction] = useState(null)

  const handleChange = ({target : {name, type, value, checked}}) => { // deconstructing fields from the target
      // define variable to hold the new values from the form inputs
      let newVal;
      // based on the input type...
      switch (type) {
        // when it's a checkbox, map the checked state to 1 otherwise 0
        case "checkbox":
          newVal = checked ? 1 : 0
          break;
        // when it's a number, and the name of the input is Tenure, then parseInt the value, otherwise parseFloat for the two 
        // other inputs that are floats
        case "number":
          newVal = "" ? "" : (name === "Tenure" ? parseInt(value) || "" : parseFloat(value) || "") // if the input is cleared, leave as blank to avoid NaN
          break;
          // for any other input types, just store the value 
          default:
            newVal = value
      }
  
      // update the form's changed elements
      setFormData((formData) => ({
        ...formData,
        [name]: newVal
    }));
  }

  const [showResults, setShowResults] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  

  // function for handling form submission
  const handleSubmit =  async(e) => {
    e.preventDefault()
    setShowLoading(true);
    // map the form data to match the model input
    const modelInput = {
      Tenure: formData.Tenure === '' ? 0 : parseFloat(formData.Tenure),
      PhoneService: formData.PhoneService ? 1 : 0,
      MultipleLines: formData.MultipleLines ? 1 : 0,
      OnlineSecurity: formData.OnlineSecurity ? 1 : 0,
      OnlineBackup: formData.OnlineBackup ? 1 : 0,
      DeviceProtection: formData.DeviceProtection ? 1 : 0,
      TechSupport: formData.TechSupport ? 1 : 0,
      StreamingTV: formData.StreamingTV ? 1 : 0,
      StreamingMovies: formData.StreamingMovies ? 1 : 0,
      PaperlessBilling: formData.PaperlessBilling ? 1 : 0,
      MonthlyCharges: formData.MonthlyCharges === '' ? 0 : parseFloat(formData.MonthlyCharges),
      TotalCharges: formData.TotalCharges === '' ? 0 : parseFloat(formData.TotalCharges),
      InternetService_dsl: formData.InternetService === 'dsl' ? 1 : 0,
      InternetService_fiberoptic: formData.InternetService === 'fiberoptic' ? 1 : 0,
      InternetService_no: formData.InternetService === 'no' ? 1 : 0,
      Contract_month_to_month: formData.Contract === 'Month_to_month' ? 1 : 0,
      Contract_oneyear: formData.Contract === 'oneyear' ? 1 : 0,
      Contract_twoyear: formData.Contract === 'twoyear' ? 1 : 0,
      PaymentMethod_banktransfer: formData.PaymentMethod === 'banktransfer' ? 1 : 0,
      PaymentMethod_creditcard: formData.PaymentMethod === 'creditcard' ? 1 : 0,
      PaymentMethod_electroniccheck: formData.PaymentMethod === 'electroniccheck' ? 1 : 0,
      PaymentMethod_mailedcheck: formData.PaymentMethod === 'mailedcheck' ? 1 : 0,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(modelInput)   
      });
      setShowLoading(false);
      const result = await response.json();
      setPrediction(result.prediction ? "CHURN" : "NOT churn");
      setShowResults(true)
    } catch (error) {
      console.log(error);
    }

    
  }


  return (
    <div className="main">
      <Form className="form" onSubmit={handleSubmit}>
        <div className="form-card">
          <div className="form-card-title">
            <h3>Telecomm Customer Churn Predictor</h3>
          </div>
          <div className="divider">
            <p className="instructions">Fill out the form with a customer's profile to predict whether or not the customer will churn</p>
          </div>
          <div className="divider">
            <hr></hr>
          </div>
          <div className="form-card-body">
            <div className="boolean-options">
              <div className="form-item">
                  <Form.Check label="PhoneService" className="form-input" type="checkbox" name="PhoneService" value={formData.PhoneService} onChange={handleChange}></Form.Check>
              </div>
              <div className="form-item">
                  <Form.Check label="MultipleLines" className="form-input" type="checkbox" name="MultipleLines" value={formData.MultipleLines} onChange={handleChange}></Form.Check>
              </div>
              <div className="form-item">
                  <Form.Check label="OnlineSecurity" className="form-input" type="checkbox" name="OnlineSecurity" value={formData.OnlineSecurity} onChange={handleChange}></Form.Check>
              </div>
              <div className="form-item">
                  <Form.Check label="OnlineBackup" className="form-input" type="checkbox" name="OnlineBackup" value={formData.OnlineBackup} onChange={handleChange}></Form.Check>
              </div>
              <div className="form-item">                
                  <Form.Check label="DeviceProtection" className="form-input" type="checkbox" name="DeviceProtection" value={formData.DeviceProtection} onChange={handleChange}></Form.Check>
              </div>
              <div className="form-item">                
                  <Form.Check label="TechSupport" className="form-input" type="checkbox" name="TechSupport" value={formData.TechSupport} onChange={handleChange}></Form.Check>
              </div>
              <div className="form-item">
                  <Form.Check label="StreamingTV" className="form-input" type="checkbox" name="StreamingTV" value={formData.StreamingTV} onChange={handleChange}></Form.Check>
              </div>
              <div className="form-item">
                  <Form.Check label="StreamingMovies" className="form-input" type="checkbox" name="StreamingMovies" value={formData.StreamingMovies} onChange={handleChange}></Form.Check>
              </div>
              <div className="form-item">
                  <Form.Check label="PaperlessBilling" className="form-input" type="checkbox" name="PaperlessBilling" value={formData.PaperlessBilling} onChange={handleChange}></Form.Check> 
              </div>
            </div>

            <div className="numeric-options">
              <div className="form-item-num">
                <label htmlFor="Tenure">
                  Customer Tenure:
                </label>
                <Form.Control className="form-input-num" type="number" name="Tenure" value={formData.Tenure} onChange={handleChange}></Form.Control>
              </div>
              <div className="form-item-num">
                <label htmlFor="MonthlyCharges">
                  Monthly Charges: 
                </label>
                <Form.Control className="form-input-num currency" step="0.01" type="number" name="MonthlyCharges" value={formData.MonthlyCharges} onChange={handleChange}></Form.Control>
              </div>
              <div className="form-item-num">
                <label htmlFor="TotalCharges">
                  Total Charges: 
                </label>
                <Form.Control className="form-input-num currency" step="0.01" type="number" name="TotalCharges" value={formData.TotalCharges} onChange={handleChange}></Form.Control>
              </div>
            </div>

            <div className="dropdown-options">
              <div className="form-item-select">
                <label htmlFor="InternetService">
                  <span style={{ color: 'red' }}>* </span>
                  Internet Type: 
                </label>
                <Form.Select className="form-input-dropdown" onChange={handleChange} name="InternetService" value={formData.InternetService} required>
                  <option value="" disabled></option>
                  <option value="DSL">DSL</option>
                  <option value="Fiberoptic">Fiber Optic</option>
                  <option value="No">None</option>
                </Form.Select>
              </div>
              <div className="form-item-select">
                <label htmlFor="Contract" >
                  <span style={{ color: 'red' }}>* </span>
                  Contract Type: 
                </label>
                <Form.Select className="form-input-dropdown" onChange={handleChange} name="Contract" value={formData.Contract} required>
                  <option value="" disabled></option>
                  <option value="Month_to_month">Month-to-Month</option>
                  <option value="oneyear">1 year</option>
                  <option value="twoyear">2 Year</option>
                </Form.Select>
              </div>
              <div className="form-item-select">
                <label htmlFor="PaymentMethod">
                  <span style={{ color: 'red' }}>* </span>
                  Payment Method: 
                </label>
                <Form.Select className="form-input-dropdown" onChange={handleChange} name="PaymentMethod" value={formData.PaymentMethod} required>
                  <option value="" disabled></option>
                  <option value="banktransfer">Bank Transfer</option>
                  <option value="creditcard">Credit Card</option>
                  <option value="electroniccheck">E-Check</option>
                  <option value="mailedcheck">Mailed Check</option>
                </Form.Select>
              </div>
            </div>
          </div>
          <div className="divider">
            <hr></hr>
          </div>
          <div className="form-card-footer">
            <div className="predict-div">
              { showLoading && <Button id="loadingBtn" variant="primary" disabled><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> Loading...</Button>}
              { !showLoading && <Button variant="primary" type="submit" id="predict-btn">Predict</Button>}
            </div>
            <div className="results-div">
              {prediction ? `This customer is likely to ${prediction}` : null}
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
