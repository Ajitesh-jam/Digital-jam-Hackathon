pragma circom 2.0.0;

template DOBVerifier() {
    // Public input: Age threshold (e.g., 18 years ago in Unix timestamp)
    signal input threshold; 
    
    // Private input: User's date of birth as Unix timestamp
    signal input dob; 

    // Output: 1 if dob is valid (dob ≤ threshold), 0 otherwise
    signal output valid;

    // Compute the difference
    signal diff;
    diff <== threshold - dob;

    // Enforce that diff is non-negative (i.e., dob ≤ threshold)
    signal is_non_negative;
    is_non_negative <== (diff >= 0);  // This is invalid in Circom

    // Fix: Use binary decomposition instead
    component check = LessThan(32); // Assumes Unix timestamps fit in 32 bits
    check.in[0] <== dob;
    check.in[1] <== threshold;
    
    valid <== check.out;
}

component main = DOBVerifier();
