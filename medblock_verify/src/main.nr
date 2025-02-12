fn main(record_hash: [u8; 32], stored_cid: [u8; 32]) {
    // Ensure the precomputed SHA-256 hash matches the stored CID
    assert(record_hash == stored_cid);
}




/// We tried using this function but it didn't work

// Import SHA-256 from Noir's standard library
use std::crypto::sha256;

// Function to verify that a record's hash matches the stored CID
fn main(record: [u8; 32], stored_cid: [u8; 32]) {
    // Compute SHA-256 hash of the provided medical record
    let computed_hash = sha256(record);

    // Ensure that the computed hash matches the stored CID
    assert(computed_hash == stored_cid);
}