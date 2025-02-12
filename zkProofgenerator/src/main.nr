fn main(record_hash: [u8; 64], stored_cid: [u8; 64]) {
    // Ensure the hashes match
    assert(record_hash == stored_cid, "Hashes do not match!");
}



