// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalRecords {
    struct MedicalRecord {
        string cid;       // IPFS CID from Pinata
        string hash;      // SHA-256 hash of the record
    }

    struct Patient {
        address[] doctors;       // Array of doctors treating the patient
        MedicalRecord[] records; // Array of medical records
    }

    mapping(address => Patient) private patients;
    mapping(address => bool) public verifiedDoctors;
    address public owner;

    constructor(address _doctor) {
        owner = msg.sender;
        addNewDoctor(_doctor); // Only the owner can add the first doctor


    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier onlyDoctor() {
        require(verifiedDoctors[msg.sender], "Only verified doctors can perform this action");
        _;
    }

    modifier patientExists(address _patient) {
        require(patients[_patient].records.length > 0, "Patient record does not exist");
        _;
    }

    function addNewDoctor(address _doctor) public onlyOwner {
        require(!verifiedDoctors[_doctor], "Doctor already exists");
        verifiedDoctors[_doctor] = true;
    }
    
    function updateRecordByPatient(string memory _cid, string memory _hash) public {
        patients[msg.sender].records.push(MedicalRecord(_cid, _hash));
    }
    
    function updateRecordByDoctor(address _patient, string memory _cid, string memory _hash) public onlyDoctor {
        patients[_patient].records.push(MedicalRecord(_cid, _hash));
        bool doctorExists = false;
        for (uint i = 0; i < patients[_patient].doctors.length; i++) {
            if (patients[_patient].doctors[i] == msg.sender) {
                doctorExists = true;
                break;
            }
        }
        if (!doctorExists) {
            patients[_patient].doctors.push(msg.sender);
        }
    }
    
    function deleteRecord(address _patient, uint256 index) public onlyDoctor {
        require(index < patients[_patient].records.length, "Record does not exist");
        patients[_patient].records[index] = patients[_patient].records[patients[_patient].records.length - 1];
        patients[_patient].records.pop();
    }
    
    function deletePatient(address _patient) public onlyOwner {
        require(_patient != msg.sender, "Can't delete your own record");
        delete patients[_patient];
    }
    
    function getMedicalRecord(address _patient) public view returns (MedicalRecord[] memory) {
        require(msg.sender == _patient || verifiedDoctors[msg.sender], "Access denied: Only patient or doctor can view records");
        return patients[_patient].records;
    }
    
    function getDoctors(address _patient) public view patientExists(_patient) returns (address[] memory) {
        require(msg.sender == _patient || verifiedDoctors[msg.sender], "Access denied: Only patient or doctor can view doctors");
        return patients[_patient].doctors;
    }
}


//contract address : 0x325Ec2eCE44377C790dC0e96B1Fd41d12B4B062F
// doctor address : 0x3a94bD23Eb39cd8083A31C0e802F7f724e95b6c2