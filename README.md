# **MedBlock - ZkVerify-Based Medical Record Management System**  

🔗 **Demo Video:** [Watch here](https://youtu.be/U8oM8EPWpNk)  

## **Overview**  
MedBlock is a **privacy-preserving, decentralized medical record management system** built using **ZkVerify proofs**. It ensures that **medical records remain tamper-proof and verifiable** without exposing sensitive patient data.  

By leveraging **blockchain and zero-knowledge proofs (ZKPs)**, MedBlock enables patients, doctors, and insurance companies to verify medical records’ legitimacy **without revealing any private information**.  

## **Why ZkVerify?**  
-> Ensures **authenticity** of medical records without exposing patient details  
-> Prevents **tampering and fraud**, ensuring data integrity  
-> Eliminates the need to carry physical medical records  
-> Enables **AI-driven research** while preserving patient privacy  
-> Helps **insurance companies** verify legitimate claims  

## **How to Run the Project**  

### **1️ Clone the Repository**  
```bash
git clone https://github.com/your-repo/medblock.git
cd medblock
```

### **2️ Install Dependencies & Start the Frontend**  
```bash
cd frontend
npm install
npm run dev
```

### **3️ Connect Your Wallet**  
- Make sure your wallet is set to **Arbitrum Sepolia**  
- Visit the project in your browser to access the system  

## **Test Credentials**  
You can use the following test **Aadhar and password** to log in:  

| Aadhar Number | Password |
|--------------|------------|
| 987654321    | SecureNewPassword123 |
| 1111111111   | SecureNewPassword123 |

## **Doctor Login Guide**  
By default, **any user can log in as a doctor**, but they **won't see patient records** unless they are recognized as a doctor in the database.  

To **enable doctor access**, modify the wallet address in the project:  
 **Path:** `components/utils/web3.js`  
 **Update the address in `getMedicalRecord` function**  

 

**Thank You!**